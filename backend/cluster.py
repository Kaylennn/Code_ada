import math

try:
    from .species import SPECIES, estimate_volunteers
except ImportError:  # pragma: no cover - allows running cluster.py directly from backend/
    from species import SPECIES, estimate_volunteers

CLUSTER_RADIUS_M = 200
MIN_SIGHTINGS = 3
HOURS = 3

def distance_m(lat1, lng1, lat2, lng2):
    R = 6371000
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

def find_pull_sites(sightings):
    sites = []
    by_species = {}
    for s in sightings:
        by_species.setdefault(s["species"], []).append(s)

    for species, group in by_species.items():
        if SPECIES[species]["pull_rate"] is None:
            continue

        unvisited = set(range(len(group)))
        while unvisited:
            # grow one cluster by walking through nearby neighbors
            start = unvisited.pop()
            cluster, queue = [start], [start]
            while queue:
                i = queue.pop()
                for j in list(unvisited):
                    if distance_m(group[i]["lat"], group[i]["lng"],
                                  group[j]["lat"], group[j]["lng"]) <= CLUSTER_RADIUS_M:
                        unvisited.remove(j)
                        cluster.append(j)
                        queue.append(j)

            if len(cluster) >= MIN_SIGHTINGS:
                members = [group[k] for k in cluster]
                sites.append({
                    "id": len(sites) + 1,
                    "species": species,
                    "lat": sum(m["lat"] for m in members) / len(members),
                    "lng": sum(m["lng"] for m in members) / len(members),
                    "sighting_count": len(members),
                    "volunteers": estimate_volunteers(species, len(members), HOURS),
                    "hours": HOURS,
                    "farm_risk": SPECIES[species]["farm_risk"],
                    "signups": 0,
                })
    return sites