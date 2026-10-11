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

## Project structure

```text
frontend/src/components/  Reusable UI components, including the Leaflet map
frontend/src/data/        Species catalog and educational content
frontend/src/pages/       Home, map, learn, report, and volunteer pages
frontend/src/services/    Frontend API requests
backend/app.py            Flask pages and API endpoints
backend/cluster.py        Groups nearby sightings into pull sites
backend/identification.py Validates images and runs BioCLIP identification
backend/seed_data.json    Initial example sightings
backend/species.py        Species catalog and volunteer estimates
render.yaml               Render service configuration
```

The frontend is a React single-page application. `frontend/src/main.jsx` mounts
the app, and `frontend/src/App.jsx` handles hash-based navigation and shared
application state. In development, Vite serves the frontend and proxies `/api`
requests to Flask. In a production build, Flask serves `frontend/dist` and the
API from the same origin.

## How the map works

The map is built with Leaflet through `react-leaflet` in
`frontend/src/components/MapView.jsx`. OpenStreetMap provides the map tiles, so
viewing the map requires an internet connection. The map displays three kinds
of locations:

- Reported sightings come from `GET /api/sightings` and appear as leaf markers.
- Pull sites come from `GET /api/pullsites`; nearby same-species reports are
  grouped within 200 meters, with at least three reports required per site.
- Illustrative species locations help browse the catalog; they are not reports.

The map page filters sightings and pull sites by species, and can limit pull
sites to those marked as farm risks. Selecting a reported sighting or pull site
shows its details below the map. Reporting and volunteer signup actions use
`POST /api/report` and `POST /api/signup` respectively.

## Share from a local computer with Cloudflare Tunnel

This option exposes the production-built site running on your computer. It is
useful for a temporary demonstration, but is not an always-on deployment.

Install Cloudflare Tunnel on macOS with Homebrew if it is not already installed:

```sh
brew install cloudflared
```

Build the frontend and make sure the Python environment has the backend
requirements installed. From the project root, run:

```sh
npm --prefix frontend ci
npm --prefix frontend run build
uv pip install --python .venv-bioclip/bin/python -r backend/requirements.txt
```

Keep this command running in one terminal:

```sh
.venv-bioclip/bin/python -m gunicorn backend.app:app --bind 127.0.0.1:5050 --workers 1 --threads 4 --timeout 120
```

In a second terminal, start a temporary public tunnel:

```sh
cloudflared tunnel --url http://127.0.0.1:5050
```

Copy the `https://....trycloudflare.com` URL printed by `cloudflared` and share
it with visitors. Keep both terminals, the computer, and its internet connection
available while the site is being used. The temporary URL changes when a new
Quick Tunnel is created, and Cloudflare does not guarantee its availability.
Anyone with the URL can access the app; reports and signups are held in memory
and can be changed by visitors, then reset when the backend restarts. Stop the
backend and tunnel with `Ctrl+C` in their respective terminals.
