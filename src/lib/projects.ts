// =============================================================================
// MESHLY — Project Data
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
      'A reservations system that made the phone stop ringing — by making the website worth trusting.',
    href: '/work/marani',
  },
  {
    index: '02',
    name: 'Adriano',
    clientType: 'Pizzeria Chain',
    year: '2025',
    metric: '2.1s',
    metricLabel: 'avg. LCP',
    synthesis:
      'Brand confidence translated into page speed — because slow sites are a trust problem, not a technical one.',
    href: '/work/adriano',
  },
  {
    index: '03',
    name: 'Vantage',
    clientType: 'Premium Services',
    year: '2026',
    metric: '+58%',
    metricLabel: 'inquiry rate',
    synthesis:
      'A positioning shift made visible — moving from price-competitive to value-certain in a single session.',
    href: '/work/vantage',
  },
];
