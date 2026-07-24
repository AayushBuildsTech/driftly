import type { MetadataRoute } from "next";
import { BRAND, PACKAGES } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BRAND.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PACKAGES.map((p) => ({
      url: `${BRAND.url}/packages/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
