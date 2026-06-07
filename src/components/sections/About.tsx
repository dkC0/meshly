'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

const PROCESS = [
  { step: '1', name: 'Discovery', detail: '30-minute call' },
  { step: '2', name: 'Design',    detail: '1–2 weeks'      },
  { step: '3', name: 'Build',     detail: '4–8 weeks'      },
];

const fade = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Meshly">
      <div className={styles.inner}>

        {/* Heading */}
        <motion.div
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
        >
          <h2 className={styles.title}>One studio.<br />One standard.</h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          className={styles.bio}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Every project — discovery, design, development, and deployment — is handled by the
          founder personally. I work with restaurants, law firms, and service businesses that
          have outgrown their current digital presence. Warsaw-based, working across four
          countries since 2024.
        </motion.p>

        {/* Testimonial — no card, no stars, no headshot */}
        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.quoteText}>
            Before Meshly, our website embarrassed us. Now we send people there on purpose.
          </p>
          <cite className={styles.quoteCite}>
            — Marek W., Marani Restaurant Group
          </cite>
        </motion.blockquote>

        {/* Process — three steps, extremely brief */}
        <motion.div
          className={styles.process}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
    </section>
  );
}
