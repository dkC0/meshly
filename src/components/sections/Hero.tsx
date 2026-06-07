'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MeshField from '@/components/ui/MeshField';
import BrowserMockup from '@/components/ui/BrowserMockup';
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

      <MeshField
        opacity={0.05}
        density="sparse"
        mouseReactive
        id="hero-mesh"
        className={styles.meshBackground}
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
              Most are losing you customers, quietly.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a href="#contact" className={styles.ctaPrimary} onClick={handleScroll('#contact')}>
                <span>Start a project</span>
                <span className={styles.ctaArrow} aria-hidden="true">→</span>
              </a>
              <a href="#work" className={styles.ctaSecondary} onClick={handleScroll('#work')}>
                See the work
              </a>
            </motion.div>

            <motion.div
              className={styles.compare}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`${styles.frame} ${styles.frameBefore}`}>
                <BrowserMockup project="marani" showBefore className={styles.frameMockup} />
                <span className={styles.frameLabel}>Before</span>
              </div>
              <div className={`${styles.frame} ${styles.frameAfter}`}>
                <BrowserMockup project="marani" className={styles.frameMockup} />
                <span className={styles.frameLabel}>After Meshly</span>
              </div>
            </motion.div>
          </>
        )}
      </div>

    </section>
  );
}
