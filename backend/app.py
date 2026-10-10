import json
import math
import os
from datetime import date

from flask import Flask, jsonify, request
from werkzeug.exceptions import RequestEntityTooLarge

from cluster import find_pull_sites
from species import SPECIES

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

SEED_PATH = os.path.join(os.path.dirname(__file__), "seed_data.json")
MATCH_RADIUS_M = 250  # a recomputed pull site this close to an old one is "the same site"

# ---------------------------------------------------------------------------
# In-memory state (resets to seed_data.json whenever the server restarts)
# ---------------------------------------------------------------------------
with open(SEED_PATH, "r", encoding="utf-8") as f:
    sightings = json.load(f)

next_sighting_id = max((s["id"] for s in sightings), default=0) + 1
pullsites = []
next_pullsite_id = 1


def distance_m(lat1, lng1, lat2, lng2):
    """Haversine distance in meters."""
    r = 6371000
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def refresh_pullsites():
    """Recompute pull sites from all sightings.

    cluster.py rebuilds everything from scratch (ids restart at 1, signups at 0),
    so we match each new site to an old site of the same species that is nearby
    and carry over its id and signup count. That way signups aren't lost when a
    new report shifts a cluster's center.
    """
    global pullsites, next_pullsite_id

    new_sites = find_pull_sites(sightings)
    used_old_ids = set()

    for site in new_sites:
        best = None
        best_dist = MATCH_RADIUS_M
        for old in pullsites:
            if old["species"] != site["species"] or old["id"] in used_old_ids:
                continue
            d = distance_m(site["lat"], site["lng"], old["lat"], old["lng"])
            if d <= best_dist:
                best, best_dist = old, d

        if best is not None:
            site["id"] = best["id"]
            site["signups"] = best["signups"]
            used_old_ids.add(best["id"])
        else:
            site["id"] = next_pullsite_id
            next_pullsite_id += 1
            site["signups"] = 0

    pullsites = new_sites


def error(message, status):
    return jsonify({"error": message}), status


@app.errorhandler(RequestEntityTooLarge)
def request_too_large(_exception):
    return error("The uploaded image must be 8 MB or smaller.", 413)


refresh_pullsites()
# Make sure newly created sites never reuse an id that is already taken.
next_pullsite_id = max((p["id"] for p in pullsites), default=0) + 1


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.route("/api/sightings", methods=["GET"])
def get_sightings():
    return jsonify(sightings)


@app.route("/api/pullsites", methods=["GET"])
def get_pullsites():
    return jsonify(pullsites)


@app.route("/api/identify", methods=["POST"])
def identify():
    uploaded = request.files.get("image")
    if uploaded is None or not uploaded.filename:
        return error("Choose a photo to identify.", 400)

    from identification import InvalidImageError, decode_image, identify_image

    try:
        image = decode_image(uploaded.stream)
    except InvalidImageError as exc:
        return error(str(exc), 400)

    try:
        result = identify_image(image)
    except ImportError:
        app.logger.exception("BioCLIP dependencies are not installed.")
        return error("Photo identification is not configured on this server. You can still select a species manually.", 503)

    return jsonify(result)


@app.route("/api/report", methods=["POST"])
def report():
    global next_sighting_id

    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return error("Request body must be JSON.", 400)

    species = body.get("species")
    if species not in SPECIES:
        return error(f"Unknown species: {species!r}.", 400)

    try:
        lat = float(body["lat"])
        lng = float(body["lng"])
    except (KeyError, TypeError, ValueError):
        return error("lat and lng are required and must be numbers.", 400)

    if not (-90 <= lat <= 90 and -180 <= lng <= 180):
        return error("lat or lng is out of range.", 400)

    sighting = {
        "id": next_sighting_id,
        "species": species,
        "lat": lat,
        "lng": lng,
        "date": date.today().isoformat(),
    }
    next_sighting_id += 1
    sightings.append(sighting)

    refresh_pullsites()
    return jsonify({"sightings": sightings, "pullsites": pullsites})


@app.route("/api/signup", methods=["POST"])
def signup():
    body = request.get_json(silent=True)
    if not isinstance(body, dict) or "pullsite_id" not in body:
        return error("pullsite_id is required.", 400)

    for site in pullsites:
        if site["id"] == body["pullsite_id"]:
            site["signups"] += 1
            return jsonify({"pullsite": site, "points_awarded": 10})

    return error("Pull site not found.", 404)


if __name__ == "__main__":
    app.run(port=5000, debug=True)