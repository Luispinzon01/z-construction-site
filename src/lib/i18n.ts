/* Locale plumbing. English lives at "/", Spanish at "/es". Slugs are
   localized because a Spanish-speaking homeowner searching Google sees the
   URL too, and "/es/contacto" reads as a real Spanish page, not a bolt-on.

   Fixed pages are PageKeys. Collections (one page per service, per town,
   per guide) hang off a fixed page's slug and resolve in src/lib/routes.ts. */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type PageKey =
  | "home" | "services" | "about" | "work" | "reviews" | "contact" | "thanks"
  | "estimator" | "guides" | "areas" | "privacy";

export const SLUGS: Record<Locale, Record<PageKey, string>> = {
  en: {
    home: "", services: "services", about: "about", work: "our-work", reviews: "reviews", contact: "contact", thanks: "thank-you",
    estimator: "cost-estimator", guides: "guides", areas: "service-areas", privacy: "privacy-policy",
  },
  es: {
    home: "", services: "servicios", about: "nosotros", work: "proyectos", reviews: "resenas", contact: "contacto", thanks: "gracias",
    estimator: "calculadora-de-costos", guides: "guias", areas: "zonas-de-servicio", privacy: "politica-de-privacidad",
  },
};

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

/** Site-relative path for a slug in a locale: "" → "/" or "/es". */
export function pathFor(locale: Locale, slug: string, hash?: string): string {
  const base = locale === "en" ? `/${slug}` : `/es${slug ? `/${slug}` : ""}`;
  return hash ? `${base}#${hash}` : base;
}

/** Site-relative path for a page in a locale: "/", "/services", "/es/servicios". */
export function href(locale: Locale, key: PageKey, hash?: string): string {
  return pathFor(locale, SLUGS[locale][key], hash);
}

/** Resolve a slug array back to a fixed page key, or null. */
export function pageFromSlug(locale: Locale, slug: string[] | undefined): PageKey | null {
  const s = (slug ?? []).join("/");
  const entry = (Object.entries(SLUGS[locale]) as [PageKey, string][]).find(([, v]) => v === s);
  return entry ? entry[0] : null;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.zconstructionremodeling.com").replace(/\/$/, "");
export const absolute = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
