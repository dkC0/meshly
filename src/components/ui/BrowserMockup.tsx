'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './BrowserMockup.module.css';

interface BrowserMockupProps {
  project: 'marani' | 'adriano' | 'vantage';
  showBefore?: boolean;
  className?: string;
}

const PROJECT_URLS: Record<string, string> = {
  marani:  'marani.pl',
  adriano: 'adriano.com.pl',
  vantage: 'vantageservices.eu',
};

const PROJECT_LABELS: Record<string, string> = {
  marani:  'Marani Restaurant Group',
  adriano: 'Adriano Pizzeria Chain',
  vantage: 'Vantage Premium Services',
};

function MaraniScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.maraniScreen}>
      {/* Nav */}
      <div className={styles.maraniNav}>
        <span className={styles.maraniLogo}>MARANI</span>
        <div className={styles.maraniNavLinks}>
          <span>Menu</span>
          <span>Reservations</span>
          <span>About</span>
        </div>
      </div>
      {/* Hero */}
      <div className={styles.maraniHero}>
        <div className={styles.maraniHeroLeft}>
          <div className={styles.maraniEyebrow}>Fine Georgian Dining</div>
          <div className={styles.maraniHeadline}>Taste of<br />Tbilisi</div>
          <button
            className={`${styles.maraniCta} ${hovering ? styles.maraniCtaHover : ''}`}
          >
            Reserve a table
          </button>
        </div>
        <div className={styles.maraniHeroImage} />
      </div>
      {/* Stats strip */}
      <div className={styles.maraniStats}>
        <span>14 tables</span>
        <span>·</span>
        <span>2 locations</span>
        <span>·</span>
        <span>Open daily</span>
      </div>
      {/* Autonomous cursor dot */}
      <div className={`${styles.cursor} ${styles.maraniCursor}`} aria-hidden="true" />
    </div>
  );
}

function AdrianoScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.adrianoScreen}>
      {/* Nav */}
      <div className={styles.adrianoNav}>
        <span className={styles.adrianoLogo}>Adriano</span>
        <div className={styles.adrianoNavLinks}>
          <span>Menu</span>
          <span>Locations</span>
          <span>Order</span>
        </div>
      </div>
      {/* Hero */}
      <div className={styles.adrianoHero}>
        <div className={styles.adrianoHeroContent}>
          <div className={styles.adrianoEyebrow}>Authentic</div>
          <div className={styles.adrianoHeadline}>Pizza</div>
          <div className={styles.adrianoSub}>From Warsaw, for Warsaw</div>
          <div
            className={`${styles.adrianoCta} ${hovering ? styles.adrianoCtaHover : ''}`}
          >
            Find nearest location →
          </div>
        </div>
        <div className={styles.adrianoHeroImage} />
      </div>
      {/* Location cards */}
      <div className={styles.adrianoLocations}>
        {['Śródmieście', 'Mokotów', 'Wola'].map(name => (
          <div key={name} className={styles.adrianoCard}>{name}</div>
        ))}
      </div>
      <div className={`${styles.cursor} ${styles.adrianoCursor}`} aria-hidden="true" />
    </div>
  );
}

function VantageScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.vantageScreen}>
      {/* Nav */}
      <div className={styles.vantageNav}>
        <span className={styles.vantageLogo}>VANTAGE</span>
        <div className={styles.vantageNavLinks}>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
      {/* Hero */}
      <div className={styles.vantageHero}>
        <div className={styles.vantageEyebrow}>Premium</div>
        <div className={styles.vantageHeadline}>Business<br />Solutions</div>
        <div className={styles.vantageSub}>Strategy · Growth · Results</div>
        <button
          className={`${styles.vantageCta} ${hovering ? styles.vantageCtaHover : ''}`}
        >
          Schedule Consultation
        </button>
      </div>
      {/* Service cards */}
      <div className={styles.vantageCards}>
        <div className={styles.vantageCard}>Legal Advisory</div>
        <div className={styles.vantageCard}>Corporate Strategy</div>
      </div>
      <div className={`${styles.cursor} ${styles.vantageCursor}`} aria-hidden="true" />
    </div>
  );
}

function BeforeScreen({ project }: { project: string }) {
  return (
    <div className={styles.beforeScreen}>
      <div className={styles.beforeNav} />
      <div className={styles.beforeHero} />
      <div className={styles.beforeText}>
        <div className={styles.beforeLine} style={{ width: '70%' }} />
        <div className={styles.beforeLine} style={{ width: '50%' }} />
      </div>
      <div className={styles.beforeButton} />
      <div className={styles.beforeLabel}>Before Meshly</div>
    </div>
  );
}

export default function BrowserMockup({
  project,
  showBefore = false,
  className,
}: BrowserMockupProps) {
  const [hovering, setHovering] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Drive the "button hover" state in sync with cursor animation (6s loop)
  // Cursor reaches button at ~40% of 6s = 2.4s, dwells until 58% = 3.48s
  useEffect(() => {
    let frameId: ReturnType<typeof setTimeout>;
    const loopDuration = 6000;

    const runLoop = () => {
      // Simulate cursor arriving at button
      frameId = setTimeout(() => {
        setHovering(true);
        // Cursor leaves button
        const leaveId = setTimeout(() => {
          setHovering(false);
          // Wait for rest of cycle then repeat
          const nextId = setTimeout(runLoop, loopDuration * 0.42);
          hoverTimerRef.current = nextId;
        }, loopDuration * 0.18);
        hoverTimerRef.current = leaveId;
      }, loopDuration * 0.40);

      hoverTimerRef.current = frameId;
    };

    // Start loop with initial offset matching CSS animation
    const initId = setTimeout(runLoop, loopDuration * 0.40);
    hoverTimerRef.current = initId;

    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const screenContent = showBefore ? (
    <BeforeScreen project={project} />
  ) : project === 'marani' ? (
    <MaraniScreen hovering={hovering} />
  ) : project === 'adriano' ? (
    <AdrianoScreen hovering={hovering} />
  ) : (
    <VantageScreen hovering={hovering} />
  );

  return (
    <div
      className={`${styles.mockup} ${className ?? ''}`}
      role="img"
      aria-label={`${PROJECT_LABELS[project]} website screenshot`}
    >
      {/* Browser chrome */}
      <div className={styles.chrome}>
        <div className={styles.trafficLights}>
          <span className={`${styles.dot} ${styles.dotRed}`}   aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dotYellow}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dotGreen}`}  aria-hidden="true" />
        </div>
        <div className={styles.urlBar} aria-hidden="true">
          {PROJECT_URLS[project]}
        </div>
      </div>
      {/* Screen */}
      <div className={styles.screen}>
        {screenContent}
      </div>
    </div>
  );
}
