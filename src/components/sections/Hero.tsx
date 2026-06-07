'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MeshField from '@/components/ui/MeshField';
import styles from './Hero.module.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    window.addEventListener('meshly:loaded', onLoaded);
    if (sessionStorage.getItem('meshly-loaded')) setLoaded(true);
    return () => window.removeEventListener('meshly:loaded', onLoaded);
  }, []);

  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Studio — Meshly">

      {/* Ambient glow — copper bottom-left + blue top-right, same as Capabilities */}
      <div className={styles.glowCopper} aria-hidden="true" />
      <div className={styles.glowBlue}   aria-hidden="true" />

      {/* Interactive mesh — responds to cursor */}
      <MeshField
        opacity={0.07}
        density="sparse"
        mouseReactive
        id="hero-mesh"
        className={styles.mesh}
        activeColor="rgba(248,250,252,0.6)"
      />

      {/* Content */}
      <div className={styles.content}>
        {loaded && (
          <>
            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              Your website should be<br />working right now.
            </motion.h1>

            <motion.p
              className={styles.descriptor}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Web design &amp; development studio. Warsaw, Poland.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="#work"    className={styles.ctaSecondary} onClick={handleScroll('#work')}>
                See the work ↓
              </a>
              <span className={styles.ctaDivider} aria-hidden="true">·</span>
              <a href="#contact" className={styles.ctaPrimary}   onClick={handleScroll('#contact')}>
                Start a project →
              </a>
            </motion.div>
          </>
        )}
      </div>

    </section>
  );
}
