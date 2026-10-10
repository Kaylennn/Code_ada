import math

# Reference table for the 5 watchlist species. Keys must match the spec exactly.
# pull_rate = plants one volunteer can remove per hour (placeholder values).
SPECIES = {
    "buckthorn":       {"name": "Common Buckthorn", "farm_risk": True,  "pull_rate": 2},
    "canada_thistle":  {"name": "Canada Thistle",   "farm_risk": True,  "pull_rate": 4},
    "poison_hemlock":  {"name": "Poison Hemlock",   "farm_risk": True,  "pull_rate": 3},
    "multiflora_rose": {"name": "Multiflora Rose",  "farm_risk": True,  "pull_rate": 2},
    "garlic_mustard":  {"name": "Garlic Mustard",   "farm_risk": False, "pull_rate": 10},
}

PLANTS_PER_SIGHTING = 5  # placeholder assumption

def estimate_volunteers(species, sighting_count, hours=3):
    """volunteers = ceil((sighting_count * 5) / (pull_rate * hours)), minimum 1."""
    work = sighting_count * PLANTS_PER_SIGHTING
    return max(1, math.ceil(work / (SPECIES[species]["pull_rate"] * hours)))