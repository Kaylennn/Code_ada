# Education section: notes for the team

The education section lives in these files only. No one else's files were changed.

- `frontend/src/components/EducationHub.jsx` + `EducationHub.css`: the UI
- `frontend/src/data/education.js`: modules, quizzes, points, helpers
- `frontend/src/data/speciesPlants.js`: 41 invasive plants
- `frontend/src/data/speciesPests.js`: 14 invasive insects and pests

Content comes from Illinois Extension's *Management of Invasive Plants and Pests of Illinois* (every species in it) and the Extension *Invasive Insects* page. Photos are freely licensed and hotlinked from Wikimedia Commons, so they need an internet connection. If a photo fails, the species emoji shows instead.

## Hooking it into App.jsx

```jsx
import EducationHub from './components/EducationHub.jsx'

<EducationHub
  onEarnPoints={(n) => setPoints((p) => p + n)}
  onReportSpecies={(speciesKey) => { /* open ReportForm with this species preselected */ }}
/>
```

- **Points:** +2 for each lesson finished and +10 for each module quiz passed, each awarded once. This is a new points rule; the spec only had report (+5) and signup (+10).
- Keep the component mounted (hide it with CSS when switching tabs). Otherwise lesson progress resets and points can be earned again.
- `SPECIES_INFO[key]` (from `education.js`) gives the name, emoji, photo and ID tips for any species. ReportForm and MapView popups can reuse it.

## ⚠️ Spec change: 50 new species keys

Every lesson has a "Report it on the map" button that calls `onReportSpecies(key)`. The spec only lists 5 species keys, so **the backend will reject reports of the other 50 until they are added to `backend/species.py`.**

Values below are placeholders, like the spec's originals. `pull_rate` is `None` for insects and pests, since they aren't "pulled". `cluster.py`'s volunteer estimate (`ceil(sighting_count * 5 / (pull_rate * 3))`) needs a guard for `None`. One option is to still create the site from 3+ sightings, but skip the volunteer and hours estimate and show "report to Extension" instead.

