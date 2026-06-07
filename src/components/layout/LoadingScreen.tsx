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
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className={styles.loaderWrapper}>
        {/* Network assembles from a single origin node — the brand concept in 2s */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className={styles.loaderSvg}
          aria-hidden="true"
        >
          {/* Primary lines draw from center outward — cardinal directions */}
          <line className={`${styles.line} ${styles.lineP1}`} x1="80" y1="80" x2="80" y2="24"  stroke="#D4743A" strokeWidth="1" />
          <line className={`${styles.line} ${styles.lineP2}`} x1="80" y1="80" x2="136" y2="80" stroke="#D4743A" strokeWidth="1" />
          <line className={`${styles.line} ${styles.lineP3}`} x1="80" y1="80" x2="80" y2="136" stroke="#D4743A" strokeWidth="1" />
          <line className={`${styles.line} ${styles.lineP4}`} x1="80" y1="80" x2="24" y2="80"  stroke="#D4743A" strokeWidth="1" />

          {/* Secondary lines from endpoint nodes — creates asymmetric mesh, not a cross */}
          <line className={`${styles.line} ${styles.lineS1}`} x1="136" y1="80" x2="128" y2="32"  stroke="#D4743A" strokeWidth="1" />
          <line className={`${styles.line} ${styles.lineS2}`} x1="24"  y1="80" x2="32"  y2="128" stroke="#D4743A" strokeWidth="1" />

          {/* Center origin node */}
          <circle className={`${styles.node} ${styles.nodeCenter}`} cx="80"  cy="80"  r="4"   fill="#D4743A" />

          {/* Primary endpoint nodes */}
          <circle className={`${styles.node} ${styles.nodeP1}`} cx="80"  cy="24"  r="3"   fill="#D4743A" />
          <circle className={`${styles.node} ${styles.nodeP2}`} cx="136" cy="80"  r="3"   fill="#D4743A" />
          <circle className={`${styles.node} ${styles.nodeP3}`} cx="80"  cy="136" r="3"   fill="#D4743A" />
          <circle className={`${styles.node} ${styles.nodeP4}`} cx="24"  cy="80"  r="3"   fill="#D4743A" />

          {/* Secondary endpoint nodes */}
          <circle className={`${styles.node} ${styles.nodeS1}`} cx="128" cy="32"  r="2.5" fill="#D4743A" />
          <circle className={`${styles.node} ${styles.nodeS2}`} cx="32"  cy="128" r="2.5" fill="#D4743A" />
        </svg>

        <span className={styles.wordmark}>MESHLY</span>
      </div>
    </div>
  );
}
