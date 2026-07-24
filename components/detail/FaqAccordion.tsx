"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { TravelPackage } from "@/types/package";

export function FaqAccordion({ pkg }: { pkg: TravelPackage }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const baseId = React.useId();

  return (
    <Section
      id="faq"
      eyebrow="Good to Know"
      title="Frequently Asked Questions"
      className="bg-white"
    >
      <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line">
        {pkg.faqs.map((faq, index) => {
          const isOpen = open === index;
          const panelId = `${baseId}-panel-${index}`;
          const btnId = `${baseId}-btn-${index}`;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:px-6"
                >
                  <span className="text-base font-semibold text-ink">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-secondary transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className="px-5 pb-5 text-sm font-medium leading-relaxed text-ink/70 md:px-6"
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
