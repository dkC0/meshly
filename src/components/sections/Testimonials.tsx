'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_SETTINGS, staggerContainer } from '@/lib/animations';
import SectionLabel from '@/components/ui/SectionLabel';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote:
      'Before Meshly, our website looked like every other restaurant in the city. After, people tell us they booked because the site felt like the food would be good. That is not a small thing.',
    author: 'Marek W.',
    role: 'Owner, Krakow',
  },
  {
    quote:
      'I had worked with three agencies before. They all made something beautiful and then left. Meshly made something that works — and explained why every decision was made. I finally understand my own site.',
    author: 'Ania K.',
    role: 'Creative Director, Warsaw',
  },
];

const quoteVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-label="Testimonials — client perspectives"
    >
      <div className={styles.inner}>
        <SectionLabel>04 — Testimonials</SectionLabel>

        <motion.div
          className={styles.list}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SETTINGS}
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              className={styles.quote}
              variants={quoteVariant}
            >
              <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
              <footer className={styles.quoteFooter}>
                <span className={styles.author}>{t.author}</span>
                <span className={styles.role} aria-hidden="true"> — </span>
                <span className={styles.role}>{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
