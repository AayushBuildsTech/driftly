"use client";

import * as React from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

/** Fades + slides children into view once, using the lightweight `m` component. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const offset = OFFSET[direction];

  const hidden = reduce ? { opacity: 1 } : { opacity: 0, ...offset };
  const shown = { opacity: 1, x: 0, y: 0 };

  return (
    <m.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView || reduce ? shown : hidden}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
