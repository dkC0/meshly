'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, VIEWPORT_SETTINGS } from '@/lib/animations';
import SectionLabel from '@/components/ui/SectionLabel';
import MeshField from '@/components/ui/MeshField';
import styles from './Philosophy.module.css';

const STATEMENTS = [
  {
    statement: 'We build systems, not surfaces.',
    refusal: 'Most websites are decoration. We build infrastructure — the structure beneath the surface that makes everything else possible.',
  },
  {
    statement: 'The work reveals itself over time.',
    refusal: "If it only impresses in 3 seconds, we've failed. Precision compounds. Every decision either holds or it doesn't.",
  },
];

const nodeVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_OUT_EXPO },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO },
  },
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const statementWrapper = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.0,
    },
  },
};

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className={styles.section}
      aria-label="Philosophy — what Meshly believes"
    >
      {/* Ambient mesh — very subtle on light bg */}
      <MeshField
        opacity={0.03}
        density="sparse"
        id="philosophy-mesh"
        className={styles.meshBackground}
      />

      <div className={styles.inner}>
        {/* Left — label */}
        <div className={styles.left} aria-hidden="true">
          <SectionLabel>01 — Philosophy</SectionLabel>
        </div>

        {/* Right — statements */}
        <motion.div
          className={styles.statements}
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SETTINGS}
          aria-label="Philosophy statements"
        >
          {STATEMENTS.map((item, i) => (
            <motion.div
              key={item.statement}
              className={styles.statementWrapper}
              variants={statementWrapper}
            >
              <div className={styles.rule} aria-hidden="true" />
              <div className={styles.statementRow}>
                {/* Node bullet — appears before text */}
                <motion.span
                  className={styles.nodeBullet}
                  variants={nodeVariant}
                  aria-hidden="true"
                />
                {/* Text block — rises in after node */}
                <motion.div
                  className={styles.statementContent}
                  variants={textVariant}
                >
                  <p className={styles.statementText}>{item.statement}</p>
                  <p className={styles.refusal}>
                    <em>{item.refusal}</em>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          {/* Closing rule */}
          <div className={styles.rule} aria-hidden="true" />
        </motion.div>

        {/* Ghost numeral — right margin, bleeds off page */}
        <div className={styles.ghostNumeral} aria-hidden="true">
          01
        </div>
      </div>

      {/* Bottom rule */}
      <div className={styles.bottomRule} aria-hidden="true" />
    </section>
  );
}
