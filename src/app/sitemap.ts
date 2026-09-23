import type { MetadataRoute } from "next";
import { absolute, href, LOCALES, type PageKey } from "@/lib/i18n";

const PAGES: PageKey[] = ["home", "services", "about", "work", "reviews", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((key) =>
    LOCALES.map((locale) => ({
      url: absolute(href(locale, key)),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.8,
      alternates: { languages: { en: absolute(href("en", key)), es: absolute(href("es", key)), "x-default": absolute(href("en", key)) } },
    })),
  );
}
