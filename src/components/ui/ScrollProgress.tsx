'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollProgress.module.css';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'clients', label: 'Clients' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'work', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const DARK_SECTIONS = ['process', 'contact'];
const TRACK_HEIGHT = 120;

export default function ScrollProgress() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;

      const fill = fillRef.current;
      const node = nodeRef.current;

      if (fill) {
        fill.style.transform = `scaleY(${progress})`;
      }
      if (node) {
        // Node sits at the top of the fill line
        node.style.transform = `translateX(-2.5px) translateY(${progress * TRACK_HEIGHT}px)`;
      }

      // Determine active section
      let active = '';
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            active = section.id;
          }
        }
      }

      setIsDark(DARK_SECTIONS.includes(active));
      const found = SECTIONS.find((s) => s.id === active);
      if (found) setCurrentLabel(found.label);

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={[
        styles.progress,
        isDark ? styles['progress--dark'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.track}>
        <span ref={fillRef} className={styles.fill} />
        {/* Node overlaid on the track */}
        <span ref={nodeRef} className={styles.node} />
      </span>
      {hovered && currentLabel && (
        <span className={styles.label}>{currentLabel}</span>
      )}
    </div>
  );
}
