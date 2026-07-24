import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PACKAGES, getPackage } from "@/lib/packages";
import { BRAND } from "@/lib/constants";
import { CallbackProvider } from "@/components/CallbackProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { PackageDetailHero } from "@/components/detail/PackageDetailHero";
import { PackageHighlights } from "@/components/detail/PackageHighlights";
import { ItineraryTimeline } from "@/components/detail/ItineraryTimeline";
import { InclusionsList } from "@/components/detail/InclusionsList";
import { GallerySection } from "@/components/detail/GallerySection";
import { FaqAccordion } from "@/components/detail/FaqAccordion";
import { DetailCtaBand } from "@/components/detail/DetailCtaBand";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Pre-render one static page per package. */
export function generateStaticParams() {
  return PACKAGES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) return { title: `Not found | ${BRAND.name}` };

  const title = `${pkg.name} | ${BRAND.name}`;
  const description = pkg.overview;
  const image = `${BRAND.url}${pkg.heroImage}`;
  const pageUrl = `${BRAND.url}/packages/${pkg.id}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      title,
      description,
      url: pageUrl,
      images: [{ url: image, width: 1200, height: 630, alt: pkg.heroImageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PackagePage({ params }: PageProps) {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.overview,
    touristType: pkg.idealFor,
    provider: {
      "@type": "TravelAgency",
      name: BRAND.name,
      url: BRAND.url,
      telephone: BRAND.phoneTel,
    },
    offers: {
      "@type": "Offer",
      description: "Fully customised — request a free quote",
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.itinerary.length,
      itemListElement: pkg.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        name: d.title,
      })),
    },
  };

  return (
    <CallbackProvider>
      <div id="top" className="pb-[72px] md:pb-0">
        <Header />
        <main>
          <PackageDetailHero pkg={pkg} />
          <PackageHighlights pkg={pkg} />
          <ItineraryTimeline pkg={pkg} />
          <InclusionsList pkg={pkg} />
          <GallerySection pkg={pkg} />
          <FaqAccordion pkg={pkg} />
          <DetailCtaBand pkg={pkg} />
        </main>
        <Footer />
      </div>
      <MobileStickyBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </CallbackProvider>
  );
}
