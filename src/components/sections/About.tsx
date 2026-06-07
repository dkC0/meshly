'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

const STATS = [
  { value: '4',    label: 'Countries' },
  { value: '100%', label: 'Custom code' },
  { value: '24h',  label: 'Response time' },
];

const PROCESS = [
  { step: '1', name: 'Discovery', detail: '30-minute call' },
  { step: '2', name: 'Design',    detail: '1–2 weeks'      },
  { step: '3', name: 'Build',     detail: '4–8 weeks'      },
];

const fade = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Meshly">
      <div className={styles.inner}>

        {/* Left column — headline + stats */}
        <motion.div
          className={styles.left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fade}
        >
          <h2 className={styles.title}>
            One studio.<br />
            <span className={styles.titleAccent}>One standard.</span>
          </h2>

          <div className={styles.stats}>
            {STATS.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column — bio + testimonial + process */}
        <div className={styles.right}>
          <motion.p
            className={styles.bio}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fade}
          >
            Every project — discovery, design, development, and deployment — is handled
            by the founder personally. I work with restaurants, law firms, and service
            businesses that have outgrown their current digital presence.
            Warsaw-based, working across four countries since 2024.
          </motion.p>

          {/* Testimonial — copper quote mark */}
          <motion.blockquote
            className={styles.quote}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.quoteMark} aria-hidden="true">"</span>
            <p className={styles.quoteText}>
              Before Meshly, our website embarrassed us.<br />
              Now we send people there on purpose.
            </p>
            <cite className={styles.quoteCite}>
              — Marek W., Marani Restaurant Group
            </cite>
          </motion.blockquote>

          {/* Process — 3 steps */}
          <motion.div
            className={styles.process}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="How a project works"
          >
            <div className={styles.processRule} aria-hidden="true" />
            <div className={styles.processSteps}>
              {PROCESS.map(({ step, name, detail }) => (
                <div key={step} className={styles.processStep}>
                  <span className={styles.processNum}>{step}.</span>
                  <span className={styles.processName}>{name}</span>
                  <span className={styles.processDetail}>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
