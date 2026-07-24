import { UtensilsCrossed, BedDouble } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animation/Reveal";
import type { TravelPackage } from "@/types/package";

export function ItineraryTimeline({ pkg }: { pkg: TravelPackage }) {
  return (
    <Section
      id="itinerary"
      eyebrow="Your Experience"
      title="A Sample Itinerary"
      subtitle="Just an example of how your trip could flow — every day is fully private and customised around you when you call."
    >
      <ol className="relative mx-auto max-w-3xl">
        {/* Trail rail */}
        <div
          className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:left-[23px]"
          aria-hidden
        />
        {pkg.itinerary.map((d) => (
          <li key={d.day} className="relative pl-14 pb-8 last:pb-0 md:pl-16">
            <span
              className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-card ring-4 ring-background md:h-12 md:w-12 md:text-base"
              aria-hidden
            >
              {d.day}
            </span>
            <Reveal direction="up">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-card md:p-6">
                <h3 className="text-lg font-bold text-ink">
                  <span className="text-secondary">Day {d.day}:</span>{" "}
                  {d.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink/70">
                  {d.description}
                </p>
                {(d.meals || d.stay) && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-ink/60">
                    {d.meals && (
                      <span className="inline-flex items-center gap-1.5">
                        <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
                        {d.meals}
                      </span>
                    )}
                    {d.stay && (
                      <span className="inline-flex items-center gap-1.5">
                        <BedDouble className="h-3.5 w-3.5" aria-hidden />
                        {d.stay}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
