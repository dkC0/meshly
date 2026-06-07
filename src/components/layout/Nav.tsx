'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '#work',     label: 'Work'    },
  { href: '#services', label: 'Services'},
  { href: '#about',    label: 'About'   },
  { href: '#contact',  label: 'Contact' },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [listening,   setListening]   = useState(false);
  const [typingText,  setTypingText]  = useState('');
  const [navPreview,  setNavPreview]  = useState(false);
  const listeningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onTyping = (e: Event) => {
      const text = (e as CustomEvent<{ text: string }>).detail.text;
      setTypingText(text);
      setListening(true);
    };
    const onTypingStop = () => {
      if (listeningTimer.current) clearTimeout(listeningTimer.current);
      listeningTimer.current = setTimeout(() => {
        setListening(false);
        setTypingText('');
      }, 2000);
    };
    const onListeningStart = () => {
      setListening(true);
      setTypingText('');
    };

    window.addEventListener('meshly:typing',          onTyping as EventListener);
    window.addEventListener('meshly:typing-stop',     onTypingStop);
    window.addEventListener('meshly:listening-start', onListeningStart);

    return () => {
      window.removeEventListener('meshly:typing',          onTyping as EventListener);
      window.removeEventListener('meshly:typing-stop',     onTypingStop);
      window.removeEventListener('meshly:listening-start', onListeningStart);
      if (listeningTimer.current) clearTimeout(listeningTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const wordmark = (() => {
    if (listening) {
      if (!typingText) return 'Listening…';
      const preview = typingText.slice(0, 46);
      return preview.length < typingText.length ? preview + '…' : preview;
    }
    if (navPreview) return 'Listening…';
    return 'Meshly';
  })();

  const showingAlt = listening || navPreview;

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.inner}>
          <a
            href="/"
            className={styles.wordmark}
            aria-label="Meshly — back to top"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className={styles.dot} aria-hidden="true" />
            <motion.span
              key={wordmark}
              className={`${styles.wordmarkText} ${showingAlt ? styles.wordmarkAlt : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {wordmark}
            </motion.span>
          </a>

          <nav className={styles.links} aria-label="Primary navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={styles.link}
                onClick={e => { e.preventDefault(); handleNavClick(href); }}
                onMouseEnter={href === '#contact' ? () => setNavPreview(true) : undefined}
                onMouseLeave={href === '#contact' ? () => setNavPreview(false) : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(p => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Navigation"
          >
            <nav className={styles.mobileLinks} aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className={styles.mobileLink}
                  onClick={e => { e.preventDefault(); handleNavClick(href); }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className={`${styles.mobileLink} ${styles.mobileLinkCta}`}
                onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.32 }}
              >
                Start a project →
              </motion.a>
            </nav>
            <p className={styles.mobileMeta}>Warsaw, Poland · Est. 2024</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
