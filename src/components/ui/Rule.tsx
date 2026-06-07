'use client';

import { motion } from 'framer-motion';
import { drawRule, drawRuleFast, drawRuleDown, VIEWPORT_SETTINGS } from '@/lib/animations';
import styles from './Rule.module.css';

interface RuleProps {
  dark?: boolean;
  vertical?: boolean;
  fast?: boolean;
  className?: string;
  animated?: boolean;
}

export default function Rule({
  dark = false,
  vertical = false,
  fast = false,
  className,
  animated = true,
}: RuleProps) {
  const variant = vertical ? drawRuleDown : fast ? drawRuleFast : drawRule;

  const classNames = [
    styles.rule,
    dark ? styles['rule--dark'] : '',
    vertical ? styles['rule--vertical'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!animated) {
    return <span className={classNames} role="separator" aria-hidden="true" />;
  }

  return (
    <motion.span
      className={classNames}
      role="separator"
      aria-hidden="true"
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SETTINGS}
    />
  );
}
