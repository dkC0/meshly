'use client';

import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function SectionLabel({ children, dark = false, className }: SectionLabelProps) {
  return (
    <span
      className={[
        styles.label,
        dark ? styles['label--dark'] : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
