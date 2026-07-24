import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animation/Reveal";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { TravelPackage } from "@/types/package";

export function PackageHighlights({ pkg }: { pkg: TravelPackage }) {
  return (
    <Section id="overview" className="bg-white">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
            {pkg.destination}, done properly
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-ink/70 md:text-lg">
            {pkg.overview}
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
          {pkg.highlights.map((h) => (
            <StaggerItem key={h}>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-background p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-ink">{h}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
