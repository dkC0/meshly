'use client';

import { motion } from 'framer-motion';
import styles from './Capabilities.module.css';

const STACK = [
  'Next.js', 'TypeScript', 'Framer Motion', 'CSS Modules',
  'Node.js', 'Vercel', 'Figma', 'Lighthouse',
];

const CAPABILITIES = [
  {
    number: '01',
    title:  'Custom-coded from scratch',
    body:   'No page builders. No WordPress templates. Every site is written in Next.js and TypeScript — the same stack used by Vercel, Linear, and Loom. Your website loads in under 2 seconds because the code is lean by design.',
    tags:   ['Next.js 14', 'TypeScript', 'SSR / SSG'],
  },
  {
    number: '02',
    title:  'Designed for conversion',
    body:   'Beautiful is not enough. Every layout decision is made with the visitor\'s journey in mind — what they need to see, in what order, and what should make them contact you. Form follows function.',
    tags:   ['UX Design', 'Conversion', 'Information Architecture'],
  },
  {
    number: '03',
    title:  'Performance as a feature',
    body:   'A site that scores 98/100 on PageSpeed ranks higher on Google, loads faster on mobile, and keeps visitors from bouncing. We optimise images, fonts, and code so performance is built in, not bolted on.',
    tags:   ['Core Web Vitals', 'SEO', 'Image Optimisation'],
  },
  {
    number: '04',
    title:  'One person, full accountability',
    body:   'No handoffs between designers and developers. No account managers in the middle. You talk directly to the person building your site, which means fewer misunderstandings and faster decisions.',
    tags:   ['Direct Communication', 'Warsaw', '4 Countries'],
  },
];

const card = {
  hidden:  { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Capabilities() {
  return (
    <section id="how" className={styles.section} aria-label="How we build websites">
      <div className={styles.inner}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>How we build</span>
          <h2 className={styles.title}>
            Websites built the way<br />serious businesses deserve.
          </h2>
          <p className={styles.intro}>
            Every Meshly project is hand-coded, performance-tested, and designed
            around your business goals — not a template someone else used first.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className={styles.cards} role="list">
          {CAPABILITIES.map((cap, i) => (
            <motion.article
              key={cap.number}
              className={styles.card}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="listitem"
            >
              <span className={styles.cardNumber}>{cap.number}</span>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardBody}>{cap.body}</p>
              <div className={styles.tags}>
                {cap.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tech stack strip */}
        <motion.div
          className={styles.stackRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          aria-label="Technology stack"
        >
          <span className={styles.stackLabel}>Built with</span>
          <div className={styles.stackPills}>
            {STACK.map(tech => (
              <span key={tech} className={styles.pill}>{tech}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
