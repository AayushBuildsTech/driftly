"use client";

import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useCallbackModal } from "@/components/CallbackProvider";
import { openWhatsApp, packageMessage } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/format";
import type { TravelPackage } from "@/types/package";

export function PackageCard({
  pkg,
  stop,
}: {
  pkg: TravelPackage;
  /** Optional journey-stop number shown as a boarding-pass style badge. */
  stop?: number;
}) {
  const { openCallback } = useCallbackModal();
  const href = `/packages/${pkg.id}`;

  return (
    <Card className="group flex h-full flex-col transition-all duration-300 md:hover:-translate-y-1.5 md:hover:shadow-card-hover">
      {/* Image (links to detail) */}
      <Link
        href={href}
        className="relative block aspect-[16/10] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-label={`View the ${pkg.name} package`}
      >
        <ImageWithFallback
          src={pkg.image}
          alt={pkg.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 md:group-hover:scale-105"
        />
        {stop !== undefined && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Location {String(stop).padStart(2, "0")}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Link href={href} className="focus-visible:outline-none">
          <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-primary">
            {pkg.destination}
          </h3>
        </Link>
        <p className="mt-1 text-sm font-medium text-ink/60">{pkg.tagline}</p>

        <hr className="my-4 border-line" />

        <ul className="space-y-2">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm font-medium text-ink/80"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>

        <hr className="my-4 border-line" />

        <div className="mt-auto">
          <p className="text-sm font-medium text-ink/50">Starting from</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(pkg.priceFrom)}
            <span className="ml-1 text-sm font-medium text-ink/50">
              / person
            </span>
          </p>

          <Button asChild size="lg" className="mt-4 w-full">
            <Link href={href} aria-label={`View full ${pkg.name} details`}>
              View Details
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              variant="whatsapp"
              onClick={() => openWhatsApp(packageMessage(pkg.name))}
              aria-label={`Chat on WhatsApp about the ${pkg.name} package`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </Button>
            <Button
              variant="secondary"
              onClick={openCallback}
              aria-label={`Request a callback about the ${pkg.name} package`}
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              Callback
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
