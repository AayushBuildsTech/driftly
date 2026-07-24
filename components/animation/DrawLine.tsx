"use client";

import * as React from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface DrawLineProps {
  className?: string;
  vertical?: boolean;
}

/** A line that "draws" itself (scale from 0) when scrolled into view. */
export function DrawLine({ className, vertical = false }: DrawLineProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();

  return (
    <m.div
      ref={ref}
      aria-hidden
      className={cn(vertical ? "origin-top" : "origin-left", className)}
      initial={reduce ? undefined : { [vertical ? "scaleY" : "scaleX"]: 0 }}
      animate={inView || reduce ? { scaleX: 1, scaleY: 1 } : undefined}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    />
  );
}
