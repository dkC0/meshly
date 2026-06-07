'use client';

import { useEffect, useRef, useState } from 'react';
import BrowserMockup from '@/components/ui/BrowserMockup';
import styles from './Work.module.css';

interface MetricProps {
  value: string;
  label: string;
  note: string;
  numericTarget?: number;
  isTime?: boolean;
}

function Metric({ value, label, note, numericTarget, isTime }: MetricProps) {
  const [displayed, setDisplayed] = useState('0');
  const ref                       = useRef<HTMLDivElement>(null);
  const animated                  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || numericTarget === undefined) { setDisplayed(value); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        const duration = 1400;
        const start    = performance.now();

        const tick = (now: number) => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = isTime
            ? (eased * numericTarget).toFixed(1)
            : Math.round(eased * numericTarget).toString();

          setDisplayed(isTime ? `${current}s` : `+${current}%`);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplayed(value);
          }
        };

        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, numericTarget, isTime]);

  return (
    <div ref={ref} className={styles.metric}>
      <div className={styles.metricValue}>{displayed}</div>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricNote}>{note}</div>
    </div>
  );
}

interface PanelProps {
  id:       string;
  project:  'marani' | 'adriano' | 'vantage';
  dark?:    boolean;
  bg:       string;
  meta:     string;
  metrics:  MetricProps[];
  summary:  string;
  liveUrl:  string;
  reverse?: boolean;
}

function WorkPanel({ id, project, dark, bg, meta, metrics, summary, liveUrl, reverse }: PanelProps) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <section
      id={id}
      className={`${styles.panel} ${reverse ? styles.panelReverse : ''}`}
      style={{ background: bg }}
      aria-label={`Case study: ${project}`}
    >
      <div className={styles.panelInner}>
        {/* Mockup side */}
        <div className={styles.mockupSide}>
          <div
            className={styles.mockupFrame}
            onMouseLeave={() => setShowBefore(false)}
          >
            <BrowserMockup
              project={project}
              showBefore={showBefore}
              className={styles.mockup}
            />
            <button
              className={`${styles.beforeBtn} ${dark ? styles.beforeBtnDark : ''}`}
              onClick={() => setShowBefore(prev => !prev)}
              aria-label={showBefore ? 'Show current site' : 'Show before Meshly'}
            >
              {showBefore ? 'After →' : '← Before'}
            </button>
          </div>
        </div>

        {/* Meta side */}
        <div className={`${styles.metaSide} ${dark ? styles.metaSideDark : ''}`}>
          <div className={styles.projectMeta}>{meta}</div>

          <div className={styles.metrics}>
            {metrics.map((m, i) => (
              <Metric key={i} {...m} />
            ))}
          </div>

          <p className={`${styles.summary} ${dark ? styles.summaryDark : ''}`}>
            {summary}
          </p>

          <a
            href={liveUrl}
            className={`${styles.liveLink} ${dark ? styles.liveLinkDark : ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View live project ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div id="work" aria-label="Selected work">
      <WorkPanel
        id="work-marani"
        project="marani"
        dark
        bg="var(--color-marani-bg)"
        meta="Marani · Restaurant Group · Warsaw · 2025"
        metrics={[
          {
            value:         '+34%',
            label:         'table bookings per month',
            note:          '30-day pre vs. 60-day post-launch baseline',
            numericTarget: 34,
          },
          {
            value:         '2.1s',
            label:         'average LCP',
            note:          'Google Lighthouse, median 90 runs, Mar 2025',
            numericTarget: 2.1,
            isTime:        true,
          },
          {
            value:         '98/100',
            label:         'PageSpeed score',
            note:          'Mobile performance, Google PageSpeed Insights',
          },
        ]}
        summary="Marani needed to convert tourist curiosity into actual reservations. We rebuilt the booking flow and the performance. Both went up."
        liveUrl="https://marani.pl"
      />

      <WorkPanel
        id="work-adriano"
        project="adriano"
        dark
        bg="var(--color-adriano-bg)"
        meta="Adriano · Pizzeria Chain · Poland · 2025"
        reverse
        metrics={[
          {
            value:         '2.1s',
            label:         'average LCP across all locations',
            note:          'Lighthouse median over 90 runs, Apr 2025',
            numericTarget: 2.1,
            isTime:        true,
          },
          {
            value:         '+41%',
            label:         'online orders within 90 days of launch',
            note:          '90-day pre vs. 90-day post-launch comparison',
            numericTarget: 41,
          },
        ]}
        summary="Adriano needed a chain-wide identity, not just a website. We built a design system that works across four locations and scales to more."
        liveUrl="https://adriano.com.pl"
      />

      <WorkPanel
        id="work-vantage"
        project="vantage"
        dark
        bg="var(--color-vantage-bg)"
        meta="Vantage · Premium Services · 2026"
        metrics={[
          {
            value:         '+58%',
            label:         'inquiry rate within 60 days of launch',
            note:          '90-day pre vs. 60-day post-launch comparison',
            numericTarget: 58,
          },
          {
            value:         '12 days',
            label:         'average inquiry to engagement',
            note:          'Internal CRM data, Q1 2026',
          },
        ]}
        summary="Vantage needed to justify premium pricing to enterprise clients. We positioned them alongside London and Frankfurt consultancies — digitally."
        liveUrl="https://vantageservices.eu"
      />
    </div>
  );
}
