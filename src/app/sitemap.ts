import type { MetadataRoute } from "next";
import { absolute } from "@/lib/i18n";
import { indexableRoutes, routeHref } from "@/lib/routes";
import { GUIDES } from "@/lib/content-guides";

/* Every indexable route in both languages, each with its hreflang pair. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().flatMap((r) => {
    const priority = r.kind === "page" ? (r.key === "home" ? 1 : r.key === "privacy" ? 0.2 : 0.8) : r.kind === "service" ? 0.9 : 0.7;
    const lastModified = r.kind === "guide" ? GUIDES.find((g) => g.id === r.id)?.updated : undefined;
    return (["en", "es"] as const).map((locale) => ({
      url: absolute(routeHref(locale, r)),
      changeFrequency: "monthly" as const, priority, ...(lastModified ? { lastModified } : {}),
      alternates: { languages: { "en-US": absolute(routeHref("en", r)), "es-US": absolute(routeHref("es", r)), "x-default": absolute(routeHref("en", r)) } },
    }));
  });
}
