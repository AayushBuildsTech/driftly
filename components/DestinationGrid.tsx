import { Section } from "@/components/ui/Section";
import { PackageCard } from "@/components/PackageCard";
import { JourneyRoute } from "@/components/JourneyRoute";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { PACKAGES } from "@/lib/constants";

export function DestinationGrid() {
  return (
    <Section
      id="destinations"
      eyebrow="The Driftly Route"
      title="One Journey, Three Unforgettable Destinations"
      subtitle="Follow the trail from Thailand's islands to Dubai's skyline and Bali's jungle — each trip fully private and tailor-made."
    >
      <JourneyRoute />

      <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => (
          <StaggerItem key={pkg.id} className="h-full">
            <PackageCard pkg={pkg} stop={i + 1} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
