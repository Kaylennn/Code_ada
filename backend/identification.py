import threading

from PIL import Image, ImageOps, UnidentifiedImageError

try:
    from .species import SCIENTIFIC_NAMES, SPECIES
except ImportError:  # pragma: no cover - allows running identification.py directly from backend/
    from species import SCIENTIFIC_NAMES, SPECIES

MAX_IMAGE_PIXELS = 20_000_000
INVASIVE_SCORE_THRESHOLD = 0.35
OUTSIDE_SCORE_THRESHOLD = 0.45
MIN_SCORE_MARGIN = 0.08
TOP_CANDIDATE_COUNT = 3

OUTSIDE_CATALOG_LABEL = "a plant or pest that is not listed in the TerraTrace catalog"
NON_TARGET_LABEL = "an image that does not show a plant or pest"

CLASS_TO_SPECIES = {
    f"{item['name']} ({SCIENTIFIC_NAMES[key]})": key
    for key, item in SPECIES.items()
}
CLASS_LABELS = [*CLASS_TO_SPECIES, OUTSIDE_CATALOG_LABEL, NON_TARGET_LABEL]
OUTSIDE_LABELS = {OUTSIDE_CATALOG_LABEL, NON_TARGET_LABEL}

_classifier = None
_classifier_lock = threading.Lock()


class InvalidImageError(ValueError):
    """The uploaded file is not a supported, safely decodable image."""


def decode_image(stream):
    try:
        with Image.open(stream) as image:
            if image.format not in {"JPEG", "PNG", "WEBP"}:
                raise InvalidImageError("Upload a JPEG, PNG, or WebP image.")
            if image.width * image.height > MAX_IMAGE_PIXELS:
                raise InvalidImageError("The image is too large to process. Reduce its dimensions and retry.")
            image.verify()

        stream.seek(0)
        with Image.open(stream) as image:
            image.load()
            return ImageOps.exif_transpose(image).convert("RGB")
    except InvalidImageError:
        raise
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise InvalidImageError("The uploaded file is not a valid image.") from exc


def _get_classifier():
    global _classifier
    if _classifier is None:
        with _classifier_lock:
            if _classifier is None:
                from bioclip.predict import CustomLabelsClassifier

                _classifier = CustomLabelsClassifier(cls_ary=CLASS_LABELS)
    return _classifier


def _status_for(top, runner_up):
    margin = top["score"] - runner_up["score"] if runner_up else top["score"]
    if top["classification"] in OUTSIDE_LABELS:
        if top["score"] >= OUTSIDE_SCORE_THRESHOLD and margin >= MIN_SCORE_MARGIN:
            return "not_in_catalog"
        return "uncertain"
    if top["score"] >= INVASIVE_SCORE_THRESHOLD and margin >= MIN_SCORE_MARGIN:
        return "possible_invasive"
    return "uncertain"


def identify_image(image, classifier=None):
    predictions = (classifier or _get_classifier()).predict([image], k=TOP_CANDIDATE_COUNT + 1)
    ranked = sorted(predictions, key=lambda item: item["score"], reverse=True)
    if not ranked:
        raise RuntimeError("BioCLIP returned no image predictions.")

    top = ranked[0]
    status = _status_for(top, ranked[1] if len(ranked) > 1 else None)
    candidates = []
    for prediction in ranked:
        label = prediction["classification"]
        species_key = CLASS_TO_SPECIES.get(label)
        candidates.append({
            "species": species_key,
            "name": SPECIES[species_key]["name"] if species_key else label,
            "in_catalog": species_key is not None,
            "relative_score": round(float(prediction["score"]), 4),
        })

    messages = {
        "possible_invasive": "BioCLIP found a possible match in TerraTrace's invasive-species catalog. Confirm the species before submitting.",
        "not_in_catalog": "BioCLIP did not match this image to a species in TerraTrace's invasive-species catalog. This does not prove the organism is non-invasive.",
        "uncertain": "BioCLIP could not make a clear match. Check the suggestions or choose a species manually.",
    }
    return {
        "status": status,
        "message": messages[status],
        "candidates": candidates,
        "score_note": "Relative model scores compare only the labels offered to BioCLIP; they are not calibrated probabilities.",
    }
