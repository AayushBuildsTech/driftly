"use client";

import * as React from "react";
import Link from "next/link";
import { m, useInView, useReducedMotion } from "framer-motion";
import { Plane, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PACKAGES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Visual "flight itinerary": the three destinations shown as stops on one
 * journey, connected by a dashed flight route that draws in and a plane that
 * flies along it when the section scrolls into view.
 */
export function JourneyRoute() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const active = inView || Boolean(reduce);

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      {/* ---------- Desktop horizontal route ---------- */}
      <div className="relative hidden md:block">
        {/* Route line behind the stops (aligned to the image centres) */}
        <div className="pointer-events-none absolute inset-x-[14%] top-[52px] z-0">
          <svg
            width="100%"
            height="6"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            <line
              x1="0"
              y1="3"
              x2="100"
              y2="3"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="1.5 2.5"
              strokeLinecap="round"
            />
            <m.line
              x1="0"
              y1="3"
              x2="100"
              y2="3"
              stroke="#0F766E"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Plane that flies the whole route */}
        {!reduce && (
          <m.div
            className="pointer-events-none absolute top-[52px] z-20 -translate-y-1/2"
            initial={{ left: "14%", opacity: 0 }}
            animate={
              active
                ? { left: "86%", opacity: [0, 1, 1, 0] }
                : { left: "14%", opacity: 0 }
            }
            transition={{ duration: 1.7, ease: "easeInOut" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
              <Plane className="h-4 w-4 rotate-45" aria-hidden />
            </span>
          </m.div>
        )}

        <div className="relative z-10 grid grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <RouteStop key={pkg.id} pkg={pkg} index={i} active={active} />
          ))}
        </div>
      </div>

      {/* ---------- Mobile vertical route ---------- */}
      <div className="relative md:hidden">
        <div
          className="absolute bottom-8 left-[27px] top-8 w-px border-l-2 border-dashed border-line"
          aria-hidden
        />
        <div className="space-y-6">
          {PACKAGES.map((pkg, i) => (
            <RouteStop
              key={pkg.id}
              pkg={pkg}
              index={i}
              active={active}
              vertical
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RouteStop({
  pkg,
  index,
  active,
  vertical = false,
}: {
  pkg: (typeof PACKAGES)[number];
  index: number;
  active: boolean;
  vertical?: boolean;
}) {
  const stop = String(index + 1).padStart(2, "0");

  const content = (
    <m.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={
        active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.5, ease: EASE, delay: 0.15 + index * 0.18 }}
      className={
        vertical
          ? "flex items-center gap-4"
          : "flex flex-col items-center text-center"
      }
    >
      <div className="relative shrink-0">
        <div className="relative h-[54px] w-[54px] overflow-hidden rounded-full ring-4 ring-background md:h-[72px] md:w-[72px]">
          <ImageWithFallback
            src={pkg.image}
            alt={pkg.imageAlt}
            fill
            sizes="72px"
            className="object-cover"
          />
        </div>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white ring-2 ring-white">
          {stop}
        </span>
      </div>

      <div className={vertical ? "" : "mt-4"}>
        <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-secondary md:justify-center">
          <MapPin className="h-3 w-3" aria-hidden />
          Location {stop}
        </p>
        <h3 className="mt-0.5 text-lg font-bold text-ink">{pkg.destination}</h3>
        <p className="text-xs font-semibold text-ink/55">{pkg.tagline}</p>
      </div>
    </m.div>
  );

  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Location ${stop}: ${pkg.destination}`}
    >
      {content}
    </Link>
  );
}
