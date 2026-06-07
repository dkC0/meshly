'use client';

import { motion } from 'framer-motion';
import BrowserMockup from '@/components/ui/BrowserMockup';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { projects } from '@/lib/projects';
import styles from './Work.module.css';

const MOCKUPS = {
  Marani:  'marani',
  Adriano: 'adriano',
  Vantage: 'vantage',
} as const;

export default function Work() {
  return (
    <section id="work" className={styles.section} aria-label="Selected work">
      <div className={styles.inner}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <p className={styles.eyebrow}>Selected work</p>
          <h2 className={styles.title}>
            Real businesses.<br />Real results.
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT_EXPO }}
            >
              <div className={styles.metric}>
                <span className={styles.metricValue}>{project.metric}</span>
                <span className={styles.metricLabel}>{project.metricLabel}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectCategory}>{project.clientType} · {project.year}</span>
                </div>
                <p className={styles.synthesis}>{project.synthesis}</p>
              </div>

              <div className={styles.mockupWrap}>
                <BrowserMockup project={MOCKUPS[project.name as keyof typeof MOCKUPS]} className={styles.mockup} />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a href="#contact" className={styles.ctaLink}>
            Start a project →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
