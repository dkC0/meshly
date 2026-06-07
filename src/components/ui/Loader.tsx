'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';
import styles from './Loader.module.css';

const LETTERS  = ['M', 'E', 'S', 'H', 'L', 'Y'];
const LETTER_DELAY = 90; // ms per letter
const RESULTS = [
  { client: 'Marani',  result: 'more bookings'  },
  { client: 'Adriano', result: 'more orders'    },
  { client: 'Vantage', result: 'more clients'   },
];

export default function Loader() {
  const [visible,       setVisible]       = useState(false);
  const [letterCount,   setLetterCount]   = useState(0);
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

    // Step 1 — type out M E S H L Y
    LETTERS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLetterCount(i + 1);
      }, i * LETTER_DELAY));
    });

    const lettersComplete = LETTERS.length * LETTER_DELAY; // ~540ms

    // Step 2 — stagger result lines after letters complete
    RESULTS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setLinesVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, lettersComplete + 120 + i * 160));
    });

    // Step 3 — fire loaded event
    timers.push(setTimeout(() => {
      window.dispatchEvent(new CustomEvent('meshly:loaded'));
    }, lettersComplete + 120 + RESULTS.length * 160 + 100));

    // Step 4 — exit
    const exitAt = lettersComplete + 120 + RESULTS.length * 160 + 250;
    timers.push(setTimeout(() => setExiting(true),  exitAt));
    timers.push(setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('meshly-loaded', '1');
    }, exitAt + 350));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.7, 0, 0.84, 0] }}
          aria-hidden="true"
          role="presentation"
        >
          <div className={styles.content}>
            {/* MESHLY wordmark — letters appear one by one */}
            <div className={styles.wordmark} aria-label="Meshly">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={letter + i}
                  className={styles.letter}
                  initial={{ opacity: 0, y: 8 }}
                  animate={letterCount > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Hairline rule — draws after all letters */}
            <motion.div
              className={styles.rule}
              initial={{ scaleX: 0 }}
              animate={letterCount === LETTERS.length ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            />

            {/* Result lines — client / result pairs */}
            <div className={styles.results} aria-label="Client results">
              {RESULTS.map(({ client, result }, i) => (
                <motion.div
                  key={client}
                  className={styles.row}
                  initial={{ opacity: 0, y: 5 }}
                  animate={linesVisible[i] ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                >
                  <span className={styles.client}>{client}</span>
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
