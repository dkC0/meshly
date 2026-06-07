'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, VIEWPORT_SETTINGS } from '@/lib/animations';
import SectionLabel from '@/components/ui/SectionLabel';
import MeshField from '@/components/ui/MeshField';
import styles from './Process.module.css';

const PHASES = [
  {
    index: '01',
    name: 'TOPOLOGY',
    line1: 'Map the system',
    line2: 'before the surface.',
    duration: '1–2 weeks',
  },
  {
    index: '02',
    name: 'ARCHITECTURE',
    line1: 'Define the structure',
    line2: 'before the skin.',
    duration: '1 week',
  },
  {
    index: '03',
    name: 'CONSTRUCTION',
    line1: 'Build to tolerance,',
    line2: 'not to schedule.',
    duration: '4–8 weeks',
  },
  {
    index: '04',
    name: 'CALIBRATION',
    line1: 'Test until certain,',
    line2: 'then release.',
    duration: '1 week',
  },
];

const firstNodeVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_OUT_EXPO },
  },
};

const horizontalRuleVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.15, ease: EASE_OUT_EXPO },
  },
};

const nodeVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.15 + 0.15 * i,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const headerVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5 + 0.08 * i,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const descVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.7 + 0.08 * i,
      ease: EASE_OUT_EXPO,
    },
  }),
};

export default function Process() {
  return (
    <section
      id="process"
      className={styles.section}
      aria-label="Process — how Meshly works"
    >
      {/* MeshField at higher opacity — Blueprint Night bg gives it contrast */}
      <MeshField
        opacity={0.12}
        density="normal"
        id="process-mesh"
        className={styles.meshBackground}
      />

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.headerRow}>
          <SectionLabel dark>03 — Process</SectionLabel>
          <p className={styles.headerIntro}>
            Every project follows this exact sequence.
            <br />
            We do not skip phases for budget.
          </p>
        </div>

        {/* Horizontal timeline — full width */}
        <div
          className={styles.timeline}
          role="list"
          aria-label="Process phases"
        >
          {/* Node + connecting rule row */}
          <motion.div
            className={styles.timelineTrack}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_SETTINGS}
            aria-hidden="true"
          >
            {PHASES.map((phase, i) => (
              <div key={phase.index} className={styles.trackItem}>
                {/* Phase number above node */}
                <motion.span
                  className={styles.phaseNumberAbove}
                  custom={i}
                  variants={headerVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_SETTINGS}
                >
                  {phase.index}
                </motion.span>

                {/* Node */}
                <motion.span
                  className={styles.timelineNode}
                  custom={i}
                  variants={i === 0 ? firstNodeVariant : nodeVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_SETTINGS}
                />

                {/* Connecting rule to next node */}
                {i < PHASES.length - 1 && (
                  <motion.span
                    className={styles.connectingRule}
                    variants={horizontalRuleVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_SETTINGS}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Phase labels + descriptions row */}
          <div className={styles.phaseGrid}>
            {PHASES.map((phase, i) => (
              <div
                key={phase.index}
                className={styles.phaseItem}
                role="listitem"
              >
                <motion.div
                  className={styles.phaseHeader}
                  custom={i}
                  variants={headerVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_SETTINGS}
                >
                  <span className={styles.phaseNumberMobile}>{phase.index}</span>
                  <span className={styles.phaseName}>{phase.name}</span>
                </motion.div>
                <motion.div
                  custom={i}
                  variants={descVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_SETTINGS}
                >
                  <p className={styles.phaseLine1}>{phase.line1}</p>
                  <p className={styles.phaseLine2}>{phase.line2}</p>
                  <span className={styles.phaseDuration}>{phase.duration}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
