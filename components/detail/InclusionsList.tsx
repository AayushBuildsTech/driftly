import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animation/Reveal";
import type { TravelPackage } from "@/types/package";

export function InclusionsList({ pkg }: { pkg: TravelPackage }) {
  return (
    <Section id="inclusions" className="bg-white">
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal direction="up">
          <div className="h-full rounded-2xl border border-line bg-background p-6 md:p-8">
            <h3 className="text-xl font-bold text-ink">What&apos;s Included</h3>
            <ul className="mt-5 space-y-3">
              {pkg.inclusions.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-ink/80">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.08}>
          <div className="h-full rounded-2xl border border-line bg-background p-6 md:p-8">
            <h3 className="text-xl font-bold text-ink">Not Included</h3>
            <ul className="mt-5 space-y-3">
              {pkg.exclusions.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink/50">
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-ink/70">{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
