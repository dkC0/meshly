'use client';

import styles from './ArrowLink.module.css';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  large?: boolean;
  hero?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ArrowLink({
  href,
  children,
  large = false,
  hero = false,
  className,
  onClick,
}: ArrowLinkProps) {
  const classNames = [
    styles.link,
    large ? styles['link--large'] : '',
    hero ? styles['link--hero'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a href={href} className={classNames} onClick={onClick}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}
