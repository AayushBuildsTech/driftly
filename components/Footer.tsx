import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { BRAND, asset } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src={asset("/logo.png")}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="text-lg font-bold text-primary">
              {BRAND.name}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm font-medium text-ink/55">
            Custom 5-star international holidays with private transfers, visa
            support and upfront, honest pricing.
          </p>
          <p className="mt-3 text-xs font-semibold tracking-tight text-ink/60">
            GSTIN: {BRAND.gstin}
          </p>
        </div>

        <div className="md:text-right">
          <h4 className="text-sm font-bold uppercase tracking-widest text-ink/70">
            Quick Contact
          </h4>
          <div className="mt-3 flex flex-col gap-2 md:items-end">
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <p className="text-center text-xs font-medium text-ink/45">
          © {year} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
