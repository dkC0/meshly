'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT_EXPO, EASE_IN_EXPO } from '@/lib/animations';
import styles from './Loader.module.css';

const LETTERS  = ['M', 'E', 'S', 'H', 'L', 'Y'];
const LETTER_DELAY = 80;
const RESULTS = [
  { client: 'Marani',  result: 'more bookings'  },
  { client: 'Adriano', result: 'more orders'    },
  { client: 'Vantage', result: 'more clients'   },
];

export default function Loader() {
  const [visible,       setVisible]       = useState(false);
  const [letterCount,   setLetterCount]   = useState(0);
  const [ruleDrawn,     setRuleDrawn]     = useState(false);
  const [linesVisible,  setLinesVisible]  = useState([false, false, false]);
  const [exiting,       setExiting]       = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem('meshly-loaded') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      window.dispatchEvent(new CustomEvent('meshly:loaded'));
      return;
    }

    setVisible(true);
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1 -- type out M-E-S-H-L-Y with pacing that breathes
    LETTERS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLetterCount(i + 1);
      }, 200 + i * LETTER_DELAY));
    });

    const lettersComplete = 200 + LETTERS.length * LETTER_DELAY;

    // Step 2 -- draw the hairline rule
    timers.push(setTimeout(() => setRuleDrawn(true), lettersComplete + 100));

    // Step 3 -- stagger result lines with deliberate pacing
    RESULTS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLinesVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, lettersComplete + 350 + i * 200));
    });

    // Step 4 -- fire loaded event after last result settles
    const resultsComplete = lettersComplete + 350 + RESULTS.length * 200 + 300;
    timers.push(setTimeout(() => {
      window.dispatchEvent(new CustomEvent('meshly:loaded'));
    }, resultsComplete));

    // Step 5 -- exit with a cinematic wipe
    timers.push(setTimeout(() => setExiting(true), resultsComplete + 150));
    timers.push(setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('meshly-loaded', '1');
    }, resultsComplete + 600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: EASE_IN_EXPO }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Warm ambient glow behind content */}
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            {/* MESHLY wordmark -- letters arrive with vertical reveal */}
            <div className={styles.wordmark} aria-label="Meshly">
              {LETTERS.map((letter, i) => (
                <span key={letter + i} className={styles.letterWrap}>
                  <motion.span
                    className={styles.letter}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={letterCount > i
                      ? { y: '0%', opacity: 1 }
                      : { y: '110%', opacity: 0 }
                    }
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Hairline rule -- draws left to right */}
            <motion.div
              className={styles.rule}
              initial={{ scaleX: 0 }}
              animate={ruleDrawn ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: 'left center' }}
            />

            {/* Result lines -- client / result pairs */}
            <div className={styles.results} aria-label="Client results">
              {RESULTS.map(({ client, result }, i) => (
                <motion.div
                  key={client}
                  className={styles.row}
                  initial={{ opacity: 0, x: -8 }}
                  animate={linesVisible[i]
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -8 }
                  }
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                >
                  <span className={styles.client}>{client}</span>
                  <span className={styles.separator} aria-hidden="true" />
                  <span className={styles.result}>{result}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
