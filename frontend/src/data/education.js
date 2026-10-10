// Education content for the Invasive Pull Site app.
//
// Species data lives in speciesPlants.js and speciesPests.js. All species can
// be reported; pests do not produce volunteer pull sites.
//
// Sources:
//  - Illinois Extension, "Management of Invasive Plants and Pests of Illinois"
//    https://extension.illinois.edu/sites/default/files/management_of_invasive_plants_and_pests_of_illinois.pdf
//  - Illinois Extension, Invasive Insects
//    https://extension.illinois.edu/invasives/invasive-insects

import { PLANTS } from './speciesPlants.js'
import { PESTS } from './speciesPests.js'

export const SOURCES = [
  {
    label: 'Illinois Extension: Management of Invasive Plants and Pests of Illinois',
    url: 'https://extension.illinois.edu/sites/default/files/management_of_invasive_plants_and_pests_of_illinois.pdf',
  },
  {
    label: 'Illinois Extension: Invasive Insects',
    url: 'https://extension.illinois.edu/invasives/invasive-insects',
  },
]

// Education points (frontend state only, like the spec's report/signup points).
export const POINTS = {
  lesson: 2, // finishing a lesson (first time only)
  quiz: 10, // passing a module quiz (first time only)
}

export const QUIZ_PASS_RATIO = 0.7

export const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// ---------------------------------------------------------------------------
// Species
// ---------------------------------------------------------------------------
// Each species: key, type ('plant' | 'insect'), group, name, scientific,
// emoji, color, farm_risk, pull_rate (null for pests), tagline, quickId,
// lookAlikes, whyHarmful, farmImpact, management, disposal, safety,
// bestMonths (1-12), bestTimeNote, images, optional hosts, optional in_spec.
// ---------------------------------------------------------------------------

export const SPECIES_INFO = { ...PLANTS, ...PESTS }

export const ALL_SPECIES = Object.values(SPECIES_INFO)

// ---------------------------------------------------------------------------
// Photos
// ---------------------------------------------------------------------------
// Freely licensed images hotlinked from Wikimedia Commons. `file` is the
// Commons file name; commonsImage() builds a resized URL and commonsPage()
// links to the file page with full license details. The first image is the
// species' main photo, and any others show a key ID feature.
// ---------------------------------------------------------------------------

