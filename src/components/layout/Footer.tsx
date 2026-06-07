import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.wordmark}>
            <span className={styles.dot} aria-hidden="true" />
            Meshly
          </span>
          <span className={styles.location}>Warsaw, Poland</span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {['Work', 'Services', 'About', 'Contact'].map(label => (
            <a key={label} href={`#${label.toLowerCase()}`} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <span className={styles.copy}>© 2024–2026 Meshly</span>
          <span className={styles.built}>Built to our own standard.</span>
        </div>
      </div>
    </footer>
  );
}
