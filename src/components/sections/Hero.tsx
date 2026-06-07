'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import MeshField from '@/components/ui/MeshField';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { projects } from '@/lib/projects';
import styles from './Hero.module.css';

const HEADLINE_LINES = ['Most are', 'losing you', 'customers,', 'quietly.'];

const headlineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const lineVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

const bloomVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.15, 0],
    transition: { duration: 1.4, times: [0, 0.3, 1], ease: 'easeInOut' },
  },
};

// The proof-metric — sourced from the Vantage project so the hero stays in
// sync with the Work section's data. Falls back gracefully (rather than
// crashing the hero) if that entry is ever renamed or removed.
const vantage = projects.find(p => p.name === 'Vantage') ?? projects[0];
if (process.env.NODE_ENV !== 'production' && !projects.some(p => p.name === 'Vantage')) {
  console.warn('[Hero] "Vantage" project not found in projects.ts — falling back to projects[0].');
}

const METRIC_DELAY_MS = 2350; // T+2.35s — after the deliberate pause
const LABEL_TYPE_MS = 600;    // total duration of the character-by-character reveal

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [metricPhase, setMetricPhase] = useState(false);
  const [labelText, setLabelText] = useState('');
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    window.addEventListener('meshly:loaded', onLoaded);
    if (sessionStorage.getItem('meshly-loaded')) setLoaded(true);
    return () => window.removeEventListener('meshly:loaded', onLoaded);
  }, []);

  // The metric arrives on a fixed timer, not on scroll — its impact depends
  // on timing, not visibility.
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setMetricPhase(true), METRIC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [loaded]);

  // Character-by-character label reveal, in the spirit of the nav's
  // "Listening…" typing mechanism.
  useEffect(() => {
    if (!metricPhase) return;
    const full = vantage.metricLabel.toUpperCase();
    let i = 0;
    const step = Math.max(LABEL_TYPE_MS / full.length, 30);
    const interval = setInterval(() => {
      i += 1;
      setLabelText(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, step);
    return () => clearInterval(interval);
  }, [metricPhase]);

  // Cursor parallax — desktop with a real pointer only. No scroll-linked
  // substitute on touch; stillness is the correct mobile texture.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (hover: hover)');
    const update = () => setParallaxEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Each headline line drifts a little further than the last — 1.5–6px range.
  const x0 = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);
  const x1 = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const x2 = useTransform(springX, [-0.5, 0.5], [-4.5, 4.5]);
  const x3 = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const y0 = useTransform(springY, [-0.5, 0.5], [-1.5, 1.5]);
  const y1 = useTransform(springY, [-0.5, 0.5], [-3, 3]);
  const y2 = useTransform(springY, [-0.5, 0.5], [-4.5, 4.5]);
  const y3 = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const lineX = [x0, x1, x2, x3];
  const lineY = [y0, y1, y2, y3];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!parallaxEnabled || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.hero}
      aria-label="Studio — Meshly"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      <MeshField
        opacity={0.05}
        density="sparse"
        mouseReactive
        id="hero-mesh"
        className={styles.meshBackground}
      />

      <div className={styles.arrival}>
        {/* Markup always renders — the headline, subheadline, CTAs, and the
            metric's final statement must exist in the server-rendered HTML
            for crawlers and assistive tech. Only the entrance choreography
            is gated on `loaded`, so it begins once the loader clears. */}
        <div className={styles.textBlock}>
          <motion.h1
            className={styles.headline}
            variants={headlineContainer}
            initial="hidden"
            animate={loaded ? 'visible' : 'hidden'}
          >
            {HEADLINE_LINES.map((line, i) => (
              <motion.span key={line} className={styles.lineWrap} variants={lineVariants}>
                <motion.span
                  className={styles.headlineLine}
                  style={parallaxEnabled ? { x: lineX[i], y: lineY[i] } : undefined}
                >
                  {line === 'quietly.'
                    ? <span className={styles.accent}>{line}</span>
                    : line}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE_OUT_EXPO }}
          >
            The studio behind the numbers below.
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.35, ease: EASE_OUT_EXPO }}
          >
            <a href="#contact" className={styles.ctaPrimary} onClick={handleScroll('#contact')}>
              <span>Start a project</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </a>
            <a href="#work" className={styles.ctaSecondary} onClick={handleScroll('#work')}>
              See the work
            </a>
          </motion.div>
        </div>

        <div className={styles.metricZone}>
          {/* The typed reveal is a visual flourish — screen readers get the
              final statement as one clean, properly-announced string instead
              of a rapid stream of in-progress fragments. */}
          <span className="visually-hidden" aria-live="polite">
            {metricPhase
              ? `${vantage.metric} ${vantage.metricLabel} — ${vantage.name}`
              : ''}
          </span>
          <motion.div
            className={styles.bloom}
            aria-hidden="true"
            initial="hidden"
            animate={metricPhase ? 'visible' : 'hidden'}
            variants={bloomVariants}
          />
          <motion.span
            className={styles.metricValue}
            aria-hidden="true"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={metricPhase ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            {vantage.metric}
          </motion.span>
          <motion.span
            className={styles.metricLabel}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={metricPhase ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {labelText}
            <span className={styles.metricCaret} aria-hidden="true" />
          </motion.span>
          <motion.span
            className={styles.metricAttribution}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={metricPhase ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.4, delay: 0.75 }}
          >
            — {vantage.name}
          </motion.span>
        </div>
      </div>

    </section>
  );
}
