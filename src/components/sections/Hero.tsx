'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Studio positioning">
      <div className={styles.headlineWrapper}>
        {loaded && (
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Your website should be working right now.
          </motion.h1>
        )}
      </div>

      <motion.div
        className={styles.mockupWrapper}
        initial={{ opacity: 0, y: 24 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <BrowserMockup project="marani" className={styles.mockup} />
      </motion.div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.descriptor}>
          Web design &amp; development studio. Warsaw, Poland.
        </p>
        <div className={styles.ctas}>
          <a href="#work" className={styles.ctaSecondary} onClick={handleClick('#work')}>
            See the work ↓
          </a>
          <span className={styles.ctaDivider} aria-hidden="true">·</span>
          <a href="#contact" className={styles.ctaPrimary} onClick={handleClick('#contact')}>
            Start a project →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
