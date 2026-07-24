"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { useCallbackModal } from "@/components/CallbackProvider";
import { openWhatsApp } from "@/lib/whatsapp";

export function MobileStickyBar() {
  const { openCallback } = useCallbackModal();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex h-[72px] border-t border-line bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        type="button"
        onClick={() => openWhatsApp()}
        className="flex flex-1 items-center justify-center gap-2 bg-accent font-semibold text-white transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        WhatsApp
      </button>
      <button
        type="button"
        onClick={openCallback}
        className="flex flex-1 items-center justify-center gap-2 bg-primary font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        aria-label="Request a callback"
      >
        <PhoneCall className="h-5 w-5" aria-hidden />
        Callback
      </button>
    </div>
  );
}
