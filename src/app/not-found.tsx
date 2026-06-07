import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found — Meshly',
  description: 'The page you\'re looking for doesn\'t exist or has moved.',
};

export default function NotFound() {
  return (
    <main className={styles.page} aria-label="404 — page not found">
      {/* Large ghost numeral */}
      <span className={styles.ghost} aria-hidden="true">404</span>

      <div className={styles.content}>
        <h1 className={styles.headline}>Page not found.</h1>
        <p className={styles.body}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link href="/" className={styles.backLink} aria-label="Back to Meshly homepage">
          <span className={styles.backArrow} aria-hidden="true">&larr;</span>
          Back to Meshly
        </Link>
      </div>
    </main>
  );
}
