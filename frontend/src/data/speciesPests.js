// Invasive insects and other pests: every pest in Illinois Extension's
// "Management of Invasive Plants and Pests of Illinois" guide plus the
// Extension "Invasive Insects" page (extension.illinois.edu/invasives/invasive-insects).
//
// pull_rate is null because pests are reportable but do not produce volunteer
// pull sites, so the backend's volunteer estimate does not apply.

export const PESTS = {
  // ------------------------------------------------------------------------
  // Tree pests
  // ------------------------------------------------------------------------

  emerald_ash_borer: {
    key: 'emerald_ash_borer',
    type: 'insect',
    group: 'Tree pest',
    name: 'Emerald Ash Borer',
    scientific: 'Agrilus planipennis',
    emoji: '🪲',
    color: '#1f9d6b',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Ash trees (Fraxinus)',
    tagline: 'A tiny green beetle that has killed millions of ash trees.',
    quickId: [
      'Adult: metallic emerald-green, bullet-shaped beetle, about ½ in long',
      'D-shaped exit holes about ⅛ in wide in ash bark',
      'S-shaped tunnels under the bark',
      'Thinning crown that dies from the top down, plus sprouts along the trunk',
      'Light patches where woodpeckers flaked off bark looking for larvae',
    ],
    lookAlikes: [
      'The native six-spotted tiger beetle is also metallic green but has white spots and lives on the ground, not in trees.',
    ],
    whyHarmful:
      'Larvae tunnel under the bark and cut off the tree’s flow of water and nutrients. Infested ash trees usually die within a few years.',
    farmImpact:
      'Dead ash trees along fencerows and windbreaks become hazards and lose their value as timber.',
    management: [
      'Do not move firewood. Buy it where you burn it.',
      'Certified arborists can protect high-value ash trees with systemic insecticides.',
      'Long-term biocontrol: tiny parasitic wasps are being released, and woodpeckers eat many larvae.',
      'Have dead ash trees removed before they become dangerous.',
    ],
    disposal: 'Keep infested wood local, and chip or burn it on site where allowed.',
    safety: 'Dead ash trees drop limbs. Do not stand under them.',
    bestMonths: [6, 7],
    bestTimeNote: 'Adults come out in mid-June. Look for tree damage any time of year.',
    images: [
      {
        file: 'Agrilus planipennis 001.jpg',
        caption: 'Adult: metallic green, about ½ in long',
        credit: 'Pennsylvania DCNR - Forestry Archive',
        license: 'CC BY 3.0 US',
      },
      {
        file: 'Eabexithole.jpg',
        caption: 'KEY: D-shaped exit holes in ash bark',
        credit: 'Daniel Herms, The Ohio State University, Bugwood.org',
        license: 'CC BY 3.0',
      },
    ],
  },

  spotted_lanternfly: {
    key: 'spotted_lanternfly',
    type: 'insect',
    group: 'Tree pest',
    name: 'Spotted Lanternfly',
    scientific: 'Lycorma delicatula',
    emoji: '🦗',
    color: '#c62828',
    farm_risk: true,
    pull_rate: null,
    hosts: 'Tree of heaven, grapes, maples, black walnut and 70+ other plants',
    tagline: 'A new pest in Illinois. If you see it, report it and squash it.',
    quickId: [
      'Adult: about 1 in long, with tan forewings covered in black spots',
      'Bright red hindwings with black spots, visible when it jumps or flies',
      'Young nymphs: black with white spots. Older nymphs: red with white spots.',
      'Egg masses: gray, mud-like smears 1–2 in long on bark, stone, vehicles',
      'Sticky honeydew and black sooty mold under infested plants',
    ],
    lookAlikes: [
      'Native moths and tiger moths can have spotted wings, but lanternflies hop like grasshoppers and have a beak-like mouth.',
    ],
    whyHarmful:
      'It sucks sap from plants, weakening them and covering everything below in sticky honeydew that grows black mold.',
    farmImpact:
      'It is a serious threat to vineyards, fruit orchards, plant nurseries and timber.',
    management: [
      'Take a photo, then squash it.',
      'Report sightings to lanternfly@illinois.edu or the Illinois Department of Agriculture (815-787-5476).',
      'Scrape egg masses into a bag of rubbing alcohol or hand sanitizer.',
      'Check vehicles, trailers and outdoor gear before traveling from infested areas.',
    ],
    disposal: 'Seal crushed insects and scraped egg masses in a bag.',
    safety: 'Safe to handle. It does not bite or sting.',
    bestMonths: [7, 8, 9, 10],
    bestTimeNote: 'Adults are most visible from late summer to fall. Look for egg masses in winter.',
    images: [
      {
        file: 'Spotted lanternfly in BBG (42972).jpg',
        caption: 'Adult with black-spotted forewings',
        credit: 'Rhododendrites',
        license: 'CC BY-SA 4.0',
      },
      {
        file: 'Spotted Lanternfly (Lycorma delicatula) late-stage nymph in Pittsburgh, 2022-07-23, 01.jpg',
        caption: 'Late-stage nymph: red with white spots',
        credit: 'Cbaile19',
        license: 'CC0',
      },
    ],
  },

  asian_longhorned_beetle: {
    key: 'asian_longhorned_beetle',
    type: 'insect',
    group: 'Tree pest',
    name: 'Asian Longhorned Beetle',
    scientific: 'Anoplophora glabripennis',
    emoji: '🐜',
    color: '#263238',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Maples and other hardwoods',
    tagline: 'Eradicated from Illinois. Any new sighting is urgent.',
    quickId: [
      'Large beetle, 1–1½ in long, shiny black with white spots',
      'KEY: antennae longer than its body, banded black and white',
      'Legs can look bluish',
      'Round exit holes about ⅜ in wide (dime-sized) in tree trunks and branches',
      'Sawdust at the base of trees, oozing sap, and shallow pits chewed in the bark',
    ],
    lookAlikes: [
      'The native white-spotted sawyer is bronze-black with a single white spot at the top of its back and fewer white spots overall.',
    ],
    whyHarmful:
      'Larvae bore deep into healthy hardwood trees and kill them. It has killed thousands of trees in U.S. outbreaks.',
    farmImpact: 'It threatens maple syrup, timber and nursery industries.',
    management: [
      'USDA APHIS and partners eradicated it from Illinois by removing infested trees and treating nearby host trees.',
      'Any tree treatment should be done by a certified arborist.',
      'August is "Tree Check Month." Look your trees over for round exit holes and adult beetles.',
    ],
    disposal: 'Don’t move wood from a suspected tree. Report it and wait for instructions.',
    safety: 'Safe to handle, but put any beetle you catch in a sealed container for officials.',
    bestMonths: [7, 8, 9],
    bestTimeNote: 'Adults come out of trees in July and August.',
    images: [
      {
        file: 'Aziatische-boktor.jpg',
        caption: 'Shiny black with white spots and banded antennae',
        credit: 'Dutch government',
        license: 'CC0',
      },
    ],
  },

  spongy_moth: {
    key: 'spongy_moth',
    type: 'insect',
    group: 'Tree pest',
    name: 'Spongy Moth',
    scientific: 'Lymantria dispar',
    emoji: '🐛',
    color: '#8d6e63',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Oaks (preferred) and hundreds of other trees and shrubs',
    tagline: 'Hairy caterpillars that can strip whole trees bare.',
    quickId: [
      'Caterpillar: 1–2 in long and hairy, with 5 pairs of BLUE dots then 6 pairs of RED dots down its back',
      'Egg masses: buff or tan, fuzzy, about 1½ × ¾ in, on bark, picnic tables, stones and lawn furniture',
      'Male moth: brown, about 1 in wingspan, flies',
      'Female moth: white, larger, does not fly',
    ],
    lookAlikes: [
      'Eastern tent caterpillars build silk tents in tree forks. Spongy moth caterpillars do not make tents.',
    ],
    whyHarmful:
      'Caterpillars can strip all the leaves off trees in a single season. Repeated stripping combined with drought can kill trees.',
    farmImpact: 'It mainly affects woodlots, windbreaks and nurseries.',
    management: [
      'Scrape egg masses into soapy water (fall through early spring).',
      'Wrap burlap bands around trunks to trap caterpillars, then destroy them daily.',
      'The state, USDA and the Slow the Spread program use pheromone traps to monitor and treat outbreaks.',
    ],
    disposal: 'Soak scraped egg masses in soapy water for 2 days, then throw them away.',
    safety: 'Caterpillar hairs can cause skin rashes. Wear gloves.',
    bestMonths: [5, 6, 10, 11, 12, 1, 2, 3],
    bestTimeNote:
      'It is mostly found in northern Illinois, so a sighting near Champaign-Urbana is worth reporting to Extension.',
    images: [
      {
        file: 'Lymantria dispar caterpillar RF.jpg',
        caption: 'Caterpillar with blue then red dot pairs',
        credit: 'Robert Flogaus-Faust',
        license: 'CC BY 4.0',
      },
    ],
  },

  flighted_spongy_moth: {
    key: 'flighted_spongy_moth',
    type: 'insect',
    group: 'Tree pest',
    name: 'Flighted Spongy Moth Complex',
    scientific: 'Lymantria dispar asiatica and relatives',
    emoji: '🦋',
    color: '#6d4c41',
    farm_risk: false,
    pull_rate: null,
    hosts: 'More than 500 trees and shrubs',
    tagline: 'Not yet in the U.S. Its females can fly, so it would spread fast.',
    quickId: [
      'Caterpillars 2–3½ in long with two rows of blue and red spots on the back',
      'Male moths: grayish-brown, about 1½ in wingspan',
      'Female moths: white and larger (up to 3½ in). Unlike European spongy moth females, they FLY.',
      'Buff-colored egg masses, about 1½ × ¾ in, on trees, walls, logs and outdoor furniture',
    ],
    lookAlikes: [
      'European spongy moth looks almost the same, but its females can’t fly. Only experts can tell them apart, so report any suspect.',
    ],
    whyHarmful:
      'Each female lays hundreds of eggs, and the caterpillars feed on hundreds of kinds of trees. Because females fly, it could spread much faster than spongy moth.',
    farmImpact: 'It would threaten forests, orchards and nurseries.',
    management: [
      'Control methods are the same as for European spongy moth.',
      'It is not known to occur in the U.S. It could arrive on ships and cargo, so report anything suspicious.',
    ],
    disposal: 'Scrape egg masses into soapy water and report them.',
    safety: 'Caterpillar hairs can irritate skin. Wear gloves.',
    bestMonths: [5, 6, 7, 8],
    bestTimeNote: 'Caterpillars feed in late spring. Moths fly in midsummer.',
    images: [
      {
        file: 'Lymantria dispar asiatica male.jpg',
        caption: 'Male moth with grayish-brown wings',
        credit: 'Alexander Schintlmeister',
        license: 'CC BY 3.0 AU',
      },
    ],
  },

  elm_zigzag_sawfly: {
    key: 'elm_zigzag_sawfly',
    type: 'insect',
    group: 'Tree pest',
    name: 'Elm Zigzag Sawfly',
    scientific: 'Aproceros leucopoda',
    emoji: '〰️',
    color: '#43a047',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Elms only (American, Chinese, Siberian, slippery and others)',
    tagline: 'A new arrival in Illinois (2024) that carves zigzags into elm leaves.',
    quickId: [
      'KEY: early larvae eat a zigzag path between the small veins of elm leaves, often starting at the edge',
      'Larvae: light green, caterpillar-like, up to about ⅖ in long, with a brown band on the head',
      'Larvae have 6 or more pairs of fleshy prolegs (most caterpillars have 5 or fewer)',
      'Adults: small, dark, 6–7 mm wasp relatives with white-to-yellow legs',
    ],
    lookAlikes: [
      'Caterpillar damage on other trees is not this pest. It only feeds on elms.',
    ],
    whyHarmful:
      'Heavy populations can strip elms of leaves. Repeated stripping causes branch dieback and weakens trees.',
    farmImpact: 'It mainly affects elms in yards, parks and windbreaks.',
    management: [
      'First found in Illinois in July 2024 (Busse Woods, Cook County). It spreads 28–56 miles a year.',
      'Control methods are still being studied. Some sawfly insecticides may help but aren’t proven.',
      'Report it to your local Extension office or invasives@illinois.edu, with exact location, date and clear photos.',
    ],
    disposal: 'Bag infested leaves you collect.',
    safety: 'Harmless to people.',
    bestMonths: [5, 6, 7, 8, 9],
    bestTimeNote: 'Check elm leaves for zigzag feeding from late spring to fall.',
    images: [
      {
        file: 'Aproceros leucopoda 296489255.jpg',
        caption: 'Green larva feeding on an elm leaf',
        credit: 'christine123',
        license: 'CC BY 4.0',
      },
    ],
  },

  twolined_chestnut_borer: {
    key: 'twolined_chestnut_borer',
    type: 'insect',
    group: 'Tree pest',
    name: 'Twolined Chestnut Borer',
    scientific: 'Agrilus bilineatus',
    emoji: '🌳',
    color: '#37474f',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Oaks (especially stressed trees)',
    tagline: 'A NATIVE beetle, listed by Extension because it finishes off stressed oaks.',
    quickId: [
      'Note: this beetle is native, not invasive. Extension lists it as a tree pest threat.',
      'Adult: slender black beetle with a bluish-green sheen, ⅕–½ in long',
      'KEY: two faint yellowish stripes down its back',
      'Oak dying from the top down, often after drought',
      'Winding tunnels under the bark and small D-shaped exit holes',
    ],
    lookAlikes: [
      'Emerald ash borer is related and similar in shape, but it is bright green and only attacks ash.',
    ],
    whyHarmful:
      'It attacks oaks already stressed by drought, defoliation or construction damage, and can push them to death.',
    farmImpact: 'It can kill oaks in woodlots and windbreaks.',
    management: [
      'Keep oaks healthy. Water them regularly during dry growing seasons.',
      'Don’t prune oaks during the growing season.',
      'Adults are active from late April (southern Illinois) to early June (northern Illinois).',
    ],
    disposal: 'Remove and destroy dead, infested oak wood before adults come out in spring.',
    safety: 'Harmless to people. Dead oaks can drop limbs.',
    bestMonths: [5, 6, 7, 8],
    bestTimeNote: 'Check stressed oaks in summer for dying tops.',
    images: [
      {
        file: 'Agrilus bilineatus P1460803a.jpg',
        caption: 'Slender dark beetle',
        credit: 'xpda',
        license: 'CC BY-SA 4.0',
      },
    ],
  },

  // ------------------------------------------------------------------------
  // Farm, garden & livestock pests
  // ------------------------------------------------------------------------

  japanese_beetle: {
    key: 'japanese_beetle',
    type: 'insect',
    group: 'Farm / garden pest',
    name: 'Japanese Beetle',
    scientific: 'Popillia japonica',
    emoji: '🐞',
    color: '#2e7d32',
    farm_risk: true,
    pull_rate: null,
    hosts: '300+ plants including roses, linden, grapes, soybeans and corn',
    tagline: 'A shiny beetle that turns leaves into lace.',
    quickId: [
      'Just under ½ in long, with a shiny metallic-green head and body',
      'Copper or bronze wing covers',
      'KEY: 6 small tufts of white hair along each side',
      'Leaves eaten between the veins so only a "lace" skeleton remains',
      'Grubs: white, C-shaped, in lawns and turf',
    ],
    lookAlikes: [
      'The native green June beetle is larger (about 1 in), dull green, and has no white hair tufts.',
    ],
    whyHarmful:
      'Adults feed in groups and strip leaves. Grubs eat grass roots and kill patches of lawn.',
    farmImpact:
      'Adults feed on soybean leaves and corn silks, which can reduce pollination and yield.',
    management: [
      'Hand-pick beetles in the early morning or at dusk, when they are slow, and drop them into soapy water.',
      'Do not use beetle traps. The lure attracts more beetles than it catches.',
      'Milky spore disease can control grubs in lawns, but results vary.',
      'If you use insecticide, check that the label lists Japanese beetle. Never use imidacloprid on linden (Tilia).',
    ],
    disposal: 'Dump the soapy water and beetles into the trash once they are dead.',
    safety: 'Safe to handle.',
    bestMonths: [6, 7, 8],
    bestTimeNote: 'Adults are active from late June through August.',
    images: [
      {
        file: 'Popillia japonica.jpg',
        caption: 'Metallic green body, bronze wing covers, white side tufts',
        credit: 'Bruce Marlin',
        license: 'CC BY 3.0',
      },
    ],
  },

  brown_marmorated_stink_bug: {
    key: 'brown_marmorated_stink_bug',
    type: 'insect',
    group: 'Farm / garden pest',
    name: 'Brown Marmorated Stink Bug',
    scientific: 'Halyomorpha halys',
    emoji: '🛡️',
    color: '#795548',
    farm_risk: true,
    pull_rate: null,
    hosts: 'Fruit trees, vegetables, sweet corn, soybeans',
    tagline: 'A shield-shaped bug that damages crops and invades homes in fall.',
    quickId: [
      'Shield-shaped, about ⅝ in long, with a mottled ("marmorated") brown back',
      'KEY: white bands on the antennae',
      'Alternating dark and light bands along the edge of the abdomen',
      'Smooth, rounded "shoulders"',
      'Gathers on the sunny sides of houses in fall',
    ],
    lookAlikes: [
      'Native brown stink bugs have no white antenna bands. The rough stink bug has jagged, toothed shoulders.',
    ],
    whyHarmful:
      'It pierces fruit and seeds, leaving sunken, corky spots. It is also a smelly pest inside homes.',
    farmImpact:
      'It damages apples, peaches, peppers, tomatoes, sweet corn and soybean pods, especially along field edges.',
    management: [
      'Seal cracks around windows, doors and siding before fall.',
      'Vacuum indoor bugs with a dedicated vacuum, or knock them into soapy water. Don’t crush them, because they smell.',
      'Farmers: scout field edges next to woods first.',
    ],
    disposal: 'Seal bugs in a bag and put it in the trash.',
    safety: 'Harmless to people, but the smell is strong.',
    bestMonths: [8, 9, 10],
    bestTimeNote: 'Most noticeable in fall when it looks for a place to spend the winter.',
    images: [
      {
        file: 'Pentatomidae - Halyomorpha halys-001.JPG',
        caption: 'Shield-shaped adult with banded antennae and abdomen edge',
        credit: 'Hectonichus',
        license: 'CC BY-SA 4.0',
      },
    ],
  },

  swede_midge: {
    key: 'swede_midge',
    type: 'insect',
    group: 'Farm / garden pest',
    name: 'Swede Midge',
    scientific: 'Contarinia nasturtii',
    emoji: '🥦',
    color: '#558b2f',
    farm_risk: true,
    pull_rate: null,
    hosts: 'Broccoli, cabbage, cauliflower, kale, Brussels sprouts, canola',
    tagline: 'A nearly invisible fly. You identify it by the damage it causes.',
    quickId: [
      'The adult is a tiny fly (about 2 mm) that is almost impossible to spot',
      'Twisted, crumpled or puckered leaves at the growing tip',
      'Swollen leaf stalks with brown, corky scars',
      'Broccoli or cauliflower with no head ("blind") or several small heads',
      'Tiny cream-colored larvae deep in the growing tip',
    ],
    lookAlikes: [
      'Herbicide drift, heat stress or nutrient problems can cause similar twisting. Ask Extension to confirm.',
    ],
    whyHarmful:
      'Larvae feed in the growing points of brassica plants, making the crop unsellable.',
    farmImpact:
      'Illinois Extension lists it as an agricultural invasive of concern for vegetable and canola growers.',
    management: [
      'Rotate brassicas to fields far away from last year’s planting.',
      'Plow under or destroy crop leftovers after harvest.',
      'Cover young plants with fine insect netting.',
      'Use pheromone traps for monitoring, and send suspect plants to your local Extension office.',
    ],
    disposal: 'Remove infested plants from the field and destroy them.',
    safety: 'Harmless to people.',
    bestMonths: [6, 7, 8, 9],
    bestTimeNote: 'Check brassica growing tips throughout the summer.',
    images: [
      {
        file: 'Draaihartigheid bij bloemkool (Contarinia nasturtii damage on cauliflower).jpg',
        caption: 'Damage on cauliflower: twisted growing point, no head',
        credit: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
      },
    ],
  },

  spotted_wing_drosophila: {
    key: 'spotted_wing_drosophila',
    type: 'insect',
    group: 'Farm / garden pest',
    name: 'Spotted Wing Drosophila',
    scientific: 'Drosophila suzukii',
    emoji: '🍓',
    color: '#d84315',
    farm_risk: true,
    pull_rate: null,
    hosts: 'Raspberries, blackberries, blueberries, strawberries, cherries, plums, grapes',
    tagline: 'A fruit fly that ruins ripe, healthy berries.',
    quickId: [
      'Small yellow-brown fly, 2–3 mm long, with red eyes',
      'KEY: males have a dark spot near the tip of each wing',
      'Females have a large, saw-toothed egg-laying tube',
      'Larvae: tiny white maggots (1–4 mm) inside fruit',
      'Fruit with soft, sunken, brown spots',
    ],
    lookAlikes: [
      'Common vinegar flies have no wing spots and lay eggs in overripe or rotting fruit, not healthy fruit.',
    ],
    whyHarmful:
      'Unlike most fruit flies, it lays eggs in ripe, healthy fruit, so larvae ruin fruit right before harvest.',
    farmImpact:
      'It is a major pest for berry, cherry and grape growers. It has been in Illinois since 2012 and can have up to 10 generations a year.',
    management: [
      'Monitor with traps. Catching it in traps is the signal to take action.',
      'Check fruit by crushing at least 15 ripe berries in a bag of strong salt water. After 30 minutes, larvae float out.',
      'Sanitation: pick and destroy fallen and infested fruit.',
      'Cover plants with fine insect netting (80-gram row cover). Insecticides must be labeled for this pest.',
    ],
    disposal: 'Bag infested fruit and put it in the trash, or freeze it. Don’t compost it.',
    safety: 'Harmless to people.',
    bestMonths: [7, 8, 9, 10],
    bestTimeNote: 'Numbers rise through late summer and fall.',
    images: [
      {
        file: 'DrosophilasuzukiiphotoMcEvey.jpg',
        caption: 'Male (with wing spots) and female',
        credit: 'Shane F. McEvey, Australian Museum',
        license: 'CC BY 4.0',
      },
    ],
  },

  asian_longhorned_tick: {
    key: 'asian_longhorned_tick',
    type: 'insect', // a tick, not an insect; grouped with pests for the app
    group: 'Livestock pest',
    name: 'Asian Longhorned Tick',
    scientific: 'Haemaphysalis longicornis',
    emoji: '🕷️',
    color: '#8d6e63',
    farm_risk: true,
    pull_rate: null,
    hosts: 'Cattle, deer, sheep, goats, horses, dogs, wildlife, birds and people',
    tagline: 'A tick that clones itself and swarms livestock. New to Illinois in 2024.',
    quickId: [
      'Very small, plain light-brown tick with no white markings',
      'Unfed adults are about the size of a sesame seed. Fed ones swell to pea size.',
      'Nymphs can appear in huge numbers',
      'Found in tall grass, wooded areas and low swampy spots',
    ],
    lookAlikes: [
      'Lone star ticks (white spot on females) and American dog ticks (white markings) have patterns. Asian longhorned ticks are plain brown.',
    ],
    whyHarmful:
      'Females can reproduce without males. One tick can lay up to 2,000 eggs and start a new population.',
    farmImpact:
      'Heavy infestations can kill cattle and other livestock. It was first found in west central Illinois in April 2024.',
    management: [
      'Do regular tick checks on people, pets and livestock.',
      'Keep grass short and mow pastures. Mowing plus labeled products can reduce tick numbers.',
      'Keep livestock out of infested woods until late fall.',
      'Ask a herd veterinarian about livestock tick treatment.',
    ],
    disposal:
      'Put ticks in rubbing alcohol in a sealed, labeled container (date and location) and take them to your county Extension office.',
    safety:
      'Remove ticks with tweezers close to the skin and pull gently. Wash your hands, and clean the bite with alcohol.',
    bestMonths: [4, 5, 6, 7, 8, 9],
    bestTimeNote: 'Ticks are active from spring through early fall.',
    images: [
      {
        file: 'Longhorned tick (Haemaphysalis longicornis).png',
        caption: 'Plain light-brown tick',
        credit: 'James Gathany, CDC',
        license: 'Public domain',
      },
    ],
  },

  jumping_worm: {
    key: 'jumping_worm',
    type: 'insect', // not an insect, but on Extension's invasive insects list
    group: 'Garden / soil pest',
    name: 'Jumping Worm',
    scientific: 'Amynthas spp.',
    emoji: '🪱',
    color: '#6d4c41',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Soil and leaf litter in gardens and forests',
    tagline: 'A worm that thrashes like a snake and turns soil into coffee grounds.',
    quickId: [
      'Thrashes, jumps and wriggles violently when touched',
      'KEY: a smooth, milky-white band (clitellum) that wraps all the way around the body and lies flat, close to the head',
      'Glossy gray-brown body, 1.5–8 in long',
      'Soil looks like loose, grainy coffee grounds',
      'Leaf litter disappears quickly',
    ],
    lookAlikes: [
      'Nightcrawlers have a raised, pinkish band that does not wrap fully around the body, and they move slowly.',
    ],
    whyHarmful:
      'It eats the forest leaf layer and changes soil structure, leaving plants and seedlings without nutrients or protection.',
    farmImpact: 'It is a problem for gardens, nurseries and woodlands. It spreads in mulch, compost and potted plants.',
    management: [
      'Buy mulch, compost and plants from trusted sources, and inspect potted plants.',
      'Hand-collect worms into a sealed bag, leave it in the sun, then put it in the trash.',
      'Never use them as fishing bait or release them.',
      'Clean soil off tools, boots and tires.',
    ],
    disposal: 'Bag and trash them. Never put them in compost.',
    safety: 'Harmless to people.',
    bestMonths: [7, 8, 9, 10],
    bestTimeNote: 'Adults are most visible from mid-summer to fall.',
    images: [
      {
        file: 'Amynthas agrestis (cropped).jpg',
        caption: 'Glossy body with a flat, milky-white band near the head',
        credit: 'Njh5880',
        license: 'CC BY-SA 4.0',
      },
    ],
  },

  hammerhead_worm: {
    key: 'hammerhead_worm',
    type: 'insect', // a flatworm; on Extension's invasive insects list
    group: 'Garden / soil pest',
    name: 'Hammerhead Worm',
    scientific: 'Bipalium spp.',
    emoji: '🔨',
    color: '#a1887f',
    farm_risk: false,
    pull_rate: null,
    hosts: 'Preys on earthworms, slugs and other soil animals',
    tagline: 'A predatory flatworm first reported in Illinois near Urbana.',
    quickId: [
      'KEY: flat, shovel- or hammer-shaped head',
      'Long, flat body (can be several inches) with one or more dark stripes running its length',
      'Slimy. Found under rocks, logs, leaf litter and mulch in damp spots',
    ],
    lookAlikes: [
      'Earthworms are round, segmented and have no stripes or hammer-shaped head.',
    ],
    whyHarmful:
      'It hunts earthworms and other soil invertebrates. About three non-native species are thought to occur in Illinois, first reported near Urbana around 1997.',
    farmImpact: 'It can reduce earthworm populations in gardens and nurseries.',
    management: [
      'Do NOT cut it up. Each piece can grow into a new worm.',
      'Pick it up with gloves or tweezers and drop it into rubbing alcohol, vinegar or salt, or freeze it.',
      'Isolate and check potted plants and nursery stock before moving them outdoors.',
      'Inspect mulch and landscaping materials.',
    ],
    disposal: 'Seal dead worms in a bag and put it in the trash.',
    safety:
      'Its slime contains a toxin (tetrodotoxin) that can irritate eyes and mouth. Wear gloves, wash your hands, and keep pets from eating it.',
    bestMonths: [5, 6, 7, 8, 9],
    bestTimeNote: 'Look in damp spots after rain during the warm months.',
    images: [
      {
        file: 'Bipalium strubelli.JPG',
        caption: 'Hammer-shaped head and striped body',
        credit: 'Eduard Solà',
        license: 'CC BY-SA 3.0',
      },
    ],
  },
}
