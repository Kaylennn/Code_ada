"""Compatibility wrapper so the backend can be imported from the repo root."""

from backend.app import *  # noqa: F401,F403
from backend.app import app


if __name__ == "__main__":
    app.run(port=5000, debug=True)
