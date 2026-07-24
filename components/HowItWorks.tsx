import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animation/Reveal";
import { DrawLine } from "@/components/animation/DrawLine";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="Simple Process"
      title="How It Works"
      subtitle="From first message to takeoff in three easy steps."
    >
      <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {/* Connector trail (desktop) — draws in on scroll */}
        <DrawLine className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-primary via-secondary to-accent md:block" />
        {HOW_IT_WORKS.map((step, i) => (
          <li key={step.step} className="relative">
            <Reveal delay={i * 0.12}>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white shadow-card ring-4 ring-background">
                  {step.step}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm font-medium text-ink/60">
                  {step.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
