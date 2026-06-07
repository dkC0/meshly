// =============================================================================
// MESHLY — Shared TypeScript Types
// =============================================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface ProcessPhase {
  index: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
}

export interface PhilosophyStatement {
  title: string;
  lines: string[];
}

export interface SectionProps {
  className?: string;
  id?: string;
}
