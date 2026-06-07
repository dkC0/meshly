'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_SETTINGS, fadeIn, staggerContainer } from '@/lib/animations';
import SectionLabel from '@/components/ui/SectionLabel';
import useCountUp from '@/hooks/useCountUp';
import styles from './Clients.module.css';

const CATEGORIES = [
  'E-commerce',
  'SaaS',
  'Hospitality',
  'Professional Services',
];

function StatCounter({
  value,
  label,
  prefix = '',
}: {
  value: number;
  label: string;
  prefix?: string;
}) {
  const { ref, count } = useCountUp(value);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNumber}>
        {prefix}
        {count}
        {prefix === '' ? '+' : ''}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Clients() {
  return (
    <section
      id="clients"
      className={styles.section}
      aria-label="Clients — who we work with"
    >
      <div className={styles.inner}>
        <SectionLabel>01 — Clients</SectionLabel>

        <motion.div
          className={styles.stats}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SETTINGS}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <StatCounter value={40} label="projects delivered" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCounter value={4} label="countries" prefix="" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>on-time delivery</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.categories}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SETTINGS}
          variants={fadeIn}
        >
          {CATEGORIES.map((cat, i) => (
            <span key={cat} className={styles.category}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
