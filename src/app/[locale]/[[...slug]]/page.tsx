import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
import ServicesPage from "@/components/pages/ServicesPage";
import AboutPage from "@/components/pages/AboutPage";
import WorkPage from "@/components/pages/WorkPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import ContactPage from "@/components/pages/ContactPage";
import ThanksPage from "@/components/pages/ThanksPage";
import { CONTENT, photo } from "@/lib/content";
import { absolute, href, isLocale, LOCALES, SLUGS, pageFromSlug, type Locale, type PageKey } from "@/lib/i18n";

type Params = Promise<{ locale: string; slug?: string[] }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    (Object.values(SLUGS[locale]) as string[]).filter(Boolean).map((s) => ({ locale, slug: s.split("/") })),
  );
}

const OG: Record<PageKey, Parameters<typeof photo>[0]> = { home: "hero", services: "kitchen1", about: "worker1", work: "kitchen2", reviews: "porch3", contact: "houseWhite", thanks: "porch1" };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const key = pageFromSlug(locale, slug);
  if (!key) return {};
  const m = CONTENT[locale].meta[key];
  const canonical = absolute(href(locale, key));
  return {
    title: m.title, description: m.description,
    alternates: { canonical, languages: { en: absolute(href("en", key)), es: absolute(href("es", key)), "x-default": absolute(href("en", key)) } },
    robots: key === "thanks" ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: "website", siteName: "Z Construction & Remodeling LLC", title: m.title, description: m.description, url: canonical, locale: locale === "en" ? "en_US" : "es_US", alternateLocale: locale === "en" ? "es_US" : "en_US", images: [{ url: photo(OG[key], 1600) }] },
    twitter: { card: "summary_large_image" },
    other: { "geo.region": "US-AL", "geo.placename": "Auburn", "geo.position": "32.6099;-85.4808", ICBM: "32.6099, -85.4808" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const key = pageFromSlug(locale as Locale, slug);
  if (!key) notFound();
  const l = locale as Locale;
  switch (key) {
    case "home": return <HomePage locale={l} />;
    case "services": return <ServicesPage locale={l} />;
    case "about": return <AboutPage locale={l} />;
    case "work": return <WorkPage locale={l} />;
    case "reviews": return <ReviewsPage locale={l} />;
    case "contact": return <ContactPage locale={l} />;
    case "thanks": return <ThanksPage locale={l} />;
  }
}
