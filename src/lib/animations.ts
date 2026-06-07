// =============================================================================
// MESHLY — Shared Framer Motion Variants
// Movement arrives like a considered decision, not a reflex.
// =============================================================================

import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Easing constants — matching CSS custom properties
// ---------------------------------------------------------------------------

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;
export const EASE_IN_EXPO = [0.7, 0, 0.84, 0] as const;

// ---------------------------------------------------------------------------
// Duration constants
// ---------------------------------------------------------------------------

export const DURATION = {
  micro: 0.1,
  short: 0.2,
  medium: 0.4,
  long: 0.7,
  crawl: 1.2,
} as const;

// ---------------------------------------------------------------------------
// Stagger timing
// ---------------------------------------------------------------------------

export const STAGGER_INTERVAL = 0.07; // 70ms between siblings
export const STAGGER_MAX_DEPTH = 5;

// ---------------------------------------------------------------------------
// IntersectionObserver viewport settings
// ---------------------------------------------------------------------------

export const VIEWPORT_SETTINGS = {
  once: true,
  margin: '-15%',
} as const;

// ---------------------------------------------------------------------------
// VARIANT: fadeIn
// Body text, metadata, secondary content.
// Opacity only — no translation for structural elements.
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: riseIn
// Body text and prose — the one case where y-translation is used.
// Reserved for floating content, not structural elements.
// ---------------------------------------------------------------------------

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: riseInSubtle
// Sub-statements, secondary copy — smaller y offset.
// ---------------------------------------------------------------------------

export const riseInSubtle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: drawRule
// Horizontal dividers draw in left→right before adjacent content.
// scaleX 0→1, transform origin left.
// ---------------------------------------------------------------------------

export const drawRule: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: DURATION.long,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const drawRuleFast: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: drawRuleDown
// Vertical rules draw downward from node (Process section).
// scaleY 0→1, transform origin top.
// ---------------------------------------------------------------------------

export const drawRuleDown: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: nodeAppear
// Mesh node circles — appear before vertical rules.
// scale 0→1.
// ---------------------------------------------------------------------------

export const nodeAppear: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: staggerContainer
// Parent wrapper that staggers children.
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_INTERVAL,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: projectStrip
// Project strips enter as a unit — structural, no float.
// Opacity only, no y-translation.
// ---------------------------------------------------------------------------

export const projectStrip: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: philosophyStatement
// Philosophy belief statements — enter as a unit.
// ---------------------------------------------------------------------------

export const philosophyStatement: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: stillness
// Text blocks that only fade — no movement.
// Used in About section and Contact headline.
// ---------------------------------------------------------------------------

export const stillness: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_STANDARD,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: ctaFade
// CTA elements — fast fade, no translation.
// ---------------------------------------------------------------------------

export const ctaFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: processPhase
// Process section phases — stagger after node and rule animations.
// ---------------------------------------------------------------------------

export const processPhase: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_OUT_EXPO,
      delay: 0.2,
    },
  },
};

// ---------------------------------------------------------------------------
// VARIANT: pageEnter
// Full page entrance — opacity only, 300ms
// The page appears — it does not arrive.
// ---------------------------------------------------------------------------

export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: EASE_STANDARD,
    },
  },
};
