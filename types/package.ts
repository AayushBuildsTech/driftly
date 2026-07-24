export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  /** Optional meals included note, e.g. "Breakfast & Dinner" */
  meals?: string;
  /** Optional stay/accommodation note */
  stay?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface TravelPackage {
  /** Unique slug used for keys, routes and anchors */
  id: string;
  /** Destination name, e.g. "Thailand" */
  destination: string;
  /** Marketing name for the package, e.g. "Thailand Escape" */
  name: string;
  /** Short one-line tagline shown under the destination */
  tagline: string;
  /** Trip duration label, e.g. "6 Nights / 7 Days" */
  duration: string;
  /** Number of nights */
  nights: number;
  /** Number of days */
  days: number;
  /** Starting price in INR (whole rupees) */
  priceFrom: number;
  /** Bullet list of top included features (used on cards) */
  features: string[];
  /** Card thumbnail image (16:10) */
  image: string;
  /** Meaningful alt text for the card image */
  imageAlt: string;
  /** Wide detail-page hero image (~21:10) */
  heroImage: string;
  /** Meaningful alt text for the hero image */
  heroImageAlt: string;
  /** 2–3 sentence intro paragraph */
  overview: string;
  /** 5–7 punchy highlight bullets */
  highlights: string[];
  /** Day-by-day itinerary */
  itinerary: ItineraryDay[];
  /** What the price includes */
  inclusions: string[];
  /** What the price excludes */
  exclusions: string[];
  /** Gallery images for the detail page */
  gallery: GalleryImage[];
  /** Frequently asked questions */
  faqs: Faq[];
  /** Best time to visit, e.g. "November – March" */
  bestTime: string;
  /** Who the trip suits, e.g. "Couples, families & honeymooners" */
  idealFor: string;
  /** Path to the downloadable itinerary PDF in /public */
  itineraryPdf: string;
}
