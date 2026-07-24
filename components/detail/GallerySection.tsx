import { Section } from "@/components/ui/Section";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { cn } from "@/lib/cn";
import type { TravelPackage } from "@/types/package";

export function GallerySection({ pkg }: { pkg: TravelPackage }) {
  if (pkg.gallery.length === 0) return null;

  return (
    <Section
      id="gallery"
      eyebrow="A Glimpse"
      title={`Postcards from ${pkg.destination}`}
    >
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {pkg.gallery.map((img, index) => (
          <StaggerItem
            key={img.src}
            // First image spans larger for an editorial feel.
            className={cn(
              index === 0 && "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
            )}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-xl md:rounded-2xl",
                index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
              )}
            >
              <ImageWithFallback
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
