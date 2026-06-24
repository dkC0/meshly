'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';
import styles from './Services.module.css';

const SERVICES = [
  {
    num:         '01',
    name:        'Website Design & Development',
    description: 'Custom-coded from scratch. Fast, modern, and built entirely around what your business needs to do online -- not adapted from a template.',
    price:       '€2,500 -- €6,000',
  },
  {
    num:         '02',
    name:        'Brand & Visual Identity',
    description: 'Logo, color system, and typography that work together from day one -- the visual foundation everything else is built on.',
    price:       '€1,200 -- €3,000',
  },
  {
    num:         '03',
    name:        'Website Refresh',
    description: 'Modernize what you already have. Better design, better speed, better first impressions -- without starting from scratch.',
    price:       '€800 -- €2,500',
  },
  {
    num:         '04',
    name:        'Ongoing Care & Updates',
    description: 'Monthly edits, content updates, and technical maintenance -- so your website keeps working exactly the way it should.',
    price:       'from €300/month',
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-label="Services and pricing">
      <div className={styles.inner}>
        {/* Header -- two columns */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>What we build</span>
            <h2 className={styles.title}>
              Every engagement<br />priced in advance.
            </h2>
          </div>
          <p className={styles.headerRight}>
            No hourly rates. No surprise invoices. You know the number
            before a single line of code is written.
          </p>
        </motion.div>

        {/* Service rows */}
        <div className={styles.list} role="list">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              className={styles.row}
              role="listitem"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={rowVariants}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT_EXPO }}
            >
              <span className={styles.num}>{service.num}</span>
              <div className={styles.rowContent}>
                <span className={styles.name}>{service.name}</span>
                <p className={styles.desc}>{service.description}</p>
              </div>
              <span className={styles.price}>{service.price}</span>
            </motion.div>
          ))}
        </div>

        {/* Post-pricing CTA -- conversion architecture */}
        <motion.div
          className={styles.postCta}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <p className={styles.postCtaText}>
            Not sure which service fits? We&rsquo;ll tell you honestly
            in a 30-minute discovery call. No commitment.
          </p>
          <a href="#contact" className={styles.postCtaLink}>
            Start a project &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
