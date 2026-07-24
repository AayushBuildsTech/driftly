import {
  BadgePercent,
  Car,
  FileCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animation/Reveal";
import { Counter } from "@/components/animation/Counter";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { VALUE_PROPS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Car,
  BadgePercent,
  FileCheck,
  MessageCircle,
};

const STATS = [
  { value: 4.7, decimals: 1, prefix: "★ ", suffix: "", label: "Average rating" },
  { value: 300, decimals: 0, prefix: "", suffix: "+", label: "Happy families" },
  { value: 100, decimals: 0, prefix: "", suffix: "%", label: "Private transfers" },
  { value: 15, decimals: 0, prefix: "", suffix: "+", label: "Destinations" },
];

export function ValueProps() {
  return (
    <Section
      id="why-us"
      eyebrow="Why Driftly"
      title="Luxury Travel, Handled End-to-End"
      subtitle="The details that turn a good holiday into an effortless one."
      className="bg-white"
    >
      {/* Animated trust stats */}
      <Reveal>
        <div className="mb-12 grid grid-cols-2 gap-6 rounded-2xl border border-line bg-background p-6 md:mb-16 md:grid-cols-4 md:p-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block text-3xl font-bold text-primary md:text-4xl"
              />
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-ink/55">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUE_PROPS.map((prop) => {
          const Icon = ICONS[prop.icon] ?? Car;
          return (
            <StaggerItem key={prop.title} className="h-full">
              <Card className="flex h-full items-start gap-4 p-6 md:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{prop.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-ink/60">
                    {prop.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
