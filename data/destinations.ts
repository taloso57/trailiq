export type Destination = {
  id: string
  name: string
  country: string
  type: 'Hut-to-Hut' | 'Wild Camping' | 'Guided Climb'
  description: string
  href: string
  heroImage?: string
  imagePosition?: string  // CSS object-position for the card crop, e.g. 'center 70%'
  accentColor: string
  emoji: string
}

export const destinations: Destination[] = [
  {
    id: 'dolomites',
    name: 'Dolomites',
    country: 'Italy',
    type: 'Hut-to-Hut',
    description: 'Classic Alpine rifugi trekking — no tent needed, hot meals included.',
    href: '/blog/dolomites-packing-list',
    heroImage: '/images/dolomites-hero.jpg', // Photo by Fernanda W Corso on Pexels
    accentColor: '#059669',
    emoji: '⛰️',
  },
  {
    id: 'kilimanjaro',
    name: 'Kilimanjaro',
    country: 'Tanzania',
    type: 'Guided Climb',
    description: '7-day Machame route to 5,895 m — porters carry the camp, you carry the day.',
    href: '/blog/kilimanjaro-packing-list',
    heroImage: '/images/kili-hero.jpg',
    imagePosition: 'center 60%', // sunrise silhouettes — shift down past the bright sky
    accentColor: '#B85C38',
    emoji: '🌋',
  },
  {
    id: 'tmb',
    name: 'Tour du Mont Blanc',
    country: 'France · Italy · Switzerland',
    type: 'Wild Camping',
    description: "165 km loop around Western Europe's highest massif, camping all the way.",
    href: '/blog/tour-du-mont-blanc-camping-packing-list',
    heroImage: '/images/tmb-hero.jpg',
    imagePosition: 'center 40%', // Italian road shot — mountains/chalet visible, not just road
    accentColor: '#356092',
    emoji: '🏕️',
  },
  {
    id: 'fagaras',
    name: 'Făgăraș Mountains',
    country: 'Romania',
    type: 'Wild Camping',
    description: '70 km ridge above 2,000 m — legal wild camping, real bear country.',
    href: '/blog/fagaras-mountains-wild-camping-packing-list',
    heroImage: '/images/fagaras-hero.jpg', // Photo by Dan Badiu on Pexels
    imagePosition: 'center 50%',
    accentColor: '#2E5240',
    emoji: '🐻',
  },
]
