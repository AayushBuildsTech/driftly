"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DownloadItineraryButton } from "@/components/detail/DownloadItineraryButton";
import { useCallbackModal } from "@/components/CallbackProvider";
import { openWhatsApp, packageMessage } from "@/lib/whatsapp";
import type { TravelPackage } from "@/types/package";

export function DetailCtaBand({ pkg }: { pkg: TravelPackage }) {
  const { openCallback } = useCallbackModal();

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8 md:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Ready to plan your {pkg.destination} trip?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base font-medium text-white/80">
          Get a custom quote with upfront pricing — no hidden fees, no pressure.
        </p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => openWhatsApp(packageMessage(pkg.name))}
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Chat on WhatsApp
          </Button>
          <Button
            size="lg"
            onClick={openCallback}
            className="w-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
          >
            <PhoneCall className="h-5 w-5" aria-hidden />
            Request Callback
          </Button>
          <DownloadItineraryButton
            pkg={pkg}
            variant="light"
            size="lg"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