export function commonsImage(file, width = 800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`
}

export function commonsPage(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------
// Each module has lessons. A lesson is either a species lesson
// ({ kind: 'species', species: key }) or a text lesson
// ({ kind: 'text', id, title, emoji, sections: [{ heading, points: [] }] }).
// ---------------------------------------------------------------------------

const speciesLessons = (...keys) => keys.map((species) => ({ kind: 'species', species }))

export const MODULES = [
  {
    id: 'basics',
    title: 'Invasives 101',
    emoji: '🧭',
    summary: 'What makes a species invasive, and how to make a report the team can act on.',
    lessons: [
      {
        kind: 'text',
        id: 'what_is_invasive',
        title: 'What is an invasive species?',
        emoji: '❓',
        sections: [
          {
            heading: 'Definition',
            points: [
              'An invasive species is non-native AND causes harm to the environment, the economy or human health.',
              'Not every non-native plant is invasive. Tomatoes and soybeans are non-native, but they don’t spread out of control.',
              'Invasives arrive without the predators and diseases that keep them in check at home, so they spread fast.',
            ],
          },
          {
            heading: 'Why it matters in Champaign-Urbana',
            points: [
              'Central Illinois is mostly farmland, so invasive weeds and pests directly reduce crop and livestock income.',
              'Our remaining woodlands and prairies are small, so a few invasive patches can take over quickly.',
              'Small patches are cheap to remove. Large infestations can take years and lots of money.',
            ],
          },
          {
            heading: 'How you can help',
            points: [
              'Don’t plant invasive species, and don’t move firewood.',
              'Clean seeds and mud off shoes, gear and pets after being outdoors.',
              'Report new patches early. Control is never a one-time effort.',
            ],
          },
        ],
      },
      {
        kind: 'text',
        id: 'good_report',
        title: 'How to make a great report',
        emoji: '📸',
        sections: [
          {
            heading: 'Photograph',
            points: [
              'Take one photo of the whole plant or insect, then close-ups of leaves, stems, flowers or fruit.',
              'Put a coin or your hand in the photo for scale.',
              'For trees, photograph the bark, exit holes or damage.',
            ],
          },
          {
            heading: 'Locate',
            points: [
              'Click the exact spot on the map. Accurate locations let the app group reports into pull sites.',
              'Report each patch separately. Three or more reports of the same species within 200 m create a volunteer pull site.',
            ],
          },
          {
            heading: 'Don’t spread it',
            points: [
              'Don’t carry plants, seeds or insects to another place to "show someone."',
              'Brush seeds off your shoes and clothes before you leave.',
              'Never touch poison hemlock or wild parsnip with bare skin.',
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which statement best defines an invasive species?',
        options: [
          'Any plant that is not native to Illinois',
          'A non-native species that causes environmental, economic or health harm',
          'Any weed growing in a farm field',
          'A species that is endangered',
        ],
        answer: 1,
        explain: 'Being non-native is not enough. An invasive species must also cause harm.',
      },
      {
        q: 'In this app, what turns reports into a volunteer pull site?',
        options: [
          'Any single report',
          '3+ reports of any species anywhere in town',
          '3+ reports of the same species within 200 m',
          'A farmer’s request',
        ],
        answer: 2,
        explain: 'The backend groups 3 or more reports of the same species within 200 m into a pull site.',
      },
      {
        q: 'You find a plant you think is invasive. What should you NOT do?',
        options: [
          'Take close-up photos of the leaves and flowers',
          'Pull a seeding stalk and carry it home to identify it',
          'Mark the exact location on the map',
          'Brush seeds off your boots before leaving',
        ],
        answer: 1,
        explain: 'Moving plants with seeds spreads the problem. Take photos and report it instead.',
      },
    ],
  },

  {
    id: 'trees_shrubs',
    title: 'Invasive Trees & Shrubs',
    emoji: '🌳',
    summary: 'Woody invaders, from buckthorn thickets to Callery pear.',
    lessons: speciesLessons(
      'buckthorn',
      'multiflora_rose',
      'amur_honeysuckle',
      'autumn_olive',
      'callery_pear',
      'common_privet',
      'japanese_barberry',
      'norway_maple',
      'princesstree',
      'sawtooth_oak',
      'tree_of_heaven',
      'winged_burning_bush',
    ),
    quiz: [
      {
        q: 'A shrub has leaves that are silvery underneath and red berries with silver speckles. What is it?',
        options: ['Amur honeysuckle', 'Autumn olive', 'Common privet', 'Japanese barberry'],
        answer: 1,
        explain: 'Silvery leaf undersides and speckled red berries are autumn olive’s signature.',
      },
      {
        q: 'Crushed leaves smell like rancid peanut butter, and each leaflet has small notches near its base. What is it?',
        options: ['Black walnut', 'Sumac', 'Tree of heaven', 'Sawtooth oak'],
        answer: 2,
        explain: 'The smell and the notched leaflet bases set tree of heaven apart from sumac and walnut.',
      },
      {
        q: 'Why shouldn’t you cut down a large tree of heaven without herbicide?',
        options: [
          'It’s illegal',
          'Cutting triggers lots of new root suckers',
          'The wood is poisonous',
          'It will fall on power lines',
        ],
        answer: 1,
        explain: 'Cutting alone makes the infestation worse by causing root suckering.',
      },
      {
        q: 'You snap a maple leaf stalk and milky white sap comes out. What tree is it?',
        options: ['Sugar maple', 'Norway maple', 'Silver maple', 'Callery pear'],
        answer: 1,
        explain: 'Norway maple has milky sap. Native sugar maple’s sap is clear.',
      },
      {
        q: 'Why are Japanese barberry thickets a health concern?',
        options: [
          'Their berries are poisonous to touch',
          'They hold humidity that ticks thrive in',
          'They attract wasps',
          'Their pollen causes allergies',
        ],
        answer: 1,
        explain: 'Dense barberry creates humid hiding spots for blacklegged ticks.',
      },
      {
        q: 'Which shrub has corky "wings" along its stems?',
        options: ['Winged burning bush', 'Multiflora rose', 'Buckthorn', 'Princesstree'],
        answer: 0,
        explain: 'The corky wings give winged burning bush its name.',
      },
    ],
  },

  {
    id: 'vines',
    title: 'Invasive Vines',
    emoji: '🍃',
    summary: 'Climbers and creepers that smother trees and ground.',
    lessons: speciesLessons(
      'black_swallowwort',
      'chinese_yam',
      'japanese_honeysuckle',
      'japanese_hops',
      'kudzu',
      'roundleaf_bittersweet',
      'wintercreeper',
    ),
    quiz: [
      {
        q: 'A vine has heart-shaped leaves and small potato-like growths where the leaves meet the stem. What is it?',
        options: ['Japanese honeysuckle', 'Chinese yam', 'Kudzu', 'Wintercreeper'],
        answer: 1,
        explain: 'Those "mini potatoes" are bulbils, and each one can grow a new Chinese yam plant.',
      },
      {
        q: 'How do you tell invasive roundleaf bittersweet from native American bittersweet?',
        options: [
          'Roundleaf has fruit clusters all along the stem; American has them only at branch tips',
          'Roundleaf has blue berries',
          'American bittersweet has thorns',
          'They can’t be told apart',
        ],
        answer: 0,
        explain: 'Check where the fruit grows before removing any bittersweet.',
      },
      {
        q: 'Why is black swallow-wort bad for monarch butterflies?',
        options: [
          'It poisons adult monarchs',
          'Monarchs lay eggs on it, but the caterpillars can’t survive',
          'It replaces nectar flowers',
          'It isn’t, monarchs love it',
        ],
        answer: 1,
        explain: 'It is related to milkweed, which fools monarchs into laying eggs on it.',
      },
      {
        q: 'A huge vine has 3 large hairy leaflets and purple flowers that smell like grape soda. What is it?',
        options: ['Poison ivy', 'Kudzu', 'Japanese hops', 'Wintercreeper'],
        answer: 1,
        explain: 'Kudzu has 3 leaflets, hairy stems and grape-scented flowers.',
      },
      {
        q: 'Why should you wear gloves when pulling Japanese hops?',
        options: [
          'Its sap burns in sunlight',
          'Its stems have hooked prickles that scratch skin',
          'It carries ticks',
          'It is poisonous to touch',
        ],
        answer: 1,
        explain: 'Downward-hooked prickles make it feel like sandpaper.',
      },
    ],
  },

  {
    id: 'field_weeds',
    title: 'Field & Roadside Weeds',
    emoji: '🌾',
    summary: 'The invasives that hit farms hardest, along fields, pastures and roads.',
    lessons: speciesLessons(
      'canada_thistle',
      'poison_hemlock',
      'wild_parsnip',
      'musk_thistle',
      'spotted_knapweed',
      'teasel',
      'sweet_clover',
      'crown_vetch',
      'birdsfoot_trefoil',
      'sericea_lespedeza',
      'leafy_spurge',
    ),
    quiz: [
      {
        q: 'You find a plant with smooth stems covered in purple blotches. What should you assume?',
        options: [
          'Wild carrot, safe to pull barehanded',
          'Poison hemlock, deadly and only for trained volunteers',
          'Wild parsnip, only dangerous in the dark',
          'Crown vetch, harmless',
        ],
        answer: 1,
        explain: 'Purple-blotched smooth stems mean poison hemlock. Wild carrot stems are hairy.',
      },
      {
        q: 'What happens if wild parsnip sap gets on your skin in sunlight?',
        options: [
          'Nothing',
          'Mild itching',
          'Severe burns and blisters',
          'Your skin turns yellow temporarily',
        ],
        answer: 2,
        explain: 'Wild parsnip sap plus sunlight causes painful burns that can scar.',
      },
      {
        q: 'Why is moldy sweet clover hay dangerous?',
        options: [
          'It causes a fatal bleeding disorder in cattle',
          'It catches fire easily',
          'It attracts ticks',
          'It isn’t dangerous',
        ],
        answer: 0,
        explain: 'Mold turns a compound in sweet clover into a blood thinner.',
      },
      {
        q: 'Which feature points to musk thistle instead of Canada thistle?',
        options: [
          'Small clustered flower heads and smooth stems',
          'Large nodding flower heads and spiny-winged stems',
          'Yellow flowers',
          'No spines at all',
        ],
        answer: 1,
        explain: 'Musk thistle’s big nodding heads and winged stems stand out.',
      },
      {
        q: 'Why do livestock avoid sericea lespedeza?',
        options: [
          'It has thorns',
          'It is high in bitter tannins',
          'It smells like garlic',
          'It causes burns',
        ],
        answer: 1,
        explain: 'The tannins make it bitter and low in nutrition, so pastures lose value.',
      },
      {
        q: 'What makes leafy spurge a farm problem?',
        options: [
          'Its milky sap is toxic to cattle and horses',
          'It attracts Japanese beetles',
          'It only grows in water',
          'It isn’t a farm problem',
        ],
        answer: 0,
        explain: 'Leafy spurge is toxic to cattle and horses and takes over pastures.',
      },
    ],
  },

  {
    id: 'woodland_wetland',
    title: 'Woodland & Wetland Plants',
    emoji: '🌲',
    summary: 'Invaders of forest floors, floodplains and marshes.',
    lessons: speciesLessons(
      'garlic_mustard',
      'dames_rocket',
      'fig_buttercup',
      'japanese_chaff_flower',
      'japanese_hedge_parsley',
      'japanese_knotweed',
      'purple_loosestrife',
    ),
    quiz: [
      {
        q: 'You crush a leaf from a low rosette in April and it smells like garlic. What is it most likely?',
        options: ['Violet', 'Garlic mustard', 'Fig buttercup', 'Dame’s rocket'],
        answer: 1,
        explain: 'The garlic smell is the quickest field test for garlic mustard.',
      },
      {
        q: 'How can you tell dame’s rocket from native phlox?',
        options: [
          'Dame’s rocket has 4 petals; phlox has 5',
          'Dame’s rocket is always white',
          'Phlox smells like garlic',
          'They can’t be told apart',
        ],
        answer: 0,
        explain: 'Count the petals: 4 means dame’s rocket.',
      },
      {
        q: 'When removing fig buttercup, what MUST you get out of the ground?',
        options: [
          'Just the flowers',
          'All the bulblets and tubers',
          'Only the biggest leaves',
          'Nothing, it dies on its own',
        ],
        answer: 1,
        explain: 'Any bulblet or tuber left behind grows into a new plant.',
      },
      {
        q: 'Why must Japanese knotweed never be composted?',
        options: [
          'It smells bad',
          'Tiny stem or root pieces grow into new plants',
          'It is poisonous',
          'It attracts rats',
        ],
        answer: 1,
        explain: 'Bag every fragment for the landfill.',
      },
      {
        q: 'A wetland plant has square stems and tall magenta flower spikes in August. What is it?',
        options: ['Purple loosestrife', 'Blazing star', 'Dame’s rocket', 'Crown vetch'],
        answer: 0,
        explain: 'Square stems and magenta spikes in wetlands point to purple loosestrife.',
      },
      {
        q: 'What should you do after working in a patch of Japanese chaff flower or hedge parsley?',
        options: [
          'Nothing special',
          'Check clothing, shoes and pets for stuck seeds',
          'Water the area',
          'Burn your clothes',
        ],
        answer: 1,
        explain: 'Both have seeds that hitchhike on clothing and fur.',
      },
    ],
  },

  {
    id: 'grasses',
    title: 'Invasive Grasses',
    emoji: '🎍',
    summary: 'Grasses that take over wetlands, ditches, forests and crop fields.',
    lessons: speciesLessons('common_reed', 'japanese_stiltgrass', 'johnsongrass', 'reed_canarygrass'),
    quiz: [
      {
        q: 'A small grass on the forest floor has short bamboo-like leaves with a silver stripe slightly off-center. What is it?',
        options: ['Reed canarygrass', 'Japanese stiltgrass', 'Johnsongrass', 'Phragmites'],
        answer: 1,
        explain: 'The off-center silver stripe is stiltgrass’s giveaway.',
      },
      {
        q: 'What happens if you mow or burn phragmites WITHOUT herbicide?',
        options: [
          'It dies',
          'The stand gets denser',
          'It turns into native reed',
          'Nothing changes',
        ],
        answer: 1,
        explain: 'Mowing or burning alone makes phragmites stands denser.',
      },
      {
        q: 'Why can johnsongrass be dangerous to livestock?',
        options: [
          'Its seeds are sharp',
          'After frost or drought it can produce prussic acid (cyanide)',
          'It carries ticks',
          'It causes skin burns',
        ],
        answer: 1,
        explain: 'Stressed johnsongrass can produce prussic acid, which is toxic to livestock.',
      },
      {
        q: 'What is required before using herbicide where it might reach water?',
        options: [
          'Nothing',
          'An aquatic-safe product, and possibly an Illinois EPA permit',
          'Only a weather check',
          'A fishing license',
        ],
        answer: 1,
        explain: 'Near water, only aquatic-labeled herbicides can be used, and a permit may be required.',
      },
      {
        q: 'Which grass is the easiest for volunteers to hand-pull?',
        options: ['Johnsongrass', 'Phragmites', 'Japanese stiltgrass', 'Reed canarygrass'],
        answer: 2,
        explain: 'Stiltgrass has very shallow roots and pulls out easily.',
      },
    ],
  },

  {
    id: 'tree_pests',
    title: 'Tree Pests',
    emoji: '🪲',
    summary: 'Beetles, moths and sawflies that threaten Illinois trees.',
    lessons: speciesLessons(
      'emerald_ash_borer',
      'spotted_lanternfly',
      'asian_longhorned_beetle',
      'spongy_moth',
      'flighted_spongy_moth',
      'elm_zigzag_sawfly',
      'twolined_chestnut_borer',
    ),
    quiz: [
      {
        q: 'You see a hopping insect with tan, black-spotted forewings and red hindwings. What should you do?',
        options: [
          'Ignore it, it’s a native moth',
          'Photograph it, squash it, and report it',
          'Catch it and release it in a park',
          'Spray the whole tree with insecticide',
        ],
        answer: 1,
        explain: 'Spotted lanternfly is a new Illinois pest, and early reports are important.',
      },
      {
        q: 'What shape are emerald ash borer exit holes?',
        options: ['Round and dime-sized', 'D-shaped', 'Square', 'Star-shaped'],
        answer: 1,
        explain: 'EAB leaves small D-shaped holes, about ⅛ in wide.',
      },
      {
        q: 'What do Asian longhorned beetle exit holes look like?',
        options: ['Tiny D-shapes', 'Round, about dime-sized', 'Zigzag lines', 'There are no holes'],
        answer: 1,
        explain: 'ALB leaves round holes about ⅜ in wide.',
      },
      {
        q: 'What does elm zigzag sawfly damage look like?',
        options: [
          'Zigzag feeding paths between the veins of elm leaves',
          'Holes in oak bark',
          'Sticky honeydew',
          'Webs in tree forks',
        ],
        answer: 0,
        explain: 'The zigzag feeding pattern on elm leaves gives the pest its name.',
      },
      {
        q: 'Why is flighted spongy moth a bigger threat than European spongy moth?',
        options: [
          'Its caterpillars are bigger',
          'Its females can fly, so it spreads faster',
          'It bites people',
          'It eats crops',
        ],
        answer: 1,
        explain: 'European spongy moth females can’t fly. Flighted females can.',
      },
      {
        q: 'Which of these "tree pests" is actually a native beetle?',
        options: [
          'Emerald ash borer',
          'Asian longhorned beetle',
          'Twolined chestnut borer',
          'Spotted lanternfly',
        ],
        answer: 2,
        explain: 'Twolined chestnut borer is native, but it kills stressed oaks.',
      },
    ],
  },

  {
    id: 'farm_pests',
    title: 'Farm, Garden & Livestock Pests',
    emoji: '🐞',
    summary: 'Pests of crops, fruit, gardens and livestock.',
    lessons: speciesLessons(
      'japanese_beetle',
      'brown_marmorated_stink_bug',
      'swede_midge',
      'spotted_wing_drosophila',
      'asian_longhorned_tick',
      'jumping_worm',
      'hammerhead_worm',
    ),
    quiz: [
      {
        q: 'Which feature identifies a Japanese beetle?',
        options: [
          '6 white hair tufts along each side',
          'Red wings with black spots',
          'White bands on the antennae',
          'Blue and red dots on its back',
        ],
        answer: 0,
        explain: 'The white tufts separate it from native green beetles.',
      },
      {
        q: 'Why are Japanese beetle traps not recommended?',
        options: [
          'They are too expensive',
          'The lure attracts more beetles than the trap catches',
          'They are illegal in Illinois',
          'They only catch grubs',
        ],
        answer: 1,
        explain: 'Hand-pick beetles into soapy water instead.',
      },
      {
        q: 'What makes spotted wing drosophila worse than ordinary fruit flies?',
        options: [
          'It bites people',
          'It lays eggs in ripe, healthy fruit instead of rotting fruit',
          'It only eats leaves',
          'It is much bigger',
        ],
        answer: 1,
        explain: 'Larvae ruin fruit right before harvest.',
      },
      {
        q: 'Why can a single Asian longhorned tick start a whole population?',
        options: [
          'Females can reproduce without males',
          'It lives for 20 years',
          'It can fly',
          'It can’t',
        ],
        answer: 0,
        explain: 'One female can lay up to 2,000 eggs without mating.',
      },
      {
        q: 'You find a hammerhead worm in your garden. What should you NOT do?',
        options: [
          'Wear gloves to pick it up',
          'Drop it in rubbing alcohol or vinegar',
          'Cut it into pieces',
          'Wash your hands afterward',
        ],
        answer: 2,
        explain: 'Each cut piece can grow into a new worm.',
      },
      {
        q: 'Broccoli plants have twisted tips and no heads. Which pest could cause this?',
        options: ['Jumping worm', 'Swede midge', 'Spongy moth', 'Emerald ash borer'],
        answer: 1,
        explain: 'Swede midge larvae feed in brassica growing tips. You identify it by the damage.',
      },
    ],
  },

  {
    id: 'removal',
    title: 'Safe & Sustainable Removal',
    emoji: '🧤',
    summary: 'How to run or join a volunteer pull site without making things worse.',
    lessons: [
      {
        kind: 'text',
        id: 'pull_day',
        title: 'Pull-site day: before, during, after',
        emoji: '📋',
        sections: [
          {
            heading: 'Before',
            points: [
              'Check which species the site is for. The pull-site estimate assumes about 3 hours of work.',
              'Get the landowner’s permission. Never pull on private farmland without it.',
              'Bring gloves, long sleeves, closed-toe shoes, water, and heavy-duty contractor bags.',
            ],
          },
          {
            heading: 'During',
            points: [
              'Pull when the soil is moist so the whole root comes out.',
              'Pull slowly from the base and shake off soil, but keep seeds on the plant.',
              'Bag anything that is flowering or has seeds right away.',
              'Watch out for native look-alikes. When in doubt, leave it.',
            ],
          },
          {
            heading: 'After',
            points: [
              'Brush off boots, clothing, pets and tools before leaving to avoid spreading seeds.',
              'Take bags to the landfill. Do NOT compost invasive plants with seeds.',
              'Plan to come back. Most sites need follow-up visits for several years.',
            ],
          },
        ],
      },
      {
        kind: 'text',
        id: 'methods',
        title: 'Choosing a control method',
        emoji: '⚖️',
        sections: [
          {
            heading: 'Mechanical (volunteer-friendly)',
            points: [
              'Hand-pulling: best for garlic mustard, dame’s rocket, stiltgrass and seedlings.',
              'Weed wrench or grubbing tool: for buckthorn, honeysuckle and woody saplings. Remove the root crown.',
              'Repeated cutting or mowing: wears down Canada thistle, multiflora rose and sericea lespedeza over several seasons.',
              'Some plants get WORSE when cut without herbicide (tree of heaven, bittersweet, phragmites, black swallow-wort). Report those instead.',
            ],
          },
          {
            heading: 'Cultural & biological',
            points: [
              'Prescribed fire is done by trained crews only. It can help, but it may also trigger a flush of new seedlings.',
              'Biocontrol uses natural enemies, such as beetles released against purple loosestrife and leafy spurge.',
              'Replant with native species, ideally from seed sourced within 100 miles, so invasives don’t come back.',
            ],
          },
          {
            heading: 'Chemical (professionals only)',
            points: [
              'Herbicides such as cut-stump treatments must be applied by trained or licensed applicators.',
              'Always read and follow the label. The label is the law.',
              'Near water, use only aquatic-safe products. An Illinois EPA permit may be required.',
              'Volunteers in this app should stick to mechanical methods.',
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'You pulled garlic mustard that is already flowering. What do you do with it?',
        options: [
          'Leave it in a pile on site',
          'Put it in your backyard compost',
          'Bag it and take it off site to the landfill',
          'Throw it in a creek',
        ],
        answer: 2,
        explain: 'Flowering garlic mustard can still make seeds after being pulled.',
      },
      {
        q: 'Who should apply herbicide at a pull site?',
        options: [
          'Any volunteer',
          'Trained or licensed applicators',
          'Kids, under supervision',
          'Nobody ever uses herbicide',
        ],
        answer: 1,
        explain: 'Volunteers use mechanical methods. Herbicide is for trained or licensed applicators.',
      },
      {
        q: 'Which plant gets WORSE if volunteers just cut it down?',
        options: ['Garlic mustard', 'Tree of heaven', 'Dame’s rocket', 'Japanese stiltgrass'],
        answer: 1,
        explain: 'Cutting tree of heaven without herbicide triggers many root suckers.',
      },
      {
        q: 'Why should you brush off your boots before leaving a site?',
        options: [
          'To be polite',
          'So you don’t carry invasive seeds to a new place',
          'To keep your car clean',
          'It doesn’t matter',
        ],
        answer: 1,
        explain: 'Boots and gear are one of the main ways invasive seeds spread.',
      },
    ],
  },
]

// Helpers --------------------------------------------------------------------

export function lessonId(lesson) {
  return lesson.kind === 'species' ? lesson.species : lesson.id
}
