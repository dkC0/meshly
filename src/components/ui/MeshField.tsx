'use client';

import { useEffect, useRef, useMemo } from 'react';
import styles from './MeshField.module.css';

export interface MeshFieldProps {
  opacity?: number;
  activeColor?: string;
  className?: string;
  animated?: boolean;
  mouseReactive?: boolean;
  density?: 'sparse' | 'normal' | 'dense';
  id?: string;
}

interface NodePoint {
  x: number;
  y: number;
  col: number;
  row: number;
}

interface Connection {
  from: NodePoint;
  to: NodePoint;
  isHorizontal: boolean;
}

function generateGrid(
  cols: number,
  rows: number
): { nodes: NodePoint[]; connections: Connection[] } {
  const nodes: NodePoint[] = [];
  const nodeMap: Record<string, NodePoint> = {};

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      // Use percentages of the SVG viewBox (0–100)
      const x = (col / cols) * 100;
      const y = (row / rows) * 100;
      const node: NodePoint = { x, y, col, row };
      nodes.push(node);
      nodeMap[`${col},${row}`] = node;
    }
  }

  const connections: Connection[] = [];

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const current = nodeMap[`${col},${row}`];
      if (!current) continue;

      // Right neighbor
      const right = nodeMap[`${col + 1},${row}`];
      if (right) {
        connections.push({ from: current, to: right, isHorizontal: true });
      }

      // Bottom neighbor
      const bottom = nodeMap[`${col},${row + 1}`];
      if (bottom) {
        connections.push({ from: current, to: bottom, isHorizontal: false });
      }
    }
  }

  return { nodes, connections };
}

export default function MeshField({
  opacity = 0.06,
  activeColor = 'var(--color-copper)',
  className,
  animated = false,
  mouseReactive = false,
  density = 'normal',
  id,
}: MeshFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const cols = density === 'sparse' ? 8 : density === 'dense' ? 16 : 12;
  const rows = density === 'sparse' ? 6 : density === 'dense' ? 10 : 8;

  const { nodes, connections } = useMemo(
    () => generateGrid(cols, rows),
    [cols, rows]
  );

  // Build stable IDs so we can target DOM nodes directly
  const meshId = id ?? `mesh-${cols}-${rows}`;

  useEffect(() => {
    if (!mouseReactive || isReducedMotion.current) return;
    if (typeof window === 'undefined') return;

    // Check if touch device — skip mouse reactive
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const svg = svgRef.current;
    if (!svg) return;

    const section = svg.closest('section') ?? svg.parentElement;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    const ACTIVATION_RADIUS = 20; // in % of SVG viewBox units

    const animate = () => {
      const mouse = mouseRef.current;

      if (!svg) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Apply to node circles
      const nodeCircles = svg.querySelectorAll<SVGCircleElement>(
        `[data-mesh-node="${meshId}"]`
      );
      nodeCircles.forEach((circle) => {
        const nx = parseFloat(circle.getAttribute('data-nx') ?? '0');
        const ny = parseFloat(circle.getAttribute('data-ny') ?? '0');

        if (!mouse) {
          circle.style.opacity = String(opacity);
          return;
        }

        const dist = Math.hypot(mouse.x - nx, mouse.y - ny);
        const factor = Math.max(0, 1 - dist / ACTIVATION_RADIUS);
        const extraOpacity = factor * 0.35;
        circle.style.opacity = String(Math.min(1, opacity + extraOpacity));
      });

      // Apply to path lines
      const lines = svg.querySelectorAll<SVGLineElement>(
        `[data-mesh-line="${meshId}"]`
      );
      lines.forEach((line) => {
        const x1 = parseFloat(line.getAttribute('x1') ?? '0');
        const y1 = parseFloat(line.getAttribute('y1') ?? '0');
        const x2 = parseFloat(line.getAttribute('x2') ?? '0');
        const y2 = parseFloat(line.getAttribute('y2') ?? '0');
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        if (!mouse) {
          line.style.opacity = String(opacity);
          line.style.strokeWidth = '0.7';
          return;
        }

        const dist = Math.hypot(mouse.x - midX, mouse.y - midY);
        const factor = Math.max(0, 1 - dist / ACTIVATION_RADIUS);
        const extraOpacity = factor * 0.25;
        const extraWidth = factor * 0.5;
        line.style.opacity = String(Math.min(1, opacity + extraOpacity));
        line.style.strokeWidth = String(0.5 + extraWidth);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    section.addEventListener('mousemove', handleMouseMove as EventListener, {
      passive: true,
    });
    section.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener(
        'mousemove',
        handleMouseMove as EventListener
      );
      section.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseReactive, opacity, meshId]);

  // Draw-in animation via CSS stroke-dashoffset
  useEffect(() => {
    if (!animated || isReducedMotion.current) return;
    if (typeof window === 'undefined') return;

    const svg = svgRef.current;
    if (!svg) return;

    const lines = Array.from(
      svg.querySelectorAll<SVGLineElement>(`[data-mesh-line="${meshId}"]`)
    );

    // Reset all lines to invisible
    lines.forEach((line) => {
      const len = (line as SVGLineElement & { getTotalLength?: () => number }).getTotalLength?.() ?? 50;
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      line.style.opacity = String(opacity);
    });

    // Stagger draw-in: 8ms between lines, 1800ms total spread
    let delay = 0;
    lines.forEach((line) => {
      const len = (line as SVGLineElement & { getTotalLength?: () => number }).getTotalLength?.() ?? 50;
      const localDelay = delay;
      setTimeout(() => {
        line.style.transition =
          'stroke-dashoffset 400ms linear, opacity 200ms ease';
        line.style.strokeDashoffset = '0';
        line.style.opacity = String(opacity);
      }, localDelay);
      delay += 8;
    });

    // Nodes fade in after their connections draw
    const nodeCircles = Array.from(
      svg.querySelectorAll<SVGCircleElement>(`[data-mesh-node="${meshId}"]`)
    );
    nodeCircles.forEach((circle, i) => {
      circle.style.opacity = '0';
      setTimeout(() => {
        circle.style.transition = 'opacity 300ms ease';
        circle.style.opacity = String(opacity);
      }, 400 + i * 6);
    });
  }, [animated, opacity, meshId]);

  const viewBoxWidth = 100;
  const viewBoxHeight = 100;

  return (
    <svg
      ref={svgRef}
      className={[styles.meshField, className ?? ''].filter(Boolean).join(' ')}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-mesh-id={meshId}
    >
      {/* Lines */}
      <g>
        {connections.map((conn, i) => (
          <line
            key={`line-${i}`}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke={activeColor}
            strokeWidth="0.7"
            style={{
              opacity: animated ? 0 : opacity,
              strokeDasharray: animated ? 200 : undefined,
              strokeDashoffset: animated ? 200 : undefined,
            }}
            data-mesh-line={meshId}
          />
        ))}
      </g>

      {/* Nodes */}
      <g>
        {nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r="0.6"
            fill={activeColor}
            style={{ opacity: animated ? 0 : opacity }}
            data-mesh-node={meshId}
            data-nx={node.x}
            data-ny={node.y}
          />
        ))}
      </g>
    </svg>
  );
}
