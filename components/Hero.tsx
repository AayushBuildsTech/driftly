"use client";

import * as React from "react";
import { m } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Parallax } from "@/components/animation/Parallax";
import { useCallbackModal } from "@/components/CallbackProvider";
import { openWhatsApp } from "@/lib/whatsapp";
import { TRUST_BADGES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: i * 0.08 },
  }),
};

export function Hero() {
  const { openCallback } = useCallbackModal();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image (parallax) */}
      <Parallax
        className="absolute left-0 right-0 top-[-6%] h-[112%]"
        distance={70}
      >
        <div className="relative h-full w-full">
          <ImageWithFallback
            src="/images/hero-beach.webp"
            alt="Turquoise sea lapping a white-sand luxury beach resort at sunset"
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
          />
        </div>
      </Parallax>
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 text-center md:px-8">
        <m.h1
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Custom 5-Star International Trips At Exclusive Insider Prices
        </m.h1>

        <m.p
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-5 max-w-2xl text-lg font-medium text-white/85 md:text-xl"
        >
          Flights + Villas + Hotels + Private Drivers. Zero Hidden Fees.
        </m.p>

        {/* Trust badges */}
        <m.ul
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge}
              className="w-full rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm sm:w-auto"
            >
              {badge}
            </li>
          ))}
        </m.ul>

        {/* CTAs */}
        <m.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto mt-9 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => openWhatsApp()}
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
        </m.div>
      </div>
    </section>
  );
}
