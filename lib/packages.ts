import type { TravelPackage } from "@/types/package";

/**
 * Full destination content. Add a new object here and it automatically gets a
 * detail page (/packages/<id>), a card on the home grid, and a downloadable PDF.
 *
 * Image paths point at local files under /public/images/*. Until those AI-
 * generated assets are added, the ImageWithFallback component falls back to the
 * Unsplash URLs in FALLBACK_IMAGES below.
 */

export const PACKAGES: TravelPackage[] = [
  {
    id: "thailand-escape",
    destination: "Thailand",
    name: "Thailand Escape",
    tagline: "Islands, temples & buzzing night markets",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    priceFrom: 39999,
    features: [
      "Return flights included",
      "5-star beachfront villas",
      "Private airport & city transfers",
      "Phi Phi island day cruise",
    ],
    image: "/images/thailand-card.webp",
    imageAlt: "Longtail boats on a turquoise bay in Thailand at golden hour",
    heroImage: "/images/thailand-hero.webp",
    heroImageAlt:
      "Aerial view of turquoise water and limestone karsts around Phi Phi, Thailand",
    overview:
      "From the neon buzz of Bangkok to the glassy turquoise bays of Phuket and Phi Phi, this escape blends culture, beaches and effortless luxury. Every transfer is private, every stay is hand-picked, and your days are yours to shape.",
    highlights: [
      "Private longtail cruise through the Phi Phi islands",
      "Sunset at a beachfront 5-star resort in Phuket",
      "Grand Palace & Wat Arun with a private guide",
      "Floating market & tuk-tuk experience",
      "Authentic Thai cooking session",
      "Optional James Bond Island add-on",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Bangkok",
        description:
          "Landing in the City of Angels, your private chauffeur greets you and transfers you to your 5-star hotel. Evening at leisure to settle in and explore nearby night markets.",
        meals: "Dinner",
        stay: "5-star hotel, Bangkok",
      },
      {
        day: 2,
        title: "Bangkok City & Temples",
        description:
          "A private guide leads you through the Grand Palace, Wat Pho's reclining Buddha and Wat Arun, followed by a long-tail boat ride along the khlongs.",
        meals: "Breakfast",
        stay: "5-star hotel, Bangkok",
      },
      {
        day: 3,
        title: "Fly to Phuket",
        description:
          "A short flight south to Phuket. Private transfer to your beachfront villa. The afternoon is free for the pool, spa or a stroll along Patong.",
        meals: "Breakfast",
        stay: "Beachfront villa, Phuket",
      },
      {
        day: 4,
        title: "Phi Phi Islands Cruise",
        description:
          "A private speedboat whisks you to Maya Bay, Pileh Lagoon and Bamboo Island for snorkelling, swimming and a beach lunch in paradise.",
        meals: "Breakfast & Lunch",
        stay: "Beachfront villa, Phuket",
      },
      {
        day: 5,
        title: "Phang Nga Bay",
        description:
          "Cruise the emerald waters of Phang Nga Bay, sea-kayak through hidden caves and take in the iconic James Bond Island.",
        meals: "Breakfast & Lunch",
        stay: "Beachfront villa, Phuket",
      },
      {
        day: 6,
        title: "Leisure & Thai Cooking",
        description:
          "A slow morning by the sea, then an authentic Thai cooking session with a local chef. Evening free for shopping or a sunset cocktail.",
        meals: "Breakfast & Dinner",
        stay: "Beachfront villa, Phuket",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Savour a final beachfront breakfast before your private transfer to the airport for your flight home.",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Return economy flights",
      "6 nights in 5-star hotels & beachfront villas",
      "Daily breakfast + select meals",
      "All private airport & inter-city transfers",
      "Phi Phi & Phang Nga private cruises",
      "English-speaking local guides",
      "All applicable taxes",
    ],
    exclusions: [
      "Thailand visa fee (support provided)",
      "Travel insurance",
      "Personal expenses & tips",
      "Optional add-on excursions",
    ],
    gallery: [
      { src: "/images/thailand-gallery-1.webp", alt: "Maya Bay beach with turquoise water" },
      { src: "/images/thailand-gallery-2.webp", alt: "Bangkok Grand Palace golden spires" },
      { src: "/images/thailand-gallery-3.webp", alt: "Beachfront infinity pool villa in Phuket" },
      { src: "/images/thailand-gallery-4.webp", alt: "Longtail boat in Phang Nga Bay" },
      { src: "/images/thailand-gallery-5.webp", alt: "Thai street food night market" },
    ],
    faqs: [
      {
        q: "Do I need a visa for Thailand?",
        a: "Most Indian passport holders need a visa. We provide full documentation support and guidance so it is sorted well before you fly.",
      },
      {
        q: "Is this trip good for families?",
        a: "Absolutely. The pace, private transfers and villa stays make it ideal for couples, families and honeymooners alike.",
      },
      {
        q: "Can the itinerary be customised?",
        a: "Yes — every Driftly trip is tailor-made. Add islands, upgrade stays or extend nights and we'll re-price it upfront.",
      },
      {
        q: "What is the best time to visit?",
        a: "November to March offers the sunniest, driest weather across Bangkok and the islands.",
      },
      {
        q: "Are flights included?",
        a: "Yes, return economy flights are included. Business-class upgrades are available on request.",
      },
    ],
    bestTime: "November – March",
    idealFor: "Couples, families & honeymooners",
    itineraryPdf: "/itineraries/thailand-escape.pdf",
  },
  {
    id: "dubai-luxe",
    destination: "Dubai",
    name: "Dubai Luxe",
    tagline: "Skyline glamour & desert adventure",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    priceFrom: 54999,
    features: [
      "Return flights included",
      "Downtown 5-star hotel stay",
      "Private desert safari with dinner",
      "Burj Khalifa & Dubai Frame access",
    ],
    image: "/images/dubai-card.webp",
    imageAlt: "Dubai skyline at dusk with the Burj Khalifa lit up",
    heroImage: "/images/dubai-hero.webp",
    heroImageAlt:
      "Dubai Marina skyline glowing at golden hour with yachts below",
    overview:
      "Sky-high glamour meets golden desert. Glide up the Burj Khalifa, drift over the dunes at sunset, and unwind in a downtown 5-star base — all with private transfers and zero hidden fees.",
    highlights: [
      "124th-floor sunset at the Burj Khalifa",
      "Private red-dune desert safari with BBQ dinner",
      "Dubai Frame & Old Dubai heritage tour",
      "Abra ride across Dubai Creek",
      "Palm Jumeirah & Atlantis photo stops",
      "Optional yacht brunch add-on",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Dubai",
        description:
          "Private chauffeur transfer to your downtown 5-star hotel. Evening at leisure to catch the Dubai Fountain show beneath the Burj Khalifa.",
        meals: "Dinner",
        stay: "5-star hotel, Downtown Dubai",
      },
      {
        day: 2,
        title: "Modern Dubai & Burj Khalifa",
        description:
          "Explore Palm Jumeirah, the Marina and JBR, ending with timed sunset tickets to the Burj Khalifa's observation deck.",
        meals: "Breakfast",
        stay: "5-star hotel, Downtown Dubai",
      },
      {
        day: 3,
        title: "Desert Safari",
        description:
          "Morning free for the beach or Dubai Mall. Afternoon private 4x4 dune bashing, camel encounter and a starlit BBQ dinner with live entertainment.",
        meals: "Breakfast & Dinner",
        stay: "5-star hotel, Downtown Dubai",
      },
      {
        day: 4,
        title: "Old Dubai & Culture",
        description:
          "Discover the Al Fahidi quarter, the spice and gold souks, an abra ride across the Creek, and the striking Dubai Frame.",
        meals: "Breakfast",
        stay: "5-star hotel, Downtown Dubai",
      },
      {
        day: 5,
        title: "Leisure Day",
        description:
          "A free day to shop, relax at the spa, or add an optional yacht brunch or Abu Dhabi day trip.",
        meals: "Breakfast",
        stay: "5-star hotel, Downtown Dubai",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Private transfer to Dubai International for your flight home.",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Return economy flights",
      "5 nights in a downtown 5-star hotel",
      "Daily breakfast + select meals",
      "All private transfers in a premium vehicle",
      "Burj Khalifa & Dubai Frame tickets",
      "Private desert safari with dinner",
      "All applicable taxes",
    ],
    exclusions: [
      "UAE visa fee (support provided)",
      "Travel insurance",
      "Personal expenses & tips",
      "Optional excursions (yacht, Abu Dhabi)",
    ],
    gallery: [
      { src: "/images/dubai-gallery-1.webp", alt: "Burj Khalifa towering over Downtown Dubai" },
      { src: "/images/dubai-gallery-2.webp", alt: "Red desert dunes at sunset near Dubai" },
      { src: "/images/dubai-gallery-3.webp", alt: "Palm Jumeirah aerial view" },
      { src: "/images/dubai-gallery-4.webp", alt: "Dubai Marina yachts and skyline at night" },
      { src: "/images/dubai-gallery-5.webp", alt: "Traditional abra boats on Dubai Creek" },
    ],
    faqs: [
      {
        q: "Do I need a visa for the UAE?",
        a: "Yes, most Indian travellers need a tourist visa. We handle the paperwork and guidance end-to-end.",
      },
      {
        q: "Is Dubai family-friendly?",
        a: "Very. The itinerary balances iconic sights, the desert safari and free time that suits families and couples.",
      },
      {
        q: "Can I add Abu Dhabi?",
        a: "Yes — a private Abu Dhabi day trip (Sheikh Zayed Mosque, Louvre, Ferrari World) can be added on your leisure day.",
      },
      {
        q: "What should I pack?",
        a: "Light, modest clothing for daytime and a light layer for evenings. We share a full pre-departure guide.",
      },
      {
        q: "Are flights included?",
        a: "Yes, return economy flights are included, with business-class upgrades available on request.",
      },
    ],
    bestTime: "October – April",
    idealFor: "Couples, families & first-time flyers",
    itineraryPdf: "/itineraries/dubai-luxe.pdf",
  },
  {
    id: "bali-serenity",
    destination: "Bali",
    name: "Bali Serenity",
    tagline: "Rice terraces, temples & private pools",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    priceFrom: 44999,
    features: [
      "Return flights included",
      "Private-pool villa in Ubud",
      "Dedicated driver for all sightseeing",
      "Uluwatu sunset temple tour",
    ],
    image: "/images/bali-card.webp",
    imageAlt: "Emerald rice terraces stepping down a hillside in Bali",
    heroImage: "/images/bali-hero.webp",
    heroImageAlt:
      "Ubud jungle valley with a private-pool villa and rice terraces at sunrise",
    overview:
      "Bali's soul lives in its terraced valleys, cliffside temples and warm hospitality. Split your stay between spiritual Ubud and the golden beaches of the south, with a private driver on hand throughout.",
    highlights: [
      "Private-pool villa in the Ubud jungle",
      "Tegalalang rice terraces & jungle swing",
      "Uluwatu cliff temple at sunset",
      "Tanah Lot & Tegenungan waterfall",
      "Nusa Penida island day trip",
      "Balinese spa & flower-bath ritual",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Bali",
        description:
          "Warm welcome and private transfer to your Ubud jungle villa. Settle in beside your private pool.",
        meals: "Dinner",
        stay: "Private-pool villa, Ubud",
      },
      {
        day: 2,
        title: "Ubud Highlights",
        description:
          "Tegalalang rice terraces, the famous jungle swing, a coffee plantation tasting and the sacred Monkey Forest.",
        meals: "Breakfast",
        stay: "Private-pool villa, Ubud",
      },
      {
        day: 3,
        title: "Temples & Waterfalls",
        description:
          "Visit Tirta Empul water temple and the cascading Tegenungan waterfall, with time for a Balinese spa ritual.",
        meals: "Breakfast",
        stay: "Private-pool villa, Ubud",
      },
      {
        day: 4,
        title: "Transfer to the South",
        description:
          "Drive south to your beach resort, stopping at the clifftop Tanah Lot temple en route. Afternoon by the sea.",
        meals: "Breakfast",
        stay: "Beach resort, Nusa Dua",
      },
      {
        day: 5,
        title: "Nusa Penida Day Trip",
        description:
          "Fast-boat to Nusa Penida for the iconic Kelingking cliff, Angel's Billabong and Broken Beach.",
        meals: "Breakfast & Lunch",
        stay: "Beach resort, Nusa Dua",
      },
      {
        day: 6,
        title: "Uluwatu Sunset",
        description:
          "A free morning, then the cliffside Uluwatu temple at sunset with a traditional Kecak fire dance.",
        meals: "Breakfast",
        stay: "Beach resort, Nusa Dua",
      },
      {
        day: 7,
        title: "Leisure Day",
        description:
          "Relax on the beach, add a water-sports session, or simply enjoy the resort before your final night.",
        meals: "Breakfast",
        stay: "Beach resort, Nusa Dua",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "Private transfer to Denpasar airport for your flight home.",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Return economy flights",
      "7 nights: Ubud villa + beach resort",
      "Daily breakfast + select meals",
      "Dedicated private driver throughout",
      "Nusa Penida day trip",
      "All temple & attraction entries listed",
      "All applicable taxes",
    ],
    exclusions: [
      "Indonesia visa-on-arrival fee",
      "Travel insurance",
      "Personal expenses & tips",
      "Optional water sports & spa upgrades",
    ],
    gallery: [
      { src: "/images/bali-gallery-1.webp", alt: "Tegalalang rice terraces in Ubud" },
      { src: "/images/bali-gallery-2.webp", alt: "Uluwatu cliff temple at sunset" },
      { src: "/images/bali-gallery-3.webp", alt: "Private-pool jungle villa in Bali" },
      { src: "/images/bali-gallery-4.webp", alt: "Kelingking cliff on Nusa Penida" },
      { src: "/images/bali-gallery-5.webp", alt: "Tanah Lot temple on the sea at dusk" },
    ],
    faqs: [
      {
        q: "Do I need a visa for Bali?",
        a: "Indian travellers get a visa on arrival. We guide you through the simple process before you fly.",
      },
      {
        q: "How much travel is involved?",
        a: "You'll split the trip between Ubud and the south coast with a dedicated private driver, so transfers are comfortable and flexible.",
      },
      {
        q: "Is Bali good for honeymooners?",
        a: "It's one of our most popular honeymoon trips — private-pool villas, sunsets and spa rituals throughout.",
      },
      {
        q: "What is the weather like?",
        a: "April to October is the dry season with the best beach and island-hopping conditions.",
      },
      {
        q: "Are flights included?",
        a: "Yes, return economy flights are included, with upgrades available on request.",
      },
    ],
    bestTime: "April – October",
    idealFor: "Honeymooners, couples & families",
    itineraryPdf: "/itineraries/bali-serenity.pdf",
  },
];

/** Look up a single package by its id/slug. */
export function getPackage(id: string): TravelPackage | undefined {
  return PACKAGES.find((p) => p.id === id);
}
