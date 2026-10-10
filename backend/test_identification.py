import io
import unittest
from unittest.mock import patch

from PIL import Image

from app import app
from identification import (
    CLASS_TO_SPECIES,
    OUTSIDE_CATALOG_LABEL,
    InvalidImageError,
    decode_image,
    identify_image,
)


class FakeClassifier:
    def __init__(self, predictions):
        self.predictions = predictions

    def predict(self, _images, k):
        return self.predictions[:k]


class IdentificationTests(unittest.TestCase):
    def test_catalog_match_is_returned_as_a_suggestion(self):
        label = next(label for label, key in CLASS_TO_SPECIES.items() if key == "kudzu")
        result = identify_image(
            Image.new("RGB", (16, 16)),
            FakeClassifier([
                {"classification": label, "score": 0.72},
                {"classification": OUTSIDE_CATALOG_LABEL, "score": 0.12},
            ]),
        )

        self.assertEqual(result["status"], "possible_invasive")
        self.assertEqual(result["candidates"][0]["species"], "kudzu")
        self.assertIn("not calibrated probabilities", result["score_note"])

    def test_out_of_catalog_result_is_not_a_non_invasive_claim(self):
        result = identify_image(
            Image.new("RGB", (16, 16)),
            FakeClassifier([
                {"classification": OUTSIDE_CATALOG_LABEL, "score": 0.72},
                {"classification": next(iter(CLASS_TO_SPECIES)), "score": 0.12},
            ]),
        )

        self.assertEqual(result["status"], "not_in_catalog")
        self.assertIsNone(result["candidates"][0]["species"])
        self.assertIn("does not prove", result["message"])

    def test_close_scores_are_uncertain(self):
        result = identify_image(
            Image.new("RGB", (16, 16)),
            FakeClassifier([
                {"classification": next(iter(CLASS_TO_SPECIES)), "score": 0.4},
                {"classification": OUTSIDE_CATALOG_LABEL, "score": 0.36},
            ]),
        )

        self.assertEqual(result["status"], "uncertain")

    def test_decode_accepts_image_and_rejects_invalid_bytes(self):
        stream = io.BytesIO()
        Image.new("RGBA", (16, 16), (20, 80, 30, 255)).save(stream, format="PNG")
        stream.seek(0)
        self.assertEqual(decode_image(stream).mode, "RGB")

        with self.assertRaises(InvalidImageError):
            decode_image(io.BytesIO(b"not an image"))

    def test_identify_endpoint_validates_and_returns_suggestions(self):
        stream = io.BytesIO()
        Image.new("RGB", (16, 16)).save(stream, format="PNG")
        stream.seek(0)
        expected = {
            "status": "uncertain",
            "message": "Choose a suggestion or species manually.",
            "candidates": [],
            "score_note": "Relative model scores are not calibrated probabilities.",
        }

        with patch("identification.identify_image", return_value=expected):
            response = app.test_client().post(
                "/api/identify",
                data={"image": (stream, "sighting.png")},
                content_type="multipart/form-data",
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), expected)

    def test_identify_endpoint_rejects_invalid_upload(self):
        response = app.test_client().post(
            "/api/identify",
            data={"image": (io.BytesIO(b"not an image"), "sighting.png")},
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("valid image", response.get_json()["error"])

    def test_identify_endpoint_rejects_missing_upload(self):
        response = app.test_client().post("/api/identify", data={})

        self.assertEqual(response.status_code, 400)
        self.assertIn("Choose a photo", response.get_json()["error"])

    def test_identify_endpoint_reports_missing_model_dependency(self):
        stream = io.BytesIO()
        Image.new("RGB", (16, 16)).save(stream, format="PNG")
        stream.seek(0)

        with patch("identification.identify_image", side_effect=ImportError("pybioclip is unavailable")):
            response = app.test_client().post(
                "/api/identify",
                data={"image": (stream, "sighting.png")},
                content_type="multipart/form-data",
            )

        self.assertEqual(response.status_code, 503)
        self.assertIn("select a species manually", response.get_json()["error"])


if __name__ == "__main__":
    unittest.main()
