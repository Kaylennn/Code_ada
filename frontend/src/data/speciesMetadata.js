export const speciesMetadata = {
  buckthorn: {
    name: 'Common buckthorn',
    farmRisk: true,
    pullRate: 2,
    color: '#55754b',
    description: 'A woody shrub with opposite leaves and dark berries. Dense growth can compete with native vegetation.',
    impact: 'Can form dense stands and compete with plants in woodland edges and open spaces.',
    safety: 'Use local conservation guidance before planning removal.',
  },
  canada_thistle: {
    name: 'Canada thistle',
    farmRisk: true,
    pullRate: 4,
    color: '#9271a5',
    description: 'An upright perennial with spiny leaves and clusters of purple flower heads.',
    impact: 'Dense patches can compete with crops and other plants for space and resources.',
    safety: 'Avoid handling spiny plants; follow local land-management guidance.',
  },
  poison_hemlock: {
    name: 'Poison hemlock',
    farmRisk: true,
    pullRate: 3,
    color: '#8b7151',
    description: 'A tall plant with finely divided leaves, hollow stems, and small white flower clusters.',
    impact: 'The plant is highly toxic to people and animals if ingested.',
    safety: 'Highly toxic. Do not touch or attempt removal; contact trained local authorities.',
    hazardous: true,
  },
  multiflora_rose: {
    name: 'Multiflora rose',
    farmRisk: true,
    pullRate: 2,
    color: '#bd7580',
    description: 'A thorny shrub with arching stems, compound leaves, and clusters of small flowers.',
    impact: 'Thorny thickets can crowd out other vegetation and restrict access.',
    safety: 'Thorns can cause injury. Follow local land-management guidance.',
  },
  garlic_mustard: {
    name: 'Garlic mustard',
    farmRisk: false,
    pullRate: 10,
    color: '#708b62',
    description: 'A woodland herb with scalloped leaves and small white flowers; crushed leaves may smell like garlic.',
    impact: 'Can spread through woodland understories and compete with native plants.',
    safety: 'Use local conservation guidance before planning removal.',
  },
}

export const speciesOptions = Object.entries(speciesMetadata).map(([key, species]) => ({
  key,
  ...species,
}))
