// =============================================================================
// MESHLY — Design Tokens as TypeScript Constants
// Single source of truth for design decisions.
// =============================================================================

export const COLORS = {
  graphitePaper: '#F4F3F0',
  chalkPlane: '#FAFAF8',
  inkAbsolute: '#141412',
  ink: '#2C2C2C',
  pewter: '#8C8C8C',
  signalCopper: '#C8652A',
  ruleAsh: '#C9C7C2',
  blueprintNight: '#1C1F2A',
} as const;

export const FONTS = {
  sans: "'Suisse Intl', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  serif: "'EB Garamond', 'Garamond', 'Georgia', serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
} as const;

export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  navBreak: 900,
  desktop: 1024,
  wide: 1440,
  max: 1920,
} as const;

export const SPACING = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  8: 64,
  10: 80,
  12: 96,
  15: 120,
  20: 160,
} as const;

export const NAV_HEIGHT = 64; // px

export const SITE_META = {
  name: 'Meshly',
  title: 'Meshly — Web Design Studio',
  description:
    'Meshly builds web systems for companies that understand the difference between a website that looks good and one that works. Based in Warsaw, Poland.',
  url: 'https://meshly.pl',
  email: 'hello@meshly.pl',
  location: 'Warsaw, Poland',
  established: '2024',
  ogImage: '/og-image.svg',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;
