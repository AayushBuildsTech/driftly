import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Driftly Travels | Custom International Holiday Packages";
const description =
  "Explore premium Thailand, Dubai and Bali holiday packages with private transfers, visa support and exclusive insider pricing.";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title,
  description,
  keywords: [
    "international holiday packages",
    "Thailand tour package",
    "Dubai holiday",
    "Bali package",
    "luxury travel agency",
    "private transfers",
    "visa support",
  ],
  alternates: {
    canonical: BRAND.url,
  },
  openGraph: {
    type: "website",
    url: BRAND.url,
    siteName: BRAND.name,
    title,
    description,
    images: [
      {
        url: `${BRAND.url}/images/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury beach resort at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${BRAND.url}/images/og-cover.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B4F6C",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "Organization"],
  name: BRAND.name,
  url: BRAND.url,
  description,
  telephone: BRAND.phoneTel,
  email: BRAND.email,
  areaServed: "IN",
  makesOffer: [
    { "@type": "Offer", name: "Thailand Holiday Package" },
    { "@type": "Offer", name: "Dubai Holiday Package" },
    { "@type": "Offer", name: "Bali Holiday Package" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
