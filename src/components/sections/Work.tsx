'use client';

import { motion } from 'framer-motion';
import BrowserMockup from '@/components/ui/BrowserMockup';
import styles from './Work.module.css';

const PROJECTS = [
  {
    id:       'marani'   as const,
    name:     'Marani',
    category: 'Restaurant · Warsaw',
    result:   'More reservations, more covers, more regulars.',
  },
  {
    id:       'adriano'  as const,
    name:     'Adriano',
    category: 'Pizzeria Chain · Poland',
    result:   'One design system across four locations — and scaling.',
  },
  {
    id:       'vantage'  as const,
    name:     'Vantage',
    category: 'Premium Services',
    result:   'Positioned alongside London consultancies. Digitally.',
  },
];

export default function Work() {
  return (
    <section id="work" className={styles.section} aria-label="Selected work">
      <div className={styles.inner}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>Selected work</p>
          <h2 className={styles.title}>
            Real businesses.<br />Real results.
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.mockupWrap}>
                <BrowserMockup project={project.id} className={styles.mockup} />
              </div>
              <div className={styles.meta}>
                <div className={styles.metaTop}>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>
                <p className={styles.result}>{project.result}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a href="#contact" className={styles.ctaLink}>
            Start your project →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
