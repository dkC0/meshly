'use client';

import { useEffect, useRef } from 'react';
import styles from './SectionTransition.module.css';

interface SectionTransitionProps {
  dark?: boolean;
}

export default function SectionTransition({ dark = false }: SectionTransitionProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // Pulse once on scroll entry
            node.classList.add(styles['node--pulse']);
            setTimeout(() => {
              node.classList.remove(styles['node--pulse']);
            }, 700);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={[
        styles.transition,
        dark ? styles['transition--dark'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <span className={styles.lineTop} />
      <span ref={nodeRef} className={styles.node} />
      <span className={styles.lineBottom} />
    </div>
  );
}
