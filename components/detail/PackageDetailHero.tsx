"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Parallax } from "@/components/animation/Parallax";
import { DownloadItineraryButton } from "@/components/detail/DownloadItineraryButton";
import { useCallbackModal } from "@/components/CallbackProvider";
import { openWhatsApp, packageMessage } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/format";
import type { TravelPackage } from "@/types/package";

export function PackageDetailHero({ pkg }: { pkg: TravelPackage }) {
  const { openCallback } = useCallbackModal();

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <Parallax className="absolute left-0 right-0 top-[-8%] h-[116%]" distance={90}>
        <div className="relative h-full w-full">
          <ImageWithFallback
            src={pkg.heroImage}
            alt={pkg.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
          />
        </div>
      </Parallax>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,79,108,0.85) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-end px-5 pb-10 pt-24 md:px-8 md:pb-14">
        <Link
          href="/#destinations"
          className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All destinations
        </Link>

        <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
          {pkg.destination}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
          {pkg.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg font-medium text-white/85">
          {pkg.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden />
            Fully customisable
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Best time: {pkg.bestTime}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden />
            {pkg.idealFor}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-btn bg-white/10 px-4 py-2.5 backdrop-blur">
            <span className="text-xs font-medium text-white/70">
              Starting from
            </span>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(pkg.priceFrom)}
              <span className="ml-1 text-sm font-medium text-white/70">
                / person
              </span>
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => openWhatsApp(packageMessage(pkg.name))}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp Us
            </Button>
            <DownloadItineraryButton
              pkg={pkg}
              variant="light"
              size="lg"
              className="w-full sm:w-auto"
            />
            <Button
              size="lg"
              onClick={openCallback}
              className="w-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Request Callback
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
