'use client';

import { motion } from 'framer-motion';
import styles from './Services.module.css';

const SERVICES = [
  { name: 'Website Design & Build',     price: '€2,500 – €6,000'     },
  { name: 'Performance Audit',           price: '€500 – €1,200'       },
  { name: 'Brand + Digital Identity',    price: '€1,200 – €3,000'     },
  { name: 'Ongoing Partnership',         price: 'from €400/month'     },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-label="Services and pricing">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>What we build</span>
        </motion.div>

        <motion.div
          className={styles.menu}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          role="list"
        >
          {SERVICES.map(({ name, price }) => (
            <motion.div
              key={name}
              className={styles.row}
              variants={rowVariants}
              role="listitem"
            >
              <span className={styles.serviceName}>{name}</span>
              <span className={styles.servicePrice}>{price}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Every project priced before work begins. No hourly rates. No surprises.
        </motion.p>
      </div>
    </section>
  );
}
