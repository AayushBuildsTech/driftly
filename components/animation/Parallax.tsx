"use client";

import * as React from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in px across the element's scroll range. */
  distance?: number;
}

/**
 * Translates children on the Y axis as the wrapper scrolls through the
 * viewport. Transform-only (GPU friendly); disabled under reduced-motion.
 */
export function Parallax({
  children,
  className,
  distance = 80,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance / 2, distance / 2]
  );

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
