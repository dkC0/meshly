'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, drawRule } from '@/lib/animations';
import styles from './Philosophy.module.css';

const BELIEFS = [
  {
    number: '01',
    statement: 'Built for your business, not borrowed from someone else’s',
    detail: 'We don’t use templates. Every website is designed and built specifically for you — so it reflects your business accurately, loads quickly, and keeps working years from now.',
  },
  {
    number: '02',
    statement: 'Every page is designed to get you clients',
    detail: 'Beautiful is not enough. We design the exact sequence of what visitors see and when — so they contact you, not your competitor.',
  },
  {
    number: '03',
    statement: 'Fast enough that people actually stay',
    detail: 'Slow websites cost you customers before they even see what you offer. Every site we build loads in under two seconds on mobile.',
  },
  {
    number: '04',
    statement: 'One person. Full accountability.',
    detail: 'No agencies. No account managers. No handoffs. You work directly with the founder — the same person designing and building your website.',
  },
];

const beliefVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export default function Philosophy() {
  return (
    <section id="how" className={styles.section} aria-label="How we work">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span className={styles.eyebrow}>How we work</span>
          <h2 className={styles.title}>
            Websites that actually work<br />for your business.
          </h2>
        </motion.div>

        <div className={styles.beliefs} role="list">
          {BELIEFS.map((belief, i) => (
            <motion.div
              key={belief.number}
              className={styles.belief}
              role="listitem"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={beliefVariants}
              transition={{ delay: i * 0.05 }}
            >
              {/* Top rule draws in */}
              <motion.div
                className={styles.beliefRule}
                variants={drawRule}
                aria-hidden="true"
              />

              <div className={styles.beliefContent}>
                <span className={styles.beliefNumber}>{belief.number}</span>
                <div className={styles.beliefText}>
                  <h3 className={styles.beliefStatement}>{belief.statement}</h3>
                  <p className={styles.beliefDetail}>{belief.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
