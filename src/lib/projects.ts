// =============================================================================
// MESHLY -- Project Data
// Evidence without theater. The work speaks in specifics, not superlatives.
// =============================================================================

export interface Project {
  index: string;
  name: string;
  clientType: string;
  year: string;
  metric: string;
  metricLabel: string;
  synthesis: string;
  href: string;
  placeholderGradient: string;
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'Marani',
    clientType: 'Restaurant Group',
    year: '2025',
    metric: '+34%',
    metricLabel: 'table bookings',
    synthesis:
      'A reservations system that made the phone stop ringing -- by making the website worth trusting.',
    href: '/work/marani',
    placeholderGradient:
      'linear-gradient(135deg, #1a1510 0%, #2d1f14 35%, #1e1612 65%, #140f0c 100%)',
  },
  {
    index: '02',
    name: 'Adriano',
    clientType: 'Pizzeria Chain',
    year: '2025',
    metric: '2.1s',
    metricLabel: 'avg. LCP',
    synthesis:
      'Brand confidence translated into page speed -- because slow sites are a trust problem, not a technical one.',
    href: '/work/adriano',
    placeholderGradient:
      'linear-gradient(135deg, #0f1514 0%, #1a2820 35%, #12201a 65%, #0c1510 100%)',
  },
  {
    index: '03',
    name: 'Vantage',
    clientType: 'Premium Services',
    year: '2026',
    metric: '+58%',
    metricLabel: 'inquiry rate',
    synthesis:
      'A positioning shift made visible -- moving from price-competitive to value-certain in a single session.',
    href: '/work/vantage',
    placeholderGradient:
      'linear-gradient(135deg, #14110f 0%, #251c14 35%, #1e1610 65%, #120e0a 100%)',
  },
];
