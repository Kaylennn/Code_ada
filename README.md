# TerraTrace

TerraTrace is a community invasive-plant reporting app. The React frontend uses
a Flask API for sightings, pull sites, and volunteer signups.

## Run locally

Use two terminals from the project root.

### 1. Start the backend

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
python backend/app.py
```

The API runs at `http://localhost:5000`.

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
