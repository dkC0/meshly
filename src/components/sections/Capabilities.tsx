'use client';

import { motion } from 'framer-motion';
import styles from './Capabilities.module.css';

const CAPABILITIES = [
  {
    number: '01',
    title:  'Built for your business, not borrowed from someone else\'s',
    body:   'We don\'t use templates. Every website is designed and built specifically for you — so it reflects your business accurately, loads quickly, and keeps working years from now without needing constant attention.',
  },
  {
    number: '02',
    title:  'Every page is designed to get you clients',
    body:   'Beautiful is not enough. We design the exact sequence of what visitors see and when — so they contact you, not your competitor. Every layout decision is made with your customer in mind.',
  },
  {
    number: '03',
    title:  'Fast enough that people actually stay',
    body:   'Slow websites cost you customers before they even see what you offer. Every site we build loads in under two seconds on mobile — which means visitors stay, read, and reach out.',
  },
  {
    number: '04',
    title:  'One person. Full accountability.',
    body:   'No agencies. No account managers. No handoffs. You work directly with the founder — the same person designing and building your website — which means faster decisions and no miscommunication.',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Capabilities() {
  return (
    <section id="how" className={styles.section} aria-label="How we work">
      <div className={styles.inner}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>How we work</span>
          <h2 className={styles.title}>
            Websites that actually work<br />for your business.
          </h2>
        </motion.div>

        <motion.div
          className={styles.cards}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.085 }}
          role="list"
        >
          {CAPABILITIES.map((cap) => (
            <motion.article
              key={cap.number}
              className={styles.card}
              role="listitem"
              variants={cardVariants}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.cardNumber}>{cap.number}</span>
              <span className={styles.ghostNumber} aria-hidden="true">{cap.number}</span>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardBody}>{cap.body}</p>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
