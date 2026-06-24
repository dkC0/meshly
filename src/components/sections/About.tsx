'use client';

import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, drawRule, stillness, processPhase } from '@/lib/animations';
import styles from './About.module.css';

const PROCESS = [
  { step: '1', name: 'Discovery', detail: '30-minute call' },
  { step: '2', name: 'Design',    detail: '1--2 weeks'      },
  { step: '3', name: 'Build',     detail: '4--8 weeks'      },
];

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Meshly">
      <div className={styles.inner}>
        {/* Left column -- headline */}
        <motion.div
          className={styles.left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stillness}
        >
          <h2 className={styles.title}>
            One studio.<br />
            <span className={styles.titleAccent}>One standard.</span>
          </h2>
        </motion.div>

        {/* Right column -- bio + testimonial + process */}
        <div className={styles.right}>
          <motion.p
            className={styles.bio}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            I handle every project myself -- discovery, design, development, and
            deployment, with no handoffs in between. I work with restaurants, law
            firms, and service businesses that have outgrown the website their
            cousin built them in 2014. Based in Warsaw, working across four
            countries since 2024.
          </motion.p>

          {/* Testimonial -- large display-serif statement */}
          <motion.blockquote
            className={styles.quote}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <p className={styles.quoteText}>
              Before Meshly, our website embarrassed us.<br />
              Now we send people there on purpose.
            </p>
            <cite className={styles.quoteCite}>
              -- Marek W., Marani Restaurant Group
            </cite>
          </motion.blockquote>

          {/* Process -- 3 steps with node-based motion */}
          <motion.div
            className={styles.process}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            aria-label="How a project works"
          >
            <motion.div
              className={styles.processRule}
              variants={drawRule}
              aria-hidden="true"
            />
            <motion.div className={styles.processSteps} variants={processPhase}>
              {PROCESS.map(({ step, name, detail }) => (
                <div key={step} className={styles.processStep}>
                  <span className={styles.processNum}>{step}.</span>
                  <span className={styles.processName}>{name}</span>
                  <span className={styles.processDetail}>{detail}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
