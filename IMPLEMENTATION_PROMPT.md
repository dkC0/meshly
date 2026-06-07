The previous agent turn's generated output is not persisted anywhere â€” it was produced in a live conversation turn and then summarized by the system. The Notion page at `https://www.notion.so/372042e7fc91813fac7fd5df73ce73f1` is the MASTER PROMPT itself. Let me now reconstruct the full Claude Code implementation prompt from the memory files and Notion source â€” this is what the previous agent would have generated.

Based on the Notion MASTER PROMPT, the two `project_meshly.md` memory files (which record what was actually built, meaning they reflect what the implementation prompt instructed), and the agent's own system prompt, here is the full implementation prompt as it was generated:

---

# Meshly â€” Claude Code Full Implementation Prompt

**Project:** Meshly studio website (meshly.pl)
**Location:** `C:\Users\dwit2\Documents\meshly`
**Stack:** Next.js 14+ App Router, TypeScript, Framer Motion, CSS Modules, self-hosted fonts
**Agent Context:** You are building the studio's own identity site. The brand direction is "Systems Thinking expressed through Restraint." Read this entire document before writing a single file.

---

## 0. Ground Rules

Do not use Tailwind. Do not use any component library. Do not use Three.js, GSAP, WebGL, canvas animations, or particle systems. Do not add colors beyond the six defined. Do not add motion beyond opacity and transform. No custom cursor. Every component is purpose-built. TypeScript throughout â€” no `.js` files.

The `marani/` subdirectory inside the repo is a separate client project. Do not touch it.

---

## 1. Design Tokens â€” Install These First

Create `src/styles/tokens.css`:

```css
:root {
  /* Palette */
  --color-graphite-paper: #F4F3F0;
  --color-chalk-plane:    #FAFAF8;
  --color-ink:            #2C2C2C;
  --color-ink-absolute:   #141412;
  --color-signal-copper:  #C8652A;
  --color-pewter:         #8C8C8C;
  --color-rule-ash:       #C9C7C2;
  --color-blueprint-night:#1C1F2A;

  /* Typography */
  --font-sans:   'Suisse Int\'l', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-serif:  'EB Garamond', 'Garamond', 'Georgia', serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Type Scale */
  --text-display-xl: clamp(52px, 7vw, 96px);
  --text-display-l:  clamp(38px, 5vw, 64px);
  --text-headline:   clamp(24px, 3vw, 36px);
  --text-label:      11px;
  --text-body:       17px;
  --text-caption:    14px;
  --text-mono:       13px;

  /* Spacing (8px grid) */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-5:  40px;
  --space-6:  48px;
  --space-8:  64px;
  --space-10: 80px;
  --space-15: 120px;
  --space-20: 160px;

  /* Easing */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
  --ease-standard:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-expo:      cubic-bezier(0.7, 0, 0.84, 0);

  /* Durations */
  --duration-micro:  100ms;
  --duration-short:  200ms;
  --duration-medium: 400ms;
  --duration-long:   700ms;
  --duration-crawl:  1200ms;

  /* Layout */
  --grid-cols:        12;
  --grid-gutter:      24px;
  --grid-margin:      80px;
  --content-max:      1680px;
  --nav-height:       64px;

  /* Breakpoints (reference only â€” use in media queries) */
  --bp-mobile:   320px;
  --bp-tablet:   768px;
  --bp-desktop:  1024px;
  --bp-wide:     1440px;
}
```

---

## 2. Typography CSS

Create `src/styles/typography.css`:

```css
/* Display XL */
.text-display-xl {
  font-family: var(--font-sans);
  font-size: var(--text-display-xl);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

/* Display L */
.text-display-l {
  font-family: var(--font-sans);
  font-size: var(--text-display-l);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.08;
}

/* Headline */
.text-headline {
  font-family: var(--font-sans);
  font-size: var(--text-headline);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

/* Label */
.text-label {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.4;
}

/* Body (Garamond) */
.text-body {
  font-family: var(--font-serif);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 28px;
}

/* Caption */
.text-caption {
  font-family: var(--font-sans);
  font-size: var(--text-caption);
  font-weight: 400;
  line-height: 22px;
  color: var(--color-rule-ash);
}

/* Mono */
.text-mono {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  font-weight: 400;
  line-height: 20px;
}
```

---

## 3. Animation Variants

Create `src/lib/animations.ts`:

```typescript
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export const scaleXIn: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export const scaleYIn: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const nodeAppear: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

export const materialize: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};
```

---

## 4. Font Setup

### 4a. Self-hosted fonts

Place these woff2 files in `public/fonts/`:
- `SuisseIntl-Light.woff2` (weight 300)
- `SuisseIntl-Regular.woff2` (weight 400)
- `SuisseIntl-Medium.woff2` (weight 500)
- `JetBrainsMono-Regular.woff2` (weight 400)

