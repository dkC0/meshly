'use client';

import { motion } from 'framer-motion';
import { nodeAppear } from '@/lib/animations';
import styles from './MeshNode.module.css';

interface MeshNodeProps {
  className?: string;
  animated?: boolean;
  delay?: number;
  size?: number;
  pulse?: boolean;
}

export default function MeshNode({
  className,
  animated = true,
  delay = 0,
  size = 8,
  pulse = false,
}: MeshNodeProps) {
  const nodeStyle = size !== 8 ? { width: size, height: size } : undefined;

  if (!animated) {
    return (
      <span
        className={[styles.nodeWrapper, className ?? ''].filter(Boolean).join(' ')}
        aria-hidden="true"
        style={nodeStyle ? { display: 'inline-block', position: 'relative', width: size, height: size, flexShrink: 0 } : undefined}
      >
        <span
          className={styles.node}
          style={nodeStyle}
        />
      </span>
    );
  }

  return (
    <motion.span
      className={[styles.nodeWrapper, className ?? ''].filter(Boolean).join(' ')}
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      style={nodeStyle ? { display: 'inline-block', position: 'relative', width: size, height: size, flexShrink: 0 } : undefined}
      whileHover={pulse ? 'hover' : undefined}
    >
      <span className={styles.node} style={nodeStyle} />
      {pulse && (
        <motion.span
          className={styles.pulse}
          style={nodeStyle ? { width: size, height: size } : undefined}
          variants={{
            hover: {
              scale: 2.5,
              opacity: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }}
          initial={{ scale: 1, opacity: 1 }}
        />
      )}
    </motion.span>
  );
}
