"use client";

import * as React from "react";
import Image from "next/image";
import { PhoneCall, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCallbackModal } from "@/components/CallbackProvider";
import { BRAND, asset } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Header() {
  const { openCallback } = useCallbackModal();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] w-full backdrop-blur-md transition-shadow",
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_0_rgba(17,24,39,0.06),0_8px_24px_-12px_rgba(17,24,39,0.15)]"
          : "bg-white/70"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${BRAND.name} home`}
        >
          <Image
            src={asset("/logo.png")}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-md object-contain"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-primary">
            {BRAND.name}
          </span>
        </a>

        <div
          className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800 sm:flex"
          title="GST registered business"
        >
          <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden />
          <span className="text-xs font-semibold tracking-tight">
            GSTIN: {BRAND.gstin}
          </span>
        </div>

        <Button
          variant="primary"
          onClick={openCallback}
          aria-label="Call a travel specialist"
        >
          <PhoneCall className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Call Specialist</span>
          <span className="sm:hidden">Call Us</span>
        </Button>
      </div>
    </header>
  );
}