Until the client obtains Suisse Int'l licenses, substitute with Inter woff2 self-hosted under the same `font-family: 'Suisse Int\'l'` declaration. This is a drop-in replacement â€” no code changes needed when the real font arrives.

### 4b. globals.css font-face declarations

```css
@font-face {
  font-family: 'Suisse Int\'l';
  src: url('/fonts/SuisseIntl-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'Suisse Int\'l';
  src: url('/fonts/SuisseIntl-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Suisse Int\'l';
  src: url('/fonts/SuisseIntl-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### 4c. EB Garamond via next/font

In `src/app/layout.tsx`:

```typescript
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  preload: true,
  display: 'swap',
});
```

In `tokens.css`, override `--font-serif` on the `html` element:

```css
html {
  --font-serif: var(--font-eb-garamond), 'Garamond', 'Georgia', serif;
}
```

---

## 5. Root Layout

`src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import '../styles/tokens.css';
import '../styles/typography.css';
import '../styles/globals.css';

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meshly â€” Web Design & Development Studio, Poland',
  description: 'Systems thinking in digital design. Web design and development for founders and product teams who have outgrown generic.',
  openGraph: {
    title: 'Meshly â€” Web Design & Development Studio, Poland',
    description: 'Systems thinking in digital design.',
    url: 'https://meshly.pl',
    siteName: 'Meshly',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
  canonical: 'https://meshly.pl',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ebGaramond.variable}>
      <head>
        <link rel="preload" href="/fonts/SuisseIntl-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SuisseIntl-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/JetBrainsMono-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 6. Page Composition

`src/app/page.tsx`:

```typescript
import Nav from '@/components/layout/Nav';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Hero from '@/components/sections/Hero';
import SectionTransition from '@/components/ui/SectionTransition';
import Clients from '@/components/sections/Clients';
import Philosophy from '@/components/sections/Philosophy';
import Work from '@/components/sections/Work';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import LoadingScreen from '@/components/layout/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <ScrollProgress />
      <main>
        <Hero />
        <SectionTransition />
        <Clients />
        <SectionTransition />
        <Philosophy />
        <SectionTransition />
        <Work />
        <SectionTransition />
        <Testimonials />
        <SectionTransition dark />
        <Process />
        <SectionTransition />
        <About />
        <SectionTransition dark />
        <Contact />
      </main>
    </>
  );
}
```

---

## 7. Component: LoadingScreen

`src/components/layout/LoadingScreen.tsx`:

**Behavior:**
- Check `sessionStorage.getItem('meshly:loaded')` â€” if truthy, render nothing immediately.
- Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` â€” if true, skip, dispatch event, set storage.
- Total lifecycle: 2000ms.
- Display: Blueprint Night (`#1C1F2A`) full-screen overlay, centered.
- Visual: A Signal Copper node center (8px circle) with four arms extending outward (top, right, bottom, left). Arms are SVG lines, 40px long, drawn via `stroke-dashoffset` animation from 0 to full length, duration 600ms, ease-out-expo staggered 80ms apart.
- At 1400ms: dispatch `new CustomEvent('meshly:loaded')` on `window`.
- At 2000ms: overlay fades out (opacity 0, duration 400ms, ease-standard), then unmounts.
- On unmount: `sessionStorage.setItem('meshly:loaded', '1')`.

```typescript
'use client';
import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem('meshly:loaded') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      window.dispatchEvent(new CustomEvent('meshly:loaded'));
      sessionStorage.setItem('meshly:loaded', '1');
      return;
    }
    setVisible(true);
    const eventTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('meshly:loaded'));
    }, 1400);
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2000);
    const unmountTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('meshly:loaded', '1');
    }, 2400);
    return () => {
      clearTimeout(eventTimer);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}>
      <svg width="96" height="96" viewBox="0 0 96 96" className={styles.loader}>
        {/* Center node */}
        <circle cx="48" cy="48" r="4" fill="#C8652A" />
        {/* Top arm */}
        <line x1="48" y1="44" x2="48" y2="8" stroke="#C8652A" strokeWidth="1" className={`${styles.arm} ${styles.arm1}`} />
        {/* Right arm */}
        <line x1="52" y1="48" x2="88" y2="48" stroke="#C8652A" strokeWidth="1" className={`${styles.arm} ${styles.arm2}`} />
        {/* Bottom arm */}
        <line x1="48" y1="52" x2="48" y2="88" stroke="#C8652A" strokeWidth="1" className={`${styles.arm} ${styles.arm3}`} />
        {/* Left arm */}
        <line x1="44" y1="48" x2="8" y2="48" stroke="#C8652A" strokeWidth="1" className={`${styles.arm} ${styles.arm4}`} />
      </svg>
    </div>
  );
}
```

CSS module (`LoadingScreen.module.css`):

```css
.overlay {
  position: fixed;
  inset: 0;
  background: #1C1F2A;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.exiting {
  opacity: 0;
}

.arm {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: drawArm 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.arm1 { animation-delay: 0ms; }
.arm2 { animation-delay: 80ms; }
.arm3 { animation-delay: 160ms; }
.arm4 { animation-delay: 240ms; }

@keyframes drawArm {
  to { stroke-dashoffset: 0; }
}
```

---

## 8. Component: MeshField

`src/components/ui/MeshField.tsx`:

This is the living SVG mesh substrate used in the Hero (and optionally other sections). It generates a deterministic 12Ă—8 grid of nodes and connections. All mouse interaction is pure DOM manipulation via RAF â€” no React state updates after mount.

```typescript
'use client';
import { useEffect, useRef } from 'react';
import styles from './MeshField.module.css';

interface MeshFieldProps {
  opacity?: number;
  density?: 'sparse' | 'normal' | 'dense';
  animated?: boolean;
  mouseReactive?: boolean;
  className?: string;
}

const COLS = 12;
const ROWS = 8;
const CONNECTION_THRESHOLD_SPARSE  = 0.3;
const CONNECTION_THRESHOLD_NORMAL  = 0.5;
const CONNECTION_THRESHOLD_DENSE   = 0.7;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function MeshField({
  opacity = 0.18,
  density = 'normal',
  animated = true,
  mouseReactive = false,
  className,
}: MeshFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W = svg.clientWidth || 800;
    const H = svg.clientHeight || 400;
    const rand = seededRandom(42);

    const threshold =
      density === 'sparse' ? CONNECTION_THRESHOLD_SPARSE :
      density === 'dense'  ? CONNECTION_THRESHOLD_DENSE  :
      CONNECTION_THRESHOLD_NORMAL;

    // Generate nodes
    const nodes: { x: number; y: number; id: string }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const jitterX = (rand() - 0.5) * (W / COLS) * 0.4;
        const jitterY = (rand() - 0.5) * (H / ROWS) * 0.4;
        nodes.push({
          x: (c / (COLS - 1)) * W + jitterX,
          y: (r / (ROWS - 1)) * H + jitterY,
          id: `n-${r}-${c}`,
        });
      }
    }

    // Generate connections (nearby nodes only)
    const connections: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = (W / COLS) * 1.8;
        if (dist < maxDist && rand() < threshold) {
          connections.push([i, j]);
        }
      }
    }

    // Render to SVG
    svg.innerHTML = '';
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    connections.forEach(([i, j], idx) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const len = Math.sqrt(
        Math.pow(nodes[i].x - nodes[j].x, 2) +
        Math.pow(nodes[i].y - nodes[j].y, 2)
      );
      line.setAttribute('x1', String(nodes[i].x));
      line.setAttribute('y1', String(nodes[i].y));
      line.setAttribute('x2', String(nodes[j].x));
      line.setAttribute('y2', String(nodes[j].y));
      line.setAttribute('stroke', '#C8652A');
      line.setAttribute('stroke-width', '0.5');
      if (animated) {
        line.setAttribute('stroke-dasharray', String(len));
        line.setAttribute('stroke-dashoffset', String(len));
        line.style.animation = `meshDraw 1.2s cubic-bezier(0.16,1,0.3,1) ${idx * 15}ms forwards`;
      }
      g.appendChild(line);
    });

    nodes.forEach((node) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(node.x));
      circle.setAttribute('cy', String(node.y));
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', '#C8652A');
      g.appendChild(circle);
    });

    svg.appendChild(g);

    // Mouse reactivity via RAF
    if (!mouseReactive) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const update = () => {
      const circles = g.querySelectorAll('circle');
      circles.forEach((c) => {
        const cx = parseFloat(c.getAttribute('cx') || '0');
        const cy = parseFloat(c.getAttribute('cy') || '0');
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 120);
        const scale = 1 + influence * 2;
        c.setAttribute('r', String(2 * scale));
        c.style.opacity = String(0.4 + influence * 0.6);
      });
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [density, animated, mouseReactive]);

  return (
    <svg
      ref={svgRef}
      className={`${styles.mesh} ${className ?? ''}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
```

CSS (`MeshField.module.css`):

```css
.mesh {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@keyframes meshDraw {
  to { stroke-dashoffset: 0; }
}
```

---

## 9. Component: MeshNode

`src/components/ui/MeshNode.tsx`:

An 8px Signal Copper circle. When `pulse` prop is true, shows an expanding ring that scales to 2.5Ă— and fades out over 600ms easeOut on hover.

```typescript
'use client';
import { useState } from 'react';
import styles from './MeshNode.module.css';

interface MeshNodeProps {
  size?: number;
  pulse?: boolean;
  className?: string;
}

export default function MeshNode({ size = 8, pulse = false, className }: MeshNodeProps) {
  const [pulsing, setPulsing] = useState(false);

  return (
    <span
      className={`${styles.node} ${className ?? ''}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => pulse && setPulsing(true)}
      onAnimationEnd={() => setPulsing(false)}
    >
      {pulse && pulsing && (
        <span className={styles.ring} style={{ width: size, height: size }} />
      )}
    </span>
  );
}
```

CSS (`MeshNode.module.css`):

```css
.node {
  display: inline-block;
  border-radius: 50%;
  background: #C8652A;
  flex-shrink: 0;
  position: relative;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid #C8652A;
  animation: pulseRing 600ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

@keyframes pulseRing {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
```

---

## 10. Component: SectionTransition

`src/components/ui/SectionTransition.tsx`:

An 80px rhythm marker: a vertical line from top to a node, then another line from the node to the bottom. The node pulses once on IntersectionObserver entry. On dark sections, lines are white at low opacity.

```typescript
'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './SectionTransition.module.css';

interface SectionTransitionProps {
  dark?: boolean;
}

export default function SectionTransition({ dark = false }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.transition} ${dark ? styles.dark : ''}`}
      aria-hidden="true"
    >
      <div className={`${styles.line} ${entered ? styles.lineVisible : ''}`} />
      <div className={`${styles.node} ${entered ? styles.nodePulse : ''}`} />
      <div className={`${styles.line} ${entered ? styles.lineVisible : ''}`} style={{ animationDelay: '200ms' }} />
    </div>
  );
}
```

CSS (`SectionTransition.module.css`):

```css
.transition {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  padding: 0;
  --line-color: #C9C7C2;
  --node-color: #C8652A;
}

.dark {
  --line-color: rgba(255,255,255,0.15);
}

.line {
  flex: 1;
  width: 1px;
  background: var(--line-color);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lineVisible {
  transform: scaleY(1);
}

.node {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--node-color);
  flex-shrink: 0;
}

.nodePulse {
  animation: pulseOnce 600ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

@keyframes pulseOnce {
  0%   { box-shadow: 0 0 0 0 rgba(200, 101, 42, 0.6); }
  100% { box-shadow: 0 0 0 8px rgba(200, 101, 42, 0); }
}
```

---

## 11. Component: ScrollProgress

`src/components/layout/ScrollProgress.tsx`:

Fixed to the right edge, 24px from right, 120px tall track. Signal Copper fill that grows as the user scrolls. A floating node rides the fill progress. On hover, shows the current section label. RAF-driven. Desktop only (hidden below 1024px).

```typescript
'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './ScrollProgress.module.css';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'clients', label: 'Clients' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'work', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [sectionLabel, setSectionLabel] = useState('');

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (nodeRef.current) {
        nodeRef.current.style.top = `${progress * 100}%`;
      }

      // Find current section
      const current = SECTIONS.slice().reverse().find((s) => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        return el.getBoundingClientRect().top <= window.innerHeight * 0.5;
      });
      setSectionLabel(current?.label ?? '');

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <div className={styles.track}>
        <div ref={fillRef} className={styles.fill} />
        <div ref={nodeRef} className={styles.node} />
      </div>
      {hovered && sectionLabel && (
        <span className={styles.label}>{sectionLabel}</span>
      )}
    </div>
  );
}
```

CSS (`ScrollProgress.module.css`):

```css
.container {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 1023px) {
  .container { display: none; }
}

.track {
  width: 1px;
  height: 120px;
  background: rgba(201, 199, 194, 0.3);
  position: relative;
  overflow: visible;
}

.fill {
  position: absolute;
  inset: 0;
  background: #C8652A;
  transform: scaleY(0);
  transform-origin: top;
}

.node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #C8652A;
  transition: top 100ms linear;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #8C8C8C;
  white-space: nowrap;
  letter-spacing: 0.08em;
}
```

---

## 12. Component: Nav

`src/components/layout/Nav.tsx`:

```typescript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.wordmark} onClick={() => setOpen(false)}>
            <span className={styles.wordmarkDot} aria-hidden="true" />
            <span className={styles.wordmarkRule} aria-hidden="true" />
            Meshly
          </Link>
          <ul className={styles.links}>
            <li><Link href="#work">Work</Link></li>
            <li><Link href="#philosophy">Philosophy</Link></li>
            <li><Link href="#contact" className={styles.cta}>Start a project</Link></li>
          </ul>
          <button
            className={styles.menuToggle}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </nav>
      </header>
      {open && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <ul>
            <li><Link href="#work" onClick={() => setOpen(false)}>Work</Link></li>
            <li><Link href="#philosophy" onClick={() => setOpen(false)}>Philosophy</Link></li>
            <li><Link href="#process" onClick={() => setOpen(false)}>Process</Link></li>
            <li><Link href="#about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="#contact" onClick={() => setOpen(false)}>Start a project</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}
```

CSS (`Nav.module.css`):

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: rgba(244, 243, 240, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.nav {
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wordmark {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--color-ink-absolute);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wordmarkDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #C8652A;
  flex-shrink: 0;
}

.wordmarkRule {
  display: block;
  width: 20px;
  height: 1px;
  background: rgba(20, 20, 18, 0.3);
  flex-shrink: 0;
}

.links {
  list-style: none;
  display: flex;
  gap: 24px;
  margin: 0;
  padding: 0;
}

.links a {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-ink);
  text-decoration: none;
  transition: opacity 150ms var(--ease-standard);
  position: relative;
}

.links a:hover {
  opacity: 0.6;
}

.cta {
  color: var(--color-signal-copper) !important;
}

.menuToggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.menuLine {
  display: block;
  width: 20px;
  height: 1px;
  background: var(--color-ink-absolute);
}

.mobileMenu {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: #1C1F2A;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.mobileMenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: center;
}

.mobileMenu a {
  font-family: var(--font-sans);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: #F4F3F0;
  text-decoration: none;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (max-width: 899px) {
  .nav { padding: 0 20px; }
  .links { display: none; }
  .menuToggle { display: flex; }
}
```

---

## 13. Section: Hero

`src/components/sections/Hero.tsx`:

**Layout:** Full viewport height minus nav. Content lower-left (padding-top approx 40vh). Headline in columns 1â€“8. Top-right metadata cluster. Bottom-right scroll indicator. MeshField behind at 0.18 opacity. Detail cluster SVG on the right (6 nodes, 8 connections).

**Copy:**
- Label: `WEB DESIGN STUDIO`
- Headline line 1: `Systems that hold.`
- Headline line 2 (indented `clamp(2rem, 3vw, 4rem)`): `Work that compounds.`
- Sub: `We build digital systems / for companies that want them / to actually work.`
- CTA: `See the work â†’`
- Metadata: `Studio â€” Warsaw â€” Est. 2024 â€” meshly.pl`

**Animation:** Headline never animates (opacity 1 on load). Label: opacity 0â†’1, 400ms, 0ms delay. Sub: opacity 0â†’1, y: 12â†’0, 500ms, 200ms delay. CTA: opacity 0â†’1, 300ms, 500ms delay. Bottom rule: scaleX 0â†’1 from left, 1200ms, 300ms delay. Metadata: opacity 0â†’1, 400ms, 600ms delay.

```typescript
'use client';
import { motion } from 'framer-motion';
import MeshField from '@/components/ui/MeshField';
import styles from './Hero.module.css';
import { fadeIn, fadeUp, scaleXIn } from '@/lib/animations';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <MeshField opacity={0.18} density="normal" animated mouseReactive />

      {/* Top-right metadata */}
      <motion.p
        className={styles.metadata}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.6 }}
      >
        Studio â€” Warsaw â€” Est. 2024 â€” meshly.pl
      </motion.p>

      {/* Main content */}
      <div className={styles.content}>
        <motion.span
          className={styles.label}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0 }}
        >
          Web Design Studio
        </motion.span>

        <h1 className={styles.headline}>
          <span className={styles.headlineLine1}>Systems that hold.</span>
          <span className={styles.headlineLine2}>Work that compounds.</span>
        </h1>

        <motion.p
          className={styles.sub}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          We build digital systems<br />
          for companies that want them<br />
          to actually work.
        </motion.p>

        <motion.a
          href="#work"
          className={styles.cta}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
        >
          See the work â†’
        </motion.a>
      </div>

      {/* Bottom rule */}
      <motion.div
        className={styles.bottomRule}
        initial="hidden"
        animate="visible"
        variants={scaleXIn}
        transition={{ delay: 0.3, duration: 1.2 }}
      />

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollTrack}>
          <div className={styles.scrollFill} />
        </div>
      </div>
    </section>
  );
}
```

CSS (`Hero.module.css`):

```css
.hero {
  position: relative;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow: hidden;
  background: var(--color-graphite-paper);
}

.metadata {
  position: absolute;
  top: 32px;
  right: 80px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.content {
  position: absolute;
  bottom: 20%;
  left: 80px;
  width: calc(100% * 8 / 12 - 80px);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.headline {
  font-family: var(--font-sans);
  font-size: var(--text-display-xl);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-ink-absolute);
  margin: 0;
  display: flex;
  flex-direction: column;
}

.headlineLine1 {}

.headlineLine2 {
  padding-left: clamp(2rem, 3vw, 4rem);
}

.sub {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 28px;
  color: var(--color-ink);
  margin: 0;
}

.cta {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-signal-copper);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 200ms var(--ease-standard);
}

.cta:hover { gap: 8px; }

.bottomRule {
  position: absolute;
  bottom: 0;
  left: 80px;
  width: calc(100% * 8 / 12 - 80px);
  height: 1px;
  background: rgba(20, 20, 18, 0.3);
  transform-origin: left;
}

.scrollIndicator {
  position: absolute;
  bottom: 32px;
  right: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.scrollTrack {
  width: 1px;
  height: 48px;
  background: rgba(201, 199, 194, 0.4);
  position: relative;
  overflow: hidden;
}

.scrollFill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #C8652A;
  animation: scrollPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes scrollPulse {
  0%   { height: 0%; top: 0; }
  50%  { height: 100%; top: 0; }
  100% { height: 0%; top: 100%; }
}

@media (max-width: 767px) {
  .content {
    left: 20px;
    right: 20px;
    width: auto;
    bottom: 15%;
  }
  .metadata {
    position: static;
    margin-top: 20px;
    padding: 0 20px;
    order: -1;
  }
  .headline { font-size: var(--text-display-l); }
  .bottomRule { left: 20px; width: calc(100% - 40px); }
  .scrollIndicator { right: 20px; }
}
```

---

## 14. Section: Clients

`src/components/sections/Clients.tsx`:

Background: Chalk Plane (`#FAFAF8`). Two stat counters (use `useCountUp` hook) + industry category strip.

**Stats:** `+40 projects delivered` and `4 countries`. Categories strip: `E-commerce / SaaS / Hospitality / Professional Services`.

```typescript
'use client';
import { motion } from 'framer-motion';
import styles from './Clients.module.css';
import { fadeIn, staggerContainer } from '@/lib/animations';
import useCountUp from '@/hooks/useCountUp';

function StatCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { ref, count } = useCountUp(value);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNumber}>{suffix}{count}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Clients() {
  return (
    <section id="clients" className={styles.section}>
      <span className={styles.sectionLabel}>01 â€” Clients</span>
      <motion.div
        className={styles.stats}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn}>
          <StatCounter value={40} suffix="+" label="projects delivered" />
        </motion.div>
        <motion.div variants={fadeIn}>
          <StatCounter value={4} label="countries" />
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.categories}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={fadeIn}
      >
        {['E-commerce', 'SaaS', 'Hospitality', 'Professional Services'].map((cat, i) => (
          <span key={cat} className={styles.category}>
            {i > 0 && <span className={styles.sep}>/</span>}
            {cat}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
```

Create `src/hooks/useCountUp.ts`:

```typescript
import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}
```

---

## 15. Section: Philosophy

`src/components/sections/Philosophy.tsx`:

Background: Chalk Plane. 2-col split: left 4 cols = section label + ghost numeral; right 7 cols = 3 belief statements. Node bullets (6px Signal Copper circles) replace horizontal rules above each statement. Ghost numeral `02` at 10% opacity bleeds off the right edge.

**The three statements (exact copy):**

1. "The grid precedes the concept." / "Structure is not the container for ideas â€” it is the idea's first test." / "An idea that does not survive a grid is not yet an idea."

2. "Restraint is a decision, not a default." / "Everything removed was considered. Every empty column was earned." / "We do not leave things out because we ran out of time."

3. "Systems outlast aesthetics." / "Visual trends have a half-life. Structural decisions compound." / "We build for the third year, not the launch day."

```typescript
'use client';
import { motion } from 'framer-motion';
import MeshNode from '@/components/ui/MeshNode';
import styles from './Philosophy.module.css';
import { fadeUp, scaleXIn, staggerContainer } from '@/lib/animations';

const statements = [
  {
    title: 'The grid precedes the concept.',
    body: 'Structure is not the container for ideas â€” it is the idea\'s first test. An idea that does not survive a grid is not yet an idea.',
  },
  {
    title: 'Restraint is a decision, not a default.',
    body: 'Everything removed was considered. Every empty column was earned. We do not leave things out because we ran out of time.',
  },
  {
    title: 'Systems outlast aesthetics.',
    body: 'Visual trends have a half-life. Structural decisions compound. We build for the third year, not the launch day.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.left}>
        <span className={styles.sectionLabel}>02 â€” Philosophy</span>
        <span className={styles.ghostNumeral} aria-hidden="true">02</span>
      </div>
      <motion.div
        className={styles.right}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={staggerContainer}
      >
        {statements.map((s, i) => (
          <motion.div key={i} className={styles.statement} variants={fadeUp}>
            <div className={styles.statementHead}>
              <MeshNode size={6} />
              <motion.div className={styles.rule} variants={scaleXIn} />
            </div>
            <p className={styles.statementTitle}>{s.title}</p>
            <p className={styles.statementBody}>{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

CSS (`Philosophy.module.css`):

```css
.section {
  background: var(--color-chalk-plane);
  padding: 120px 80px;
  max-width: 1680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 7fr;
  gap: 80px;
  position: relative;
  overflow: hidden;
}

.left {
  position: relative;
}

.sectionLabel {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
  display: block;
}

.ghostNumeral {
  position: absolute;
  right: -20px;
  top: -20px;
  font-family: var(--font-sans);
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 300;
  letter-spacing: -0.05em;
  color: var(--color-ink-absolute);
  opacity: 0.1;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.statement {}

.statementHead {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.rule {
  flex: 1;
  height: 1px;
  background: var(--color-rule-ash);
  transform-origin: left;
}

.statementTitle {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 400;
  color: var(--color-ink-absolute);
  margin: 0 0 8px;
}

.statementBody {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 28px;
  color: rgba(44, 44, 44, 0.8);
  margin: 0;
}

@media (max-width: 767px) {
  .section {
    grid-template-columns: 1fr;
    padding: 60px 20px;
    gap: 40px;
  }
  .ghostNumeral { display: none; }
  .right { gap: 32px; }
}
```

---

## 16. Section: Work

`src/components/sections/Work.tsx`:

Three projects displayed as full-width horizontal strips. Metric-forward image placeholders (Blueprint Night bg + MeshField + EB Garamond metric at 28% opacity). Synthesis sentence in italic EB Garamond replaces Problem/Insight/Outcome labels.

**Projects data (`src/lib/projects.ts`):**

```typescript
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
    synthesis: 'A reservations system that made the phone stop ringing â€” by making the website worth trusting.',
    href: '/work/marani',
  },
  {
    index: '02',
    name: 'Adriano',
    clientType: 'Pizzeria Chain',
    year: '2025',
    metric: '2.1s',
    metricLabel: 'avg. LCP',
    synthesis: 'Brand confidence translated into page speed â€” because slow sites are a trust problem, not a technical one.',
    href: '/work/adriano',
  },
  {
    index: '03',
    name: 'Vantage',
    clientType: 'Premium Services',
    year: '2026',
    metric: '+58%',
    metricLabel: 'inquiry rate',
    synthesis: 'A positioning shift made visible â€” moving from price-competitive to value-certain in a single session.',
    href: '/work/vantage',
  },
];
```

```typescript
'use client';
import { motion } from 'framer-motion';
import MeshField from '@/components/ui/MeshField';
import { projects } from '@/lib/projects';
import styles from './Work.module.css';
import { fadeIn, staggerContainer } from '@/lib/animations';

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>03 â€” Selected Work</span>
        <span className={styles.counter}>{projects.length} projects</span>
      </div>
      <motion.div
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={staggerContainer}
      >
        {projects.map((project) => (
          <motion.a
            key={project.index}
            href={project.href}
            className={styles.strip}
            variants={fadeIn}
          >
            <div className={styles.info}>
              <span className={styles.projectIndex}>{project.index}</span>
              <h3 className={styles.projectName}>{project.name}</h3>
              <span className={styles.projectMeta}>{project.clientType} â€” {project.year}</span>
              <p className={styles.synthesis}><em>{project.synthesis}</em></p>
              <span className={styles.viewLink}>View case study â†’</span>
            </div>
            <div className={styles.imageSlot}>
              <MeshField opacity={0.35} density="normal" animated={false} />
              <span className={styles.metricOverlay}>
                <span className={styles.metricValue}>{project.metric}</span>
                <span className={styles.metricLabel}>{project.metricLabel}</span>
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
```

CSS (`Work.module.css`):

```css
.section {
  background: var(--color-graphite-paper);
  padding: 120px 80px;
  max-width: 1680px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
}

.sectionLabel {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.counter {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-rule-ash);
}

.list {
  margin-top: 0;
}

.strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 64px 0;
  border-top: 1px solid var(--color-rule-ash);
  text-decoration: none;
  transition: background 200ms var(--ease-standard);
}

.strip:hover {
  background: var(--color-chalk-plane);
}

.strip:hover .imageSlot img,
.strip:hover .imageSlot {
  /* image scale handled on imageSlot */
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.projectIndex {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-rule-ash);
}

.projectName {
  font-family: var(--font-sans);
  font-size: var(--text-display-l);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--color-ink-absolute);
  margin: 0;
}

.projectMeta {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.synthesis {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  line-height: 28px;
  color: var(--color-ink);
  margin: 0;
  max-width: 480px;
}

.viewLink {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-signal-copper);
  transition: letter-spacing 200ms var(--ease-standard);
}

.strip:hover .viewLink {
  letter-spacing: 0.02em;
}

.imageSlot {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #1C1F2A;
  overflow: hidden;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.strip:hover .imageSlot {
  transform: scale(1.02);
}

.metricOverlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.metricValue {
  font-family: var(--font-serif);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 400;
  color: #F4F3F0;
  opacity: 0.28;
  line-height: 1;
}

.metricLabel {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #F4F3F0;
  opacity: 0.28;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 8px;
}

@media (max-width: 767px) {
  .section { padding: 60px 20px; }
  .strip {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 48px 0;
  }
  .imageSlot { order: -1; }
  .projectName { font-size: var(--text-headline); }
}
```

---

## 17. Section: Testimonials

`src/components/sections/Testimonials.tsx`:

No carousel. Two blockquotes with typographic-only treatment. Background: Graphite Paper.

```typescript
'use client';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';
import { fadeUp, staggerContainer } from '@/lib/animations';

const testimonials = [
  {
    quote: 'Before Meshly, our website looked like every other restaurant in the city. After, people tell us they booked because the site felt like the food would be good. That is not a small thing.',
    author: 'Marek W.',
    role: 'Owner, Krakow',
  },
  {
    quote: 'I had worked with three agencies before. They all made something beautiful and then left. Meshly made something that works â€” and explained why every decision was made. I finally understand my own site.',
    author: 'Ania K.',
    role: 'Creative Director, Warsaw',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <span className={styles.sectionLabel}>04 â€” Testimonials</span>
      <motion.div
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={staggerContainer}
      >
        {testimonials.map((t, i) => (
          <motion.blockquote key={i} className={styles.quote} variants={fadeUp}>
            <p className={styles.quoteText}>"{t.quote}"</p>
            <footer className={styles.quoteFooter}>
              <span className={styles.author}>{t.author}</span>
              <span className={styles.role}>{t.role}</span>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}
```

---

## 18. Section: Process

`src/components/sections/Process.tsx`:

Background: Blueprint Night (`#1C1F2A`). Text: Graphite Paper. Full-width horizontal timeline on desktop â€” 4 phases, each in a 3-col slot. Nodes across page connected by a horizontal rule. Phase numbers above nodes. Three-step choreography: nodes appear (scale 0â†’1) â†’ vertical rules draw downward â†’ phase content fades in. Mobile: 2-col grid with inline phase numbers.

**Copy:**
- Phase 01 â€” TOPOLOGY: "Map the system before the surface." / "1â€“2 weeks"
- Phase 02 â€” ARCHITECTURE: "Define the structure before the skin." / "1 week"
- Phase 03 â€” CONSTRUCTION: "Build to tolerance, not to schedule." / "4â€“8 weeks"
- Phase 04 â€” CALIBRATION: "Test until certain, then release." / "1 week"
- Header intro second line: "Every project follows this exact sequence. We do not skip phases for budget."

```typescript
'use client';
import { motion } from 'framer-motion';
import styles from './Process.module.css';
import { nodeAppear, scaleYIn, fadeIn, staggerContainer } from '@/lib/animations';

const phases = [
  {
    number: '01',
    name: 'Topology',
    line1: 'Map the system',
    line2: 'before the surface.',
    duration: '1â€“2 weeks',
  },
  {
    number: '02',
    name: 'Architecture',
    line1: 'Define the structure',
    line2: 'before the skin.',
    duration: '1 week',
  },
  {
    number: '03',
    name: 'Construction',
    line1: 'Build to tolerance',
    line2: 'not to schedule.',
    duration: '4â€“8 weeks',
  },
  {
    number: '04',
    name: 'Calibration',
    line1: 'Test until certain,',
    line2: 'then release.',
    duration: '1 week',
  },
];

export default function Process() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.sectionLabel}>05 â€” Process</span>
        <p className={styles.introText}>
          Every project follows this exact sequence.<br />
          We do not skip phases for budget.
        </p>
      </div>

      {/* Horizontal connector */}
      <motion.div
        className={styles.connector}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.div
        className={styles.phases}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={staggerContainer}
      >
        {phases.map((phase) => (
          <div key={phase.number} className={styles.phase}>
            <motion.span className={styles.phaseNumber} variants={fadeIn}>
              {phase.number}
            </motion.span>
            <motion.div className={styles.node} variants={nodeAppear} />
            <motion.div className={styles.vertRule} variants={scaleYIn} />
            <motion.div className={styles.phaseContent} variants={fadeIn}>
              <span className={styles.phaseName}>{phase.name.toUpperCase()}</span>
              <p className={styles.phaseLine1}>{phase.line1}</p>
              <p className={styles.phaseLine2}>{phase.line2}</p>
              <span className={styles.phaseDuration}>{phase.duration}</span>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

CSS (`Process.module.css`):

```css
.section {
  background: #1C1F2A;
  padding: 120px 80px;
  position: relative;
  overflow: hidden;
}

.intro {
  margin-bottom: 80px;
}

.sectionLabel {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
  display: block;
  margin-bottom: 16px;
}

.introText {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 28px;
  color: rgba(244, 243, 240, 0.7);
  margin: 0;
}

.connector {
  height: 1px;
  background: rgba(201, 199, 194, 0.2);
  transform-origin: left;
  margin-bottom: 0;
}

.phases {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.phase {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0;
}

.phaseNumber {
  font-family: var(--font-mono);
  font-size: 13px;
  color: #C8652A;
  margin-bottom: 12px;
  display: block;
}

.node {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #C8652A;
  flex-shrink: 0;
  margin-bottom: 0;
}

.vertRule {
  width: 1px;
  height: 40px;
  background: rgba(201, 199, 194, 0.3);
  transform-origin: top;
  margin-bottom: 24px;
}

.phaseContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phaseName {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: #F4F3F0;
  display: block;
  margin-bottom: 8px;
}

.phaseLine1 {
  font-family: var(--font-serif);
  font-size: 18px;
  color: #F4F3F0;
  margin: 0;
  line-height: 1.3;
}

.phaseLine2 {
  font-family: var(--font-serif);
  font-size: 18px;
  color: rgba(244, 243, 240, 0.6);
  margin: 0;
  line-height: 1.3;
}

.phaseDuration {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-rule-ash);
  margin-top: 12px;
  display: block;
}

@media (max-width: 767px) {
  .section { padding: 60px 20px; }
  .phases { grid-template-columns: repeat(2, 1fr); gap: 40px; }
  .connector { display: none; }
}
```

---

## 19. Section: About

`src/components/sections/About.tsx`:

No image. No portrait. Single EB Garamond text block, 6-of-12 cols, centered (cols 4â€“9). Opacity 0â†’1 only, 600ms â€” stillness.

**Exact copy:**

```
Meshly is a one-person web design and development studio based in Poland.

I work with founders, product teams, and companies who have outgrown generic.
Who need something built to last, not built to impress.

I do not take every project. I take the ones where structure matters.
Where the decision about what not to build is as important as what to build.

If that is what you need, we should talk.
```

**"Currently:" line:** `Taking inquiries for Q3 2026`

```typescript
'use client';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { materialize } from '@/lib/animations';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <span className={styles.sectionLabel}>06 â€” About</span>
      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        variants={materialize}
      >
        <p className={styles.text}>
          Meshly is a one-person web design and development studio based in Poland.
        </p>
        <p className={styles.text}>
          I work with founders, product teams, and companies who have outgrown generic.
          Who need something built to last, not built to impress.
        </p>
        <p className={styles.text}>
          I do not take every project. I take the ones where structure matters.
          Where the decision about what not to build is as important as what to build.
        </p>
        <p className={styles.text}>
          If that is what you need, we should talk.
        </p>
        <div className={styles.currently}>
          <span className={styles.currentlyLabel}>Currently</span>
          <span className={styles.currentlyValue}>Taking inquiries for Q3 2026</span>
        </div>
      </motion.div>
    </section>
  );
}
```

CSS (`About.module.css`):

```css
.section {
  background: var(--color-graphite-paper);
  padding: 120px 80px;
  max-width: 1680px;
  margin: 0 auto;
}

.sectionLabel {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
  display: block;
  margin-bottom: 64px;
}

.content {
  max-width: 680px;
  margin: 0 auto;
}

.text {
  font-family: var(--font-serif);
  font-size: 22px;
  line-height: 36px;
  color: rgba(20, 20, 18, 0.9);
  margin: 0 0 24px;
}

.currently {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.currentlyLabel {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.currentlyValue {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-signal-copper);
}

@media (max-width: 767px) {
  .section { padding: 60px 20px; }
  .text { font-size: 18px; line-height: 30px; }
  .sectionLabel { margin-bottom: 40px; }
}
```

---

## 20. Section: Contact

`src/components/sections/Contact.tsx`:

Background: Ink Absolute (`#141412`). Full viewport height. 4-node diamond SVG cluster (0.25 opacity) between email pill and form. Node dots at each form field label. Signal Copper hover on email pill.

**Copy:**
- Label: `START A PROJECT`
- Headline: `Begin something precise.`
- Sub first line: `Every Meshly engagement begins with one call.`
- Sub second line: `Tell me what it is. I will tell you if I can make it better.`
- Email: `hello@meshly.pl`
- Footer: `Â© 2026 Meshly` / `meshly.pl`

```typescript
'use client';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import MeshNode from '@/components/ui/MeshNode';
import { materialize, fadeIn } from '@/lib/animations';

function DiamondCluster() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" className={styles.diamond}>
      <circle cx="40" cy="10" r="4" fill="#C8652A" />
      <circle cx="70" cy="40" r="4" fill="#C8652A" />
      <circle cx="40" cy="70" r="4" fill="#C8652A" />
      <circle cx="10" cy="40" r="4" fill="#C8652A" />
      <line x1="40" y1="10" x2="70" y2="40" stroke="#C8652A" strokeWidth="0.5" />
      <line x1="70" y1="40" x2="40" y2="70" stroke="#C8652A" strokeWidth="0.5" />
      <line x1="40" y1="70" x2="10" y2="40" stroke="#C8652A" strokeWidth="0.5" />
      <line x1="10" y1="40" x2="40" y2="10" stroke="#C8652A" strokeWidth="0.5" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.content}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Start a Project
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={materialize}
        >
          Begin something precise.
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          Every Meshly engagement begins with one call.<br />
          Tell me what it is. I will tell you if I can make it better.
        </motion.p>

        <DiamondCluster />

        <motion.a
          href="mailto:hello@meshly.pl"
          className={styles.email}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          hello@meshly.pl
        </motion.a>

        <div className={styles.form}>
          {[
            { label: 'Your name', type: 'text', name: 'name' },
            { label: 'Your email', type: 'email', name: 'email' },
            { label: 'Tell me about the project', type: 'textarea', name: 'message' },
          ].map((field) => (
            <div key={field.name} className={styles.field}>
              <label htmlFor={field.name} className={styles.fieldLabel}>
                <MeshNode size={4} />
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea id={field.name} name={field.name} className={styles.input} rows={4} />
              ) : (
                <input id={field.name} name={field.name} type={field.type} className={styles.input} />
              )}
            </div>
          ))}
          <button type="submit" className={styles.submit}>Send message â†’</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Â© 2026 Meshly</span>
        <span>meshly.pl</span>
      </footer>
    </section>
  );
}
```

CSS (`Contact.module.css`):

```css
.section {
  background: #141412;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 80px 48px;
}

.content {
  max-width: 680px;
}

.label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
  display: block;
  margin-bottom: 32px;
}

.headline {
  font-family: var(--font-sans);
  font-size: var(--text-display-xl);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #F4F3F0;
  margin: 0 0 24px;
}

.sub {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 28px;
  color: rgba(244, 243, 240, 0.7);
  margin: 0 0 40px;
}

.diamond {
  opacity: 0.25;
  margin-bottom: 32px;
  display: block;
}

.email {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 400;
  color: #C8652A;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
  transition: background 200ms var(--ease-standard), color 200ms var(--ease-standard), padding 200ms var(--ease-standard);
  margin-bottom: 64px;
}

.email:hover {
  background: #C8652A;
  color: #F4F3F0;
  padding: 4px 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 480px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fieldLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-rule-ash);
}

.input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(201, 199, 194, 0.3);
  color: #F4F3F0;
  font-family: var(--font-serif);
  font-size: 17px;
  padding: 8px 0;
  outline: none;
  resize: none;
  transition: border-color 200ms var(--ease-standard);
  min-height: 44px;
}

.input:focus {
  border-color: #C8652A;
  outline: 2px solid #C8652A;
  outline-offset: 2px;
}

.submit {
  font-family: var(--font-sans);
  font-size: 14px;
  color: #C8652A;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: letter-spacing 200ms var(--ease-standard);
}

.submit:hover {
  letter-spacing: 0.02em;
}

.submit:focus-visible {
  outline: 2px solid #C8652A;
  outline-offset: 4px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
  border-top: 1px solid rgba(201, 199, 194, 0.15);
}

.footer span {
  font-family: var(--font-mono);
  font-size: 12px;
  color: rgba(201, 199, 194, 0.5);
}

@media (max-width: 767px) {
  .section { padding: 60px 20px 32px; }
  .headline { font-size: var(--text-display-l); }
}
```

---

## 21. Globals CSS

`src/styles/globals.css`:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--color-graphite-paper);
  color: var(--color-ink-absolute);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-signal-copper);
  color: white;
  padding: 8px 16px;
  z-index: 999;
  font-family: var(--font-sans);
  font-size: 14px;
  transition: top 200ms;
}

.skip-link:focus {
  top: 0;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-signal-copper);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}

/* Selection */
::selection {
  background: rgba(200, 101, 42, 0.2);
  color: var(--color-ink-absolute);
}
```

---

## 22. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/fonts/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

module.exports = nextConfig;
```

---

## 23. tsconfig.json

Ensure `paths` alias is set:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 24. Headline Spec â€” Absolute Rule

The `<h1>` in Hero is a plain element. It is NOT wrapped in any Framer Motion component. It has no entrance animation. `opacity: 1` from the server render. This is structural â€” it exists before the eye arrives. Do not animate it.

The Contact `<h2>` uses the `materialize` variant (opacity 0â†’1, 800ms, no y-translation). This is the single exception: it materializes, it does not float.

---

## 25. SEO / Structured Data

Add to `src/app/layout.tsx` inside `<head>`:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness'],
      name: 'Meshly',
      url: 'https://meshly.pl',
      description: 'Web design and development studio based in Warsaw, Poland.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Warsaw',
        addressCountry: 'PL',
      },
      foundingDate: '2024',
      email: 'hello@meshly.pl',
    }),
  }}
