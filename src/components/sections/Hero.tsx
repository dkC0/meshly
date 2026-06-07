'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrowserMockup, { type ProjectId } from '@/components/ui/BrowserMockup';
import MeshField from '@/components/ui/MeshField';
import styles from './Hero.module.css';

const CYCLE_MS = 5000;

const INDUSTRIES: { id: ProjectId; label: string }[] = [
  { id: 'restaurant',    label: 'Restaurant'     },
  { id: 'lawfirm',       label: 'Law Firm'        },
  { id: 'barbershop',    label: 'Barbershop'      },
  { id: 'hotel',         label: 'Hotel'           },
  { id: 'construction',  label: 'Construction'    },
  { id: 'localbusiness', label: 'Local Business'  },
];

export default function Hero() {
  const [loaded,      setLoaded]      = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused,      setPaused]      = useState(false);

  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    window.addEventListener('meshly:loaded', onLoaded);
    if (sessionStorage.getItem('meshly-loaded')) setLoaded(true);
    return () => window.removeEventListener('meshly:loaded', onLoaded);
  }, []);

  // Auto-cycle through industries
  useEffect(() => {
    if (!loaded || paused) return;
    const id = setInterval(() => {
      setActiveIndex(i => (i + 1) % INDUSTRIES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [loaded, paused]);

  const handleSelect = useCallback((i: number) => {
    setActiveIndex(i);
    setPaused(true);
    // Resume auto-cycle after 12s of inactivity
    const t = setTimeout(() => setPaused(false), 12000);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Studio — Meshly">
      {/* Interactive mesh background */}
      <MeshField
        opacity={0.07}
        density="sparse"
        mouseReactive
        id="hero-mesh"
        className={styles.mesh}
        activeColor="rgba(248,250,252,0.6)"
      />

      {/* Headline */}
      <div className={styles.headlineWrapper}>
        {loaded && (
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Your website should be<br />working right now.
          </motion.h1>
        )}
      </div>

      {/* Auto-cycling showcase */}
      <motion.div
        className={styles.showcaseWrapper}
        initial={{ opacity: 0, y: 28 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserMockup
              project={INDUSTRIES[activeIndex].id}
              className={styles.mockup}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Industry selector + progress bar */}
      {loaded && (
        <motion.div
          className={styles.selector}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className={styles.tabs} role="tablist" aria-label="Browse by industry">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                role="tab"
                aria-selected={i === activeIndex}
                className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ''}`}
                onClick={() => handleSelect(i)}
              >
                {ind.label}
              </button>
            ))}
          </div>
          {/* Progress bar — resets on each tab change */}
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              key={`${activeIndex}-${paused}`}
              className={`${styles.progressFill} ${paused ? styles.progressPaused : ''}`}
            />
          </div>
        </motion.div>
      )}

      {/* Footer row */}
      {loaded && (
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <p className={styles.descriptor}>
            Web design &amp; development studio. Warsaw, Poland.
          </p>
          <div className={styles.ctas}>
            <a href="#work"    className={styles.ctaSecondary} onClick={handleScroll('#work')}>
              See the work ↓
            </a>
            <span className={styles.ctaDivider} aria-hidden="true">·</span>
            <a href="#contact" className={styles.ctaPrimary}   onClick={handleScroll('#contact')}>
              Start a project →
            </a>
          </div>
        </motion.div>
      )}
    </section>
  );
}
