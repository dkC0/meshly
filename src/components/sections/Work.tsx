'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BrowserMockup from '@/components/ui/BrowserMockup';
import styles from './Work.module.css';

const CATEGORIES = [
  {
    id:      'restaurant',
    label:   'Restaurant',
    tagline: 'A website that fills tables — before they even walk in the door.',
  },
  {
    id:      'lawfirm',
    label:   'Law Firm',
    tagline: 'Clients arrive already confident they found the right firm.',
  },
  {
    id:      'barbershop',
    label:   'Barbershop',
    tagline: 'Look better than the competition. Online and offline.',
  },
  {
    id:      'hotel',
    label:   'Hotel',
    tagline: 'Premium rooms deserve a website that earns premium bookings.',
  },
  {
    id:      'construction',
    label:   'Construction',
    tagline: 'Show the quality of your work before they ever make the call.',
  },
  {
    id:      'localbusiness',
    label:   'Local Business',
    tagline: 'Look like the best option in your area. Every time someone searches.',
  },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

export default function Work() {
  const [active, setActive] = useState<CategoryId>('restaurant');
  const current = CATEGORIES.find(c => c.id === active)!;

  return (
    <section id="work" className={styles.section} aria-label="Work showcase">
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Our work</p>
          <h2 className={styles.title}>
            Websites that make people want<br />what you're selling.
          </h2>
        </div>

        {/* Category tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Business categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`${styles.tab} ${active === cat.id ? styles.tabActive : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Showcase — large mockup with premium hover border */}
        <div className={styles.showcase}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.mockupWrap}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.mockupFrame}>
                <BrowserMockup project={active} className={styles.mockup} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + '-caption'}
            className={styles.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className={styles.tagline}>{current.tagline}</p>
            <a href="#contact" className={styles.cta}>
              Start your project →
            </a>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
