/* Locale plumbing. English lives at "/", Spanish at "/es". Slugs are
   localized because a Spanish-speaking homeowner searching Google sees the
   URL too, and "/es/contacto" reads as a real Spanish page, not a bolt-on. */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type PageKey = "home" | "services" | "about" | "work" | "reviews" | "contact" | "thanks";

export const SLUGS: Record<Locale, Record<PageKey, string>> = {
  en: { home: "", services: "services", about: "about", work: "our-work", reviews: "reviews", contact: "contact", thanks: "thank-you" },
  es: { home: "", services: "servicios", about: "nosotros", work: "proyectos", reviews: "resenas", contact: "contacto", thanks: "gracias" },
};

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

/** Site-relative path for a page in a locale: "/", "/services", "/es/servicios". */
export function href(locale: Locale, key: PageKey, hash?: string): string {
  const slug = SLUGS[locale][key];
  const base = locale === "en" ? `/${slug}` : `/es${slug ? `/${slug}` : ""}`;
  const clean = base === "//" ? "/" : base;
  return hash ? `${clean}#${hash}` : clean;
}

/** Resolve a slug array back to a page key, or null for a 404. */
export function pageFromSlug(locale: Locale, slug: string[] | undefined): PageKey | null {
  const s = (slug ?? []).join("/");
  const entry = (Object.entries(SLUGS[locale]) as [PageKey, string][]).find(([, v]) => v === s);
  return entry ? entry[0] : null;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.zconstructionremodeling.com").replace(/\/$/, "");
export const absolute = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
