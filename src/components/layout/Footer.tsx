'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';
import styles from './Footer.module.css';

const CLOSING_WORDS = 'Built to our own standard.'.split(' ');

export default function Footer() {
  return (
    <>
      {/* Closing moment — the last note before the visitor leaves */}
      <p className={styles.closing} aria-label="Built to our own standard.">
        {CLOSING_WORDS.map((word, i) => (
          <motion.span
            key={i}
            className={styles.closingWord}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT_EXPO }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </p>

      <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
        <div className={styles.inner}>
          <div className={styles.left}>
            <span className={styles.wordmark}>
              <span className={styles.dot} aria-hidden="true" />
              Meshly
            </span>
            <span className={styles.location}>Warsaw, Poland</span>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            {['Work', 'Services', 'About', 'Contact'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} className={styles.link}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.right}>
            <span className={styles.copy}>© 2024–2026 Meshly</span>
          </div>
        </div>
      </footer>
    </>
  );
}