```python
    "amur_honeysuckle": {"farm_risk": False, "pull_rate": 3},  # Amur Honeysuckle
    "autumn_olive": {"farm_risk": True, "pull_rate": 1},  # Autumn Olive
    "callery_pear": {"farm_risk": True, "pull_rate": 1},  # Callery (Bradford) Pear
    "common_privet": {"farm_risk": False, "pull_rate": 3},  # Common Privet
    "japanese_barberry": {"farm_risk": False, "pull_rate": 4},  # Japanese Barberry
    "norway_maple": {"farm_risk": False, "pull_rate": 4},  # Norway Maple
    "princesstree": {"farm_risk": False, "pull_rate": 3},  # Princesstree (Royal Paulownia)
    "sawtooth_oak": {"farm_risk": False, "pull_rate": 3},  # Sawtooth Oak
    "tree_of_heaven": {"farm_risk": False, "pull_rate": 3},  # Tree of Heaven
    "winged_burning_bush": {"farm_risk": False, "pull_rate": 4},  # Winged Burning Bush
    "black_swallowwort": {"farm_risk": True, "pull_rate": 5},  # Black Swallow-wort
    "chinese_yam": {"farm_risk": False, "pull_rate": 4},  # Chinese Yam
    "japanese_honeysuckle": {"farm_risk": False, "pull_rate": 4},  # Japanese Honeysuckle
    "japanese_hops": {"farm_risk": False, "pull_rate": 8},  # Japanese Hops
    "kudzu": {"farm_risk": False, "pull_rate": 2},  # Kudzu
    "roundleaf_bittersweet": {"farm_risk": False, "pull_rate": 3},  # Roundleaf (Oriental) Bittersweet
    "wintercreeper": {"farm_risk": False, "pull_rate": 4},  # Wintercreeper
    "wild_parsnip": {"farm_risk": True, "pull_rate": 5},  # Wild Parsnip
    "musk_thistle": {"farm_risk": True, "pull_rate": 5},  # Musk Thistle
    "spotted_knapweed": {"farm_risk": True, "pull_rate": 6},  # Spotted Knapweed
    "teasel": {"farm_risk": False, "pull_rate": 4},  # Teasel (Common & Cut-leaved)
    "sweet_clover": {"farm_risk": True, "pull_rate": 8},  # Sweet Clover (White & Yellow)
    "crown_vetch": {"farm_risk": False, "pull_rate": 5},  # Crown Vetch
    "birdsfoot_trefoil": {"farm_risk": False, "pull_rate": 6},  # Birdsfoot Trefoil
    "sericea_lespedeza": {"farm_risk": True, "pull_rate": 4},  # Sericea Lespedeza
    "leafy_spurge": {"farm_risk": True, "pull_rate": 4},  # Leafy Spurge
    "dames_rocket": {"farm_risk": False, "pull_rate": 10},  # Dame's Rocket
    "fig_buttercup": {"farm_risk": False, "pull_rate": 12},  # Fig Buttercup (Lesser Celandine)
    "japanese_chaff_flower": {"farm_risk": False, "pull_rate": 8},  # Japanese Chaff Flower
    "japanese_hedge_parsley": {"farm_risk": False, "pull_rate": 10},  # Japanese Hedge Parsley
    "japanese_knotweed": {"farm_risk": False, "pull_rate": 2},  # Japanese Knotweed
    "purple_loosestrife": {"farm_risk": False, "pull_rate": 4},  # Purple Loosestrife
    "common_reed": {"farm_risk": False, "pull_rate": 1},  # Common Reed (Phragmites)
    "japanese_stiltgrass": {"farm_risk": False, "pull_rate": 15},  # Japanese Stiltgrass
    "johnsongrass": {"farm_risk": True, "pull_rate": 3},  # Johnsongrass
    "reed_canarygrass": {"farm_risk": False, "pull_rate": 2},  # Reed Canarygrass
    "emerald_ash_borer": {"farm_risk": False, "pull_rate": None},  # Emerald Ash Borer
    "spotted_lanternfly": {"farm_risk": True, "pull_rate": None},  # Spotted Lanternfly
    "asian_longhorned_beetle": {"farm_risk": False, "pull_rate": None},  # Asian Longhorned Beetle
    "spongy_moth": {"farm_risk": False, "pull_rate": None},  # Spongy Moth
    "flighted_spongy_moth": {"farm_risk": False, "pull_rate": None},  # Flighted Spongy Moth Complex
    "elm_zigzag_sawfly": {"farm_risk": False, "pull_rate": None},  # Elm Zigzag Sawfly
    "twolined_chestnut_borer": {"farm_risk": False, "pull_rate": None},  # Twolined Chestnut Borer
    "japanese_beetle": {"farm_risk": True, "pull_rate": None},  # Japanese Beetle
    "brown_marmorated_stink_bug": {"farm_risk": True, "pull_rate": None},  # Brown Marmorated Stink Bug
    "swede_midge": {"farm_risk": True, "pull_rate": None},  # Swede Midge
    "spotted_wing_drosophila": {"farm_risk": True, "pull_rate": None},  # Spotted Wing Drosophila
    "asian_longhorned_tick": {"farm_risk": True, "pull_rate": None},  # Asian Longhorned Tick
    "jumping_worm": {"farm_risk": False, "pull_rate": None},  # Jumping Worm
    "hammerhead_worm": {"farm_risk": False, "pull_rate": None},  # Hammerhead Worm
```

ReportForm's species picker should also list these keys. `ALL_SPECIES` from `education.js` has every species with its name, emoji and photo.

## Modules

| Module | Lessons |
| --- | --- |
| Invasives 101 | 2 text lessons + quiz |
| Invasive Trees & Shrubs | 12 species |
| Invasive Vines | 7 species |
| Field & Roadside Weeds | 11 species |
| Woodland & Wetland Plants | 7 species |
| Invasive Grasses | 4 species |
| Tree Pests | 7 species |
| Farm, Garden & Livestock Pests | 7 species |
| Safe & Sustainable Removal | 2 text lessons + quiz |
