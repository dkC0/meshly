'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrowserMockup from '@/components/ui/BrowserMockup';
import styles from './Hero.module.css';

const HEADLINE_DEFAULT = 'Your website should be working right now.';
const HEADLINE_MARANI  = "Marani's is.";

// Word-by-word stagger for the headline
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <motion.h1
      className={styles.headline}
      aria-label={text}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={styles.headlineWord}
          aria-hidden="true"
          variants={{
            hidden:  { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay:    0.1 + i * 0.05,
                ease:     [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  const [loaded, setLoaded]           = useState(false);
  const [headlineKey, setHeadlineKey] = useState('default');
  const [headlineText, setHeadlineText] = useState(HEADLINE_DEFAULT);

  // Wait for loader to complete
  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    window.addEventListener('meshly:loaded', onLoaded);
    if (sessionStorage.getItem('meshly-loaded')) setLoaded(true);
    return () => window.removeEventListener('meshly:loaded', onLoaded);
  }, []);

  // Listen for Marani panel entering viewport — transform headline
  useEffect(() => {
    const onMaraniVisible = () => {
      setHeadlineText(HEADLINE_MARANI);
      setHeadlineKey('marani');
    };
    const onMaraniHidden = () => {
      setHeadlineText(HEADLINE_DEFAULT);
      setHeadlineKey('default');
    };

    window.addEventListener('meshly:marani-visible', onMaraniVisible);
    window.addEventListener('meshly:marani-hidden',  onMaraniHidden);

    return () => {
      window.removeEventListener('meshly:marani-visible', onMaraniVisible);
      window.removeEventListener('meshly:marani-hidden',  onMaraniHidden);
    };
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
      {/* Headline — transforms when Marani panel enters view */}
      <div className={styles.headlineWrapper}>
        <AnimatePresence mode="wait">
          {loaded && (
            <AnimatedHeadline
              key={headlineKey}
              text={headlineText}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Full-width MacBook mockup — bleeds beyond column */}
      <motion.div
        className={styles.mockupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <BrowserMockup project="marani" className={styles.mockup} />
      </motion.div>

      {/* Positioning text + CTAs */}
      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 12 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.descriptor}>
          Web design &amp; development studio. Warsaw, Poland.
        </p>
        <div className={styles.ctas}>
          <a href="#work"    className={styles.ctaSecondary} onClick={handleClick('#work')}>
            ↓ See the work
          </a>
          <span className={styles.ctaDivider} aria-hidden="true">·</span>
          <a href="#contact" className={styles.ctaPrimary}   onClick={handleClick('#contact')}>
            Start a project →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
