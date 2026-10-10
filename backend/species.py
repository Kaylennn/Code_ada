import math

# Keep these keys aligned with frontend/src/data/speciesCatalog.js.
# A null pull_rate marks reportable species that do not produce volunteer pull sites.
SPECIES = {
    # Invasive trees and shrubs
    "buckthorn": {"name": "Buckthorn (Common & Glossy)", "farm_risk": True, "pull_rate": 2},
    "multiflora_rose": {"name": "Multiflora Rose", "farm_risk": True, "pull_rate": 2},
    "amur_honeysuckle": {"name": "Amur Honeysuckle", "farm_risk": False, "pull_rate": 3},
    "autumn_olive": {"name": "Autumn Olive", "farm_risk": True, "pull_rate": 1},
    "callery_pear": {"name": "Callery (Bradford) Pear", "farm_risk": True, "pull_rate": 1},
    "common_privet": {"name": "Common Privet", "farm_risk": False, "pull_rate": 3},
    "japanese_barberry": {"name": "Japanese Barberry", "farm_risk": False, "pull_rate": 4},
    "norway_maple": {"name": "Norway Maple", "farm_risk": False, "pull_rate": 4},
    "princesstree": {"name": "Princesstree (Royal Paulownia)", "farm_risk": False, "pull_rate": 3},
    "sawtooth_oak": {"name": "Sawtooth Oak", "farm_risk": False, "pull_rate": 3},
    "tree_of_heaven": {"name": "Tree of Heaven", "farm_risk": False, "pull_rate": 3},
    "winged_burning_bush": {"name": "Winged Burning Bush", "farm_risk": False, "pull_rate": 4},
    # Invasive vines
    "black_swallowwort": {"name": "Black Swallow-wort", "farm_risk": True, "pull_rate": 5},
    "chinese_yam": {"name": "Chinese Yam", "farm_risk": False, "pull_rate": 4},
    "japanese_honeysuckle": {"name": "Japanese Honeysuckle", "farm_risk": False, "pull_rate": 4},
    "japanese_hops": {"name": "Japanese Hops", "farm_risk": False, "pull_rate": 8},
    "kudzu": {"name": "Kudzu", "farm_risk": False, "pull_rate": 2},
    "roundleaf_bittersweet": {"name": "Roundleaf (Oriental) Bittersweet", "farm_risk": False, "pull_rate": 3},
    "wintercreeper": {"name": "Wintercreeper", "farm_risk": False, "pull_rate": 4},
    # Field and roadside weeds
    "canada_thistle": {"name": "Canada Thistle", "farm_risk": True, "pull_rate": 4},
    "poison_hemlock": {"name": "Poison Hemlock", "farm_risk": True, "pull_rate": 3},
    "wild_parsnip": {"name": "Wild Parsnip", "farm_risk": True, "pull_rate": 5},
    "musk_thistle": {"name": "Musk Thistle", "farm_risk": True, "pull_rate": 5},
    "spotted_knapweed": {"name": "Spotted Knapweed", "farm_risk": True, "pull_rate": 6},
    "teasel": {"name": "Teasel (Common & Cut-leaved)", "farm_risk": False, "pull_rate": 4},
    "sweet_clover": {"name": "Sweet Clover (White & Yellow)", "farm_risk": True, "pull_rate": 8},
    "crown_vetch": {"name": "Crown Vetch", "farm_risk": False, "pull_rate": 5},
    "birdsfoot_trefoil": {"name": "Birdsfoot Trefoil", "farm_risk": False, "pull_rate": 6},
    "sericea_lespedeza": {"name": "Sericea Lespedeza", "farm_risk": True, "pull_rate": 4},
    "leafy_spurge": {"name": "Leafy Spurge", "farm_risk": True, "pull_rate": 4},
    # Woodland and wetland plants
    "garlic_mustard": {"name": "Garlic Mustard", "farm_risk": False, "pull_rate": 10},
    "dames_rocket": {"name": "Dame's Rocket", "farm_risk": False, "pull_rate": 10},
    "fig_buttercup": {"name": "Fig Buttercup (Lesser Celandine)", "farm_risk": False, "pull_rate": 12},
    "japanese_chaff_flower": {"name": "Japanese Chaff Flower", "farm_risk": False, "pull_rate": 8},
    "japanese_hedge_parsley": {"name": "Japanese Hedge Parsley", "farm_risk": False, "pull_rate": 10},
    "japanese_knotweed": {"name": "Japanese Knotweed", "farm_risk": False, "pull_rate": 2},
    "purple_loosestrife": {"name": "Purple Loosestrife", "farm_risk": False, "pull_rate": 4},
    # Invasive grasses
    "common_reed": {"name": "Common Reed (Phragmites)", "farm_risk": False, "pull_rate": 1},
    "japanese_stiltgrass": {"name": "Japanese Stiltgrass", "farm_risk": False, "pull_rate": 15},
    "johnsongrass": {"name": "Johnsongrass", "farm_risk": True, "pull_rate": 3},
    "reed_canarygrass": {"name": "Reed Canarygrass", "farm_risk": False, "pull_rate": 2},
    # Tree pests
    "emerald_ash_borer": {"name": "Emerald Ash Borer", "farm_risk": False, "pull_rate": None},
    "spotted_lanternfly": {"name": "Spotted Lanternfly", "farm_risk": True, "pull_rate": None},
    "asian_longhorned_beetle": {"name": "Asian Longhorned Beetle", "farm_risk": False, "pull_rate": None},
    "spongy_moth": {"name": "Spongy Moth", "farm_risk": False, "pull_rate": None},
    "flighted_spongy_moth": {"name": "Flighted Spongy Moth Complex", "farm_risk": False, "pull_rate": None},
    "elm_zigzag_sawfly": {"name": "Elm Zigzag Sawfly", "farm_risk": False, "pull_rate": None},
    "twolined_chestnut_borer": {"name": "Twolined Chestnut Borer", "farm_risk": False, "pull_rate": None},
    # Farm, garden, livestock and soil pests
    "japanese_beetle": {"name": "Japanese Beetle", "farm_risk": True, "pull_rate": None},
    "brown_marmorated_stink_bug": {"name": "Brown Marmorated Stink Bug", "farm_risk": True, "pull_rate": None},
    "swede_midge": {"name": "Swede Midge", "farm_risk": True, "pull_rate": None},
    "spotted_wing_drosophila": {"name": "Spotted Wing Drosophila", "farm_risk": True, "pull_rate": None},
    "asian_longhorned_tick": {"name": "Asian Longhorned Tick", "farm_risk": True, "pull_rate": None},
    "jumping_worm": {"name": "Jumping Worm", "farm_risk": False, "pull_rate": None},
    "hammerhead_worm": {"name": "Hammerhead Worm", "farm_risk": False, "pull_rate": None},
}

PLANTS_PER_SIGHTING = 5  # placeholder assumption


def estimate_volunteers(species, sighting_count, hours=3):
    """volunteers = ceil((sighting_count * 5) / (pull_rate * hours)), minimum 1."""
    pull_rate = SPECIES[species]["pull_rate"]
    if pull_rate is None:
        raise ValueError(f"{SPECIES[species]['name']} does not have a volunteer pull rate.")
    work = sighting_count * PLANTS_PER_SIGHTING
    return max(1, math.ceil(work / (pull_rate * hours)))
