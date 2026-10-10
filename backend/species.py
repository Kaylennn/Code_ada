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

# Keep scientific names aligned with the frontend species profile data. BioCLIP
# recognizes taxonomic names more reliably than display names alone.
SCIENTIFIC_NAMES = {
    "buckthorn": "Rhamnus cathartica, Frangula alnus",
    "multiflora_rose": "Rosa multiflora",
    "amur_honeysuckle": "Lonicera maackii",
    "autumn_olive": "Elaeagnus umbellata",
    "callery_pear": "Pyrus calleryana",
    "common_privet": "Ligustrum vulgare",
    "japanese_barberry": "Berberis thunbergii",
    "norway_maple": "Acer platanoides",
    "princesstree": "Paulownia tomentosa",
    "sawtooth_oak": "Quercus acutissima",
    "tree_of_heaven": "Ailanthus altissima",
    "winged_burning_bush": "Euonymus alatus",
    "black_swallowwort": "Cynanchum louiseae (Vincetoxicum nigrum)",
    "chinese_yam": "Dioscorea polystachya",
    "japanese_honeysuckle": "Lonicera japonica",
    "japanese_hops": "Humulus japonicus",
    "kudzu": "Pueraria montana",
    "roundleaf_bittersweet": "Celastrus orbiculatus",
    "wintercreeper": "Euonymus fortunei",
    "canada_thistle": "Cirsium arvense",
    "poison_hemlock": "Conium maculatum",
    "wild_parsnip": "Pastinaca sativa",
    "musk_thistle": "Carduus nutans",
    "spotted_knapweed": "Centaurea stoebe (C. biebersteinii)",
    "teasel": "Dipsacus spp.",
    "sweet_clover": "Melilotus spp.",
    "crown_vetch": "Securigera varia",
    "birdsfoot_trefoil": "Lotus corniculatus",
    "sericea_lespedeza": "Lespedeza cuneata",
    "leafy_spurge": "Euphorbia esula (E. virgata)",
    "garlic_mustard": "Alliaria petiolata",
    "dames_rocket": "Hesperis matronalis",
    "fig_buttercup": "Ficaria verna",
    "japanese_chaff_flower": "Achyranthes japonica",
    "japanese_hedge_parsley": "Torilis japonica",
    "japanese_knotweed": "Fallopia japonica (Reynoutria japonica)",
    "purple_loosestrife": "Lythrum salicaria",
    "common_reed": "Phragmites australis (non-native subspecies)",
    "japanese_stiltgrass": "Microstegium vimineum",
    "johnsongrass": "Sorghum halepense",
    "reed_canarygrass": "Phalaris arundinacea",
    "emerald_ash_borer": "Agrilus planipennis",
    "spotted_lanternfly": "Lycorma delicatula",
    "asian_longhorned_beetle": "Anoplophora glabripennis",
    "spongy_moth": "Lymantria dispar",
    "flighted_spongy_moth": "Lymantria dispar asiatica and relatives",
    "elm_zigzag_sawfly": "Aproceros leucopoda",
    "twolined_chestnut_borer": "Agrilus bilineatus",
    "japanese_beetle": "Popillia japonica",
    "brown_marmorated_stink_bug": "Halyomorpha halys",
    "swede_midge": "Contarinia nasturtii",
    "spotted_wing_drosophila": "Drosophila suzukii",
    "asian_longhorned_tick": "Haemaphysalis longicornis",
    "jumping_worm": "Amynthas spp.",
    "hammerhead_worm": "Bipalium spp.",
}

PLANTS_PER_SIGHTING = 5  # placeholder assumption


def estimate_volunteers(species, sighting_count, hours=3):
    """volunteers = ceil((sighting_count * 5) / (pull_rate * hours)), minimum 1."""
    pull_rate = SPECIES[species]["pull_rate"]
    if pull_rate is None:
        raise ValueError(f"{SPECIES[species]['name']} does not have a volunteer pull rate.")
    work = sighting_count * PLANTS_PER_SIGHTING
    return max(1, math.ceil(work / (pull_rate * hours)))
