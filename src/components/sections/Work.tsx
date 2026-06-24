'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { projects } from '@/lib/projects';
import styles from './Work.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const projectVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        {/* Client logo strip */}
        <motion.div
          className={styles.logoStrip}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label="Clients"
        >
          {projects.map((project) => (
            <span key={project.name} className={styles.logoText}>
              {project.name}
            </span>
          ))}
        </motion.div>

        {/* Full-width editorial case study cards */}
        <motion.div
          className={styles.projects}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              className={`${styles.project} ${hoveredIndex === i ? styles.projectHovered : ''}`}
              variants={projectVariants}
              role="listitem"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Screenshot placeholder -- designed for real images to replace */}
              <div className={styles.imageArea}>
                <div
                  className={styles.imagePlaceholder}
                  style={{
                    background: project.placeholderGradient,
                  }}
                >
                  <span className={styles.imageLabel}>{project.name}</span>
                </div>
                {/* Hover overlay with metric */}
                <motion.div
                  className={styles.imageOverlay}
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.overlayMetric}>{project.metric}</span>
                  <span className={styles.overlayLabel}>{project.metricLabel}</span>
                </motion.div>
              </div>

              {/* Project details */}
              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectIndex}>{project.index}</span>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectCategory}>
                    {project.clientType} &middot; {project.year}
                  </span>
                </div>

                <div className={styles.projectDetails}>
                  <p className={styles.synthesis}>{project.synthesis}</p>
                  <div className={styles.projectMetric}>
                    <span className={styles.metricValue}>{project.metric}</span>
                    <span className={styles.metricLabel}>{project.metricLabel}</span>
                  </div>
                </div>
              </div>
            </motion.article>
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
            Start a project &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
