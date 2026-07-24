"use client";

import * as React from "react";
import { m, useInView, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

/** Container that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className }: StaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView || reduce ? "show" : "hidden"}
    >
      {children}
    </m.div>
  );
}

/** A single staggered child. Must be rendered inside <Stagger>. */
export function StaggerItem({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <m.div className={className} variants={reduce ? undefined : item}>
      {children}
    </m.div>
  );
}
