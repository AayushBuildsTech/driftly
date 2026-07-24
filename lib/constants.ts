/**
 * Single source of truth for brand, contact and form options.
 * Destination content lives in lib/packages.ts; it is re-exported below so
 * existing imports of PACKAGES from "@/lib/constants" keep working.
 */
export { PACKAGES, getPackage } from "@/lib/packages";

export const BRAND = {
  name: "Driftly Travels",
  tagline: "Custom International Holiday Packages",
  // Phone number in international format WITHOUT the leading "+" for wa.me links.
  whatsappNumber: "919591440976",
  // Used only in structured data / SEO — the number is never shown on the site.
  phoneTel: "+919591440976",
  // Leads are emailed here via FormSubmit (see lib/formsubmit.ts). No key needed.
  email: "driftlytravels@gmail.com",
  // GitHub Pages project URL. If you attach a custom domain later, change this
  // to the domain and set BASE_PATH below (and basePath in next.config) to "".
  url: "https://aayushbuildstech.github.io/driftly",
} as const;

/**
 * Base path the site is served from. GitHub Pages hosts this project repo under
 * /driftly, so production asset links (PDFs, etc.) must be prefixed. next/link
 * and next/image handle this automatically; only raw <a href> / string URLs
 * need asset(). Set both this and next.config's basePath to "" for a root/custom domain.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/driftly" : "";

/** Prefix a public asset path (e.g. a PDF) with the base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Default WhatsApp message used by generic CTAs. */
export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${BRAND.name}! I'd like to plan a custom international trip. Please send me a quote.`;

/** Preferred travel months for the callback form select. */
export const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Destination names available in the callback form select. */
export const DESTINATIONS: string[] = [
  "Thailand",
  "Dubai",
  "Bali",
  "Maldives",
  "Singapore",
  "Vietnam",
  "Other",
];

export const VALUE_PROPS = [
  {
    icon: "Car",
    title: "Dedicated Private Cabs",
    description:
      "Your own driver and vehicle for every transfer and sightseeing day. No shared coaches, ever.",
  },
  {
    icon: "BadgePercent",
    title: "Exclusive Insider Prices",
    description:
      "Direct contracts with hotels and airlines mean 5-star trips at prices you won't find online.",
  },
  {
    icon: "FileCheck",
    title: "Visa Support",
    description:
      "End-to-end documentation help so your paperwork is sorted well before you fly.",
  },
  {
    icon: "MessageCircle",
    title: "24/7 WhatsApp Assistance",
    description:
      "A real specialist on chat before, during and after your trip — whenever you need us.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Express Your Plan",
    description:
      "Tell us where you dream of going and when. One quick chat is all it takes to get started.",
  },
  {
    step: 2,
    title: "Receive a Detailed Itinerary",
    description:
      "We craft a tailored itinerary with flights, villas and transfers — with fully upfront pricing.",
  },
  {
    step: 3,
    title: "Pack Your Bags",
    description:
      "Approve your plan and relax. We handle the details while you count down to takeoff.",
  },
] as const;

export const TRUST_BADGES = [
  "★★★★★ 4.7 Rating",
  "300+ Families",
  "100% Private Transfers",
  "Upfront Price Guarantee",
] as const;
