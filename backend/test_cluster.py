import json
import os

from cluster import find_pull_sites

path = os.path.join(os.path.dirname(__file__), "seed_data.json")
with open(path, encoding="utf-8") as f:
    sightings = json.load(f)

sites = find_pull_sites(sightings)
print(f"{len(sightings)} sightings -> {len(sites)} pull sites")
for s in sites:
    print(f"  {s['species']:16} count={s['sighting_count']} "
          f"volunteers={s['volunteers']} hours={s['hours']} farm_risk={s['farm_risk']}")

species_found = sorted(s["species"] for s in sites)
assert len(sites) == 4, "expected 4 pull sites from the seed data"
assert "poison_hemlock" not in species_found, "hemlock has only 2 sightings, no site yet"
print("OK: 4 pull sites, hemlock not yet a site")

# The demo moment: one more hemlock sighting should tip it over.
sightings.append({"id": 999, "species": "poison_hemlock",
                  "lat": 40.10515, "lng": -88.20020, "date": "2026-10-10"})
sites = find_pull_sites(sightings)
assert any(s["species"] == "poison_hemlock" for s in sites), "hemlock site should appear"
print("OK: adding one hemlock sighting created a pull site")
print("All tests passed.")