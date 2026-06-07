'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './BrowserMockup.module.css';

export type ProjectId =
  | 'marani'
  | 'adriano'
  | 'vantage'
  | 'restaurant'
  | 'lawfirm'
  | 'barbershop'
  | 'hotel'
  | 'construction'
  | 'localbusiness';

interface BrowserMockupProps {
  project:     ProjectId;
  showBefore?: boolean;
  className?:  string;
}

const PROJECT_URLS: Record<ProjectId, string> = {
  marani:        'marani.pl',
  adriano:       'adriano.com.pl',
  vantage:       'vantageservices.eu',
  restaurant:    'emilia-restaurant.pl',
  lawfirm:       'kowalski-partners.pl',
  barbershop:    'theblade.pl',
  hotel:         'hotelbellmont.pl',
  construction:  'budmar.pl',
  localbusiness: 'lumiere-spa.pl',
};

/* ============================================================================
   EXISTING CLIENT — Marani (kept for Hero usage)
   ============================================================================ */
function MaraniScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.maraniScreen}>
      <div className={styles.maraniNav}>
        <span className={styles.maraniLogo}>MARANI</span>
        <div className={styles.maraniNavLinks}>
          <span>Menu</span>
          <span>Reservations</span>
          <span>About</span>
        </div>
      </div>
      <div className={styles.maraniHero}>
        <div className={styles.maraniHeroLeft}>
          <div className={styles.maraniEyebrow}>Fine Georgian Dining</div>
          <div className={styles.maraniHeadline}>Taste of<br />Tbilisi</div>
          <button className={`${styles.maraniCta} ${hovering ? styles.maraniCtaHover : ''}`}>
            Reserve a table
          </button>
        </div>
        <div className={styles.maraniHeroImage} />
      </div>
      <div className={styles.maraniStats}>
        <span>14 tables</span>
        <span>·</span>
        <span>2 locations</span>
        <span>·</span>
        <span>Open daily</span>
      </div>
      <div className={`${styles.cursor} ${styles.maraniCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   ADRIANO — Pizzeria chain, warm light
   ============================================================================ */
function AdrianoScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.adrianoScreen}>
      <div className={styles.adrianoNav}>
        <span className={styles.adrianoLogo}>Adriano</span>
        <div className={styles.adrianoNavLinks}>
          <span>Menu</span><span>Locations</span><span>Order</span>
        </div>
      </div>
      <div className={styles.adrianoHero}>
        <div className={styles.adrianoHeroContent}>
          <div className={styles.adrianoEyebrow}>Authentic</div>
          <div className={styles.adrianoHeadline}>Pizza</div>
          <div className={styles.adrianoSub}>From Warsaw, for Warsaw</div>
          <div className={`${styles.adrianoCta} ${hovering ? styles.adrianoCtaHover : ''}`}>
            Find nearest location →
          </div>
        </div>
        <div className={styles.adrianoHeroImage} />
      </div>
      <div className={styles.adrianoLocations}>
        {['Śródmieście', 'Mokotów', 'Wola'].map(name => (
          <div key={name} className={styles.adrianoCard}>{name}</div>
        ))}
      </div>
      <div className={`${styles.cursor} ${styles.adrianoCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   VANTAGE — Premium services, deep navy
   ============================================================================ */
function VantageScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.vantageScreen}>
      <div className={styles.vantageNav}>
        <span className={styles.vantageLogo}>VANTAGE</span>
        <div className={styles.vantageNavLinks}>
          <span>Services</span><span>About</span><span>Contact</span>
        </div>
      </div>
      <div className={styles.vantageHero}>
        <div className={styles.vantageEyebrow}>Premium</div>
        <div className={styles.vantageHeadline}>Business<br />Solutions</div>
        <div className={styles.vantageSub}>Strategy · Growth · Results</div>
        <button className={`${styles.vantageCta} ${hovering ? styles.vantageCtaHover : ''}`}>
          Schedule Consultation
        </button>
      </div>
      <div className={styles.vantageCards}>
        <div className={styles.vantageCard}>Legal Advisory</div>
        <div className={styles.vantageCard}>Corporate Strategy</div>
      </div>
      <div className={`${styles.cursor} ${styles.vantageCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   RESTAURANT — Emilia (fine dining, warm dark)
   ============================================================================ */
function RestaurantScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.restaurantScreen}>
      <div className={styles.restaurantNav}>
        <span className={styles.restaurantLogo}>EMILIA</span>
        <div className={styles.restaurantNavLinks}>
          <span>Menu</span>
          <span>Wine</span>
          <span>Reserve</span>
        </div>
      </div>
      <div className={styles.restaurantHero}>
        <div className={styles.restaurantHeroLeft}>
          <div className={styles.restaurantEyebrow}>Seasonal Italian — Warsaw</div>
          <div className={styles.restaurantHeadline}>Where every<br />dish is a story.</div>
          <button className={`${styles.restaurantCta} ${hovering ? styles.restaurantCtaHover : ''}`}>
            Reserve tonight
          </button>
        </div>
        <div className={styles.restaurantHeroImage} />
      </div>
      <div className={styles.restaurantBar}>
        <span>48 covers</span>
        <span>·</span>
        <span>Private dining</span>
        <span>·</span>
        <span>Open Tue – Sun</span>
      </div>
      <div className={`${styles.cursor} ${styles.restaurantCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   LAW FIRM — Kowalski & Partners (dark charcoal, authoritative)
   ============================================================================ */
function LawFirmScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.lawScreen}>
      <div className={styles.lawNav}>
        <span className={styles.lawLogo}>KOWALSKI &amp; PARTNERS</span>
        <div className={styles.lawNavLinks}>
          <span>Practice</span>
          <span>Team</span>
          <span>Contact</span>
        </div>
      </div>
      <div className={styles.lawHero}>
        <div className={styles.lawTag}>Commercial &amp; Contract Law</div>
        <div className={styles.lawHeadline}>When the<br />decision matters most.</div>
        <div className={styles.lawSub}>We advise businesses at every stage — from founding to acquisition.</div>
        <button className={`${styles.lawCta} ${hovering ? styles.lawCtaHover : ''}`}>
          Schedule a consultation
        </button>
      </div>
      <div className={styles.lawPractice}>
        <span className={styles.lawPracticeItem}>Corporate</span>
        <span className={styles.lawDivider}>·</span>
        <span className={styles.lawPracticeItem}>M&amp;A</span>
        <span className={styles.lawDivider}>·</span>
        <span className={styles.lawPracticeItem}>Employment</span>
        <span className={styles.lawDivider}>·</span>
        <span className={styles.lawPracticeItem}>Litigation</span>
      </div>
      <div className={`${styles.cursor} ${styles.lawCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   BARBERSHOP — The Blade (dark warm, premium grooming)
   ============================================================================ */
function BarbershopScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.barberScreen}>
      <div className={styles.barberNav}>
        <span className={styles.barberLogo}>THE BLADE</span>
        <div className={styles.barberNavLinks}>
          <span>Services</span>
          <span>Gallery</span>
          <span>Book</span>
        </div>
      </div>
      <div className={styles.barberHero}>
        <div className={styles.barberHeroLeft}>
          <div className={styles.barberEyebrow}>EST. 2018 · WARSAW</div>
          <div className={styles.barberHeadline}>Sharp cuts.<br />No excuses.</div>
          <button className={`${styles.barberCta} ${hovering ? styles.barberCtaHover : ''}`}>
            Book now
          </button>
        </div>
        <div className={styles.barberHeroImage} />
      </div>
      <div className={styles.barberMenu}>
        <div className={styles.barberMenuItem}>
          <span>Classic Cut</span>
          <span>€35</span>
        </div>
        <div className={styles.barberMenuDivider} />
        <div className={styles.barberMenuItem}>
          <span>Cut &amp; Beard</span>
          <span>€55</span>
        </div>
        <div className={styles.barberMenuDivider} />
        <div className={styles.barberMenuItem}>
          <span>Full Service</span>
          <span>€75</span>
        </div>
      </div>
      <div className={`${styles.cursor} ${styles.barberCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   HOTEL — Bellmont (boutique, warm luxury)
   ============================================================================ */
function HotelScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.hotelScreen}>
      <div className={styles.hotelNav}>
        <span className={styles.hotelLogo}>HOTEL BELLMONT</span>
        <div className={styles.hotelNavLinks}>
          <span>Rooms</span>
          <span>Dining</span>
          <span>Spa</span>
        </div>
      </div>
      <div className={styles.hotelHero}>
        <div className={styles.hotelHeroImage} />
        <div className={styles.hotelHeroContent}>
          <div className={styles.hotelEyebrow}>Boutique Hotel · Warsaw Old Town</div>
          <div className={styles.hotelHeadline}>A room worth<br />returning to.</div>
          <button className={`${styles.hotelCta} ${hovering ? styles.hotelCtaHover : ''}`}>
            Check availability
          </button>
        </div>
      </div>
      <div className={styles.hotelFeatures}>
        <div className={styles.hotelFeature}>28 Rooms</div>
        <div className={styles.hotelFeatureDivider} />
        <div className={styles.hotelFeature}>Restaurant</div>
        <div className={styles.hotelFeatureDivider} />
        <div className={styles.hotelFeature}>Spa</div>
        <div className={styles.hotelFeatureDivider} />
        <div className={styles.hotelFeature}>Events</div>
      </div>
      <div className={`${styles.cursor} ${styles.hotelCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   CONSTRUCTION — Budmar (bold, industrial dark)
   ============================================================================ */
function ConstructionScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.constructScreen}>
      <div className={styles.constructNav}>
        <span className={styles.constructLogo}>BUDMAR</span>
        <div className={styles.constructNavLinks}>
          <span>Projects</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>
      <div className={styles.constructHero}>
        <div className={styles.constructHeroLeft}>
          <div className={styles.constructEyebrow}>GENERAL CONTRACTOR · SINCE 2003</div>
          <div className={styles.constructHeadline}>We build what<br />others won't touch.</div>
          <button className={`${styles.constructCta} ${hovering ? styles.constructCtaHover : ''}`}>
            Request a quote
          </button>
        </div>
        <div className={styles.constructHeroImage} />
      </div>
      <div className={styles.constructTags}>
        <span className={styles.constructTag}>Commercial</span>
        <span className={styles.constructTag}>Residential</span>
        <span className={styles.constructTag}>Renovation</span>
        <span className={styles.constructTag}>Industrial</span>
      </div>
      <div className={`${styles.cursor} ${styles.constructCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   LOCAL BUSINESS — Lumière Spa (light, premium, minimal)
   ============================================================================ */
function LocalBusinessScreen({ hovering }: { hovering: boolean }) {
  return (
    <div className={styles.localScreen}>
      <div className={styles.localNav}>
        <span className={styles.localLogo}>LUMIÈRE</span>
        <div className={styles.localNavLinks}>
          <span>Treatments</span>
          <span>About</span>
          <span>Book</span>
        </div>
      </div>
      <div className={styles.localHero}>
        <div className={styles.localHeroImage} />
        <div className={styles.localHeroContent}>
          <div className={styles.localEyebrow}>Premium Spa & Skincare · Warsaw</div>
          <div className={styles.localHeadline}>Beauty that<br />takes its time.</div>
          <button className={`${styles.localCta} ${hovering ? styles.localCtaHover : ''}`}>
            Book a treatment
          </button>
        </div>
      </div>
      <div className={styles.localServices}>
        <span>Skincare</span>
        <span className={styles.localDot}>·</span>
        <span>Body Treatments</span>
        <span className={styles.localDot}>·</span>
        <span>Massage</span>
      </div>
      <div className={`${styles.cursor} ${styles.localCursor}`} aria-hidden="true" />
    </div>
  );
}

/* ============================================================================
   BEFORE screen — generic placeholder
   ============================================================================ */
function BeforeScreen() {
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

/* ============================================================================
   EXPORT
   ============================================================================ */
export default function BrowserMockup({ project, showBefore = false, className }: BrowserMockupProps) {
  const [hovering, setHovering] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let frameId: ReturnType<typeof setTimeout>;
    const loopDuration = 6000;

    const runLoop = () => {
      frameId = setTimeout(() => {
        setHovering(true);
        const leaveId = setTimeout(() => {
          setHovering(false);
          const nextId = setTimeout(runLoop, loopDuration * 0.42);
          hoverTimerRef.current = nextId;
        }, loopDuration * 0.18);
        hoverTimerRef.current = leaveId;
      }, loopDuration * 0.40);
      hoverTimerRef.current = frameId;
    };

    const initId = setTimeout(runLoop, loopDuration * 0.40);
    hoverTimerRef.current = initId;
    return () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); };
  }, []);

  const screens: Record<ProjectId, React.ReactNode> = {
    marani:        <MaraniScreen        hovering={hovering} />,
    adriano:       <AdrianoScreen       hovering={hovering} />,
    vantage:       <VantageScreen       hovering={hovering} />,
    restaurant:    <RestaurantScreen    hovering={hovering} />,
    lawfirm:       <LawFirmScreen       hovering={hovering} />,
    barbershop:    <BarbershopScreen    hovering={hovering} />,
    hotel:         <HotelScreen         hovering={hovering} />,
    construction:  <ConstructionScreen  hovering={hovering} />,
    localbusiness: <LocalBusinessScreen hovering={hovering} />,
  };

  const screenContent = showBefore ? <BeforeScreen /> : screens[project];

  return (
    <div
      className={`${styles.mockup} ${className ?? ''}`}
      role="img"
      aria-label={`${PROJECT_URLS[project]} website preview`}
    >
      <div className={styles.chrome}>
        <div className={styles.trafficLights}>
          <span className={`${styles.dot} ${styles.dotRed}`}    aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dotYellow}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dotGreen}`}  aria-hidden="true" />
        </div>
        <div className={styles.urlBar} aria-hidden="true">
          {PROJECT_URLS[project]}
        </div>
      </div>
      <div className={styles.screen}>
        {screenContent}
      </div>
    </div>
  );
}
