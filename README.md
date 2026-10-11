# TerraTrace

TerraTrace is a community invasive-plant reporting app. The React frontend uses
a Flask API for sightings, pull sites, and volunteer signups.

## Run locally

Use two terminals from the project root.

### 1. Start the backend

```sh
uv python install 3.13
uv venv --python 3.13 .venv-bioclip
uv pip install --python .venv-bioclip/bin/python -r backend/requirements.txt
cd backend
../.venv-bioclip/bin/python -m flask --app app run --host 127.0.0.1 --port 5000
```

Use Python 3.10–3.13 for the BioCLIP dependency's currently tested versions.
The API runs at `http://localhost:5000`. Photo identification uses BioCLIP 2
through `pybioclip`; its model files are downloaded the first time an
identification request is made, so that first request can take longer and
requires an internet connection. Uploaded images are processed in memory and
are not saved by the API.

BioCLIP returns suggestions from TerraTrace's species list plus broad
out-of-catalog categories. Its relative scores are not calibrated
probabilities, and a result outside the catalog is not proof that a species is
non-invasive. Observers should confirm the suggested species before submitting
a report.

### 2. Start the frontend

```sh
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Vite
forwards `/api` requests to the backend on port 5000, so keep both processes
running while using the app.

The backend uses in-memory state initialized from `backend/seed_data.json`;
reports and signups reset to the seed data when the backend restarts.

## Deploy on Render

Push the project to GitHub, then create a Render Blueprint from that repository.
Render reads `render.yaml` to build the frontend and run the Flask API as one
web service. After the first deploy finishes, share the service URL; visitors
do not need to install or start anything. The free service may sleep when idle,
so its first request after a quiet period can take a little longer.

The demo's reports and volunteer signups are held in memory and reset whenever
the service restarts. Photo identification also downloads its model on first
use and may require more memory than a free instance provides.
