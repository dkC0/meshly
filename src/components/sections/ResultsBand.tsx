'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';
import styles from './ResultsBand.module.css';

const STATS = [
  { value: '3',    label: 'countries served' },
  { value: '<2s',  label: 'average load time' },
  { value: '24h',  label: 'response time' },
  { value: '100%', label: 'custom coded' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export default function ResultsBand() {
  return (
    <section className={styles.band} aria-label="Key metrics">
      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {STATS.map(({ value, label }) => (
          <motion.div
            key={label}
            className={styles.stat}
            variants={statVariants}
          >
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