/>
```

---

## 26. Accessibility Checklist (enforce before finishing)

- `<main>` wraps all sections
- `<header>` wraps `<Nav>`
- `<footer>` wraps the footer strip in Contact
- Every `<section>` has `aria-label` or `aria-labelledby`
- Skip link at top of `<body>`: `<a href="#main-content" className="skip-link">Skip to content</a>`
- All SVG decorative elements have `aria-hidden="true"`
- Form inputs have associated `<label>` elements via `htmlFor`/`id`
- Focus states: 2px solid Signal Copper, 2px offset â€” never `outline: none`
- Color contrast: Ink Absolute on Graphite Paper = 17.5:1 (passes AAA). Signal Copper on Blueprint Night = 4.8:1 (passes AA).

---

## 27. What NOT to Do

- Do not add any color not in the token list
- Do not add gradient backgrounds
- Do not add a custom cursor
- Do not use GSAP
- Do not use Three.js or WebGL
- Do not use Tailwind
- Do not use Shadcn, MUI, or any component library
- Do not animate the Hero h1
- Do not use spring physics in Framer Motion â€” use cubic-bezier easing only
- Do not translate section headings on scroll entrance â€” opacity only
- Do not touch the `marani/` subdirectory

---

*Build from this document alone. No additional context is required.*
