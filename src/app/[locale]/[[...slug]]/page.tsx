import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
import ServicesPage from "@/components/pages/ServicesPage";
import AboutPage from "@/components/pages/AboutPage";
import WorkPage from "@/components/pages/WorkPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import ContactPage from "@/components/pages/ContactPage";
import ThanksPage from "@/components/pages/ThanksPage";
import ReviewRequestPage from "@/components/pages/ReviewRequestPage";
import EstimatorPage from "@/components/pages/EstimatorPage";
import GuidesIndexPage from "@/components/pages/GuidesIndexPage";
import GuidePage from "@/components/pages/GuidePage";
import AreasIndexPage from "@/components/pages/AreasIndexPage";
import AreaPage from "@/components/pages/AreaPage";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import PrivacyPage from "@/components/pages/PrivacyPage";
import { CONTENT, photo, type PhotoKey } from "@/lib/content";
import { serviceById } from "@/lib/content-services";
import { AREA_PAGES } from "@/lib/content-areas";
import { GUIDES } from "@/lib/content-guides";
import { absolute, isLocale, LOCALES, type Locale, type PageKey } from "@/lib/i18n";
import { indexableRoutes, resolve, routeHref, type Route } from "@/lib/routes";

type Params = Promise<{ locale: string; slug?: string[] }>;

export function generateStaticParams() {
  const routes: Route[] = [...indexableRoutes(), { kind: "page", key: "thanks" }, { kind: "page", key: "review" }];
  return LOCALES.flatMap((locale) =>
    routes.map((r) => routeHref(locale, r)).map((p) => p.replace(/^\/es/, "").replace(/^\//, "")).filter(Boolean).map((s) => ({ locale, slug: s.split("/") })),
  );
}

const OG: Record<PageKey, PhotoKey> = {
  home: "hero", services: "kitchen1", about: "worker1", work: "kitchen2", reviews: "porch3", contact: "houseWhite", thanks: "porch1",
  estimator: "kitchen3", guides: "worker3", areas: "porch1", privacy: "houseWhite", review: "porch3",
};

function metaFor(locale: Locale, r: Route): { title: string; description: string; image: PhotoKey } {
  switch (r.kind) {
    case "page": return { ...CONTENT[locale].meta[r.key], image: OG[r.key] };
    case "service": { const s = serviceById(r.id); return { title: s.t[locale].title, description: s.t[locale].description, image: s.photo }; }
    case "area": { const a = AREA_PAGES.find((x) => x.id === r.id)!; return { title: a.t[locale].title, description: a.t[locale].description, image: a.photo }; }
    case "guide": { const g = GUIDES.find((x) => x.id === r.id)!; return { title: g.t[locale].title, description: g.t[locale].description, image: g.photo }; }
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const r = resolve(locale, slug);
  if (!r) return {};
  const m = metaFor(locale, r);
  const canonical = absolute(routeHref(locale, r));
  const noindex = r.kind === "page" && (r.key === "thanks" || r.key === "review");
  return {
    title: m.title, description: m.description,
    alternates: { canonical, languages: { "en-US": absolute(routeHref("en", r)), "es-US": absolute(routeHref("es", r)), "x-default": absolute(routeHref("en", r)) } },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: { type: r.kind === "guide" ? "article" : "website", siteName: "Z Construction & Remodeling LLC", title: m.title, description: m.description, url: canonical, locale: locale === "en" ? "en_US" : "es_US", alternateLocale: locale === "en" ? "es_US" : "en_US", images: [{ url: photo(m.image, 1600) }] },
    twitter: { card: "summary_large_image" },
    other: { "geo.region": "US-AL", "geo.placename": "Auburn", "geo.position": "32.6099;-85.4808", ICBM: "32.6099, -85.4808" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const r = resolve(locale, slug);
  if (!r) notFound();
  const l = locale as Locale;
  if (r.kind === "service") return <ServiceDetailPage locale={l} id={r.id} />;
  if (r.kind === "area") return <AreaPage locale={l} id={r.id} />;
  if (r.kind === "guide") return <GuidePage locale={l} id={r.id} />;
  switch (r.key) {
    case "home": return <HomePage locale={l} />;
    case "services": return <ServicesPage locale={l} />;
    case "about": return <AboutPage locale={l} />;
    case "work": return <WorkPage locale={l} />;
    case "reviews": return <ReviewsPage locale={l} />;
    case "contact": return <ContactPage locale={l} />;
    case "thanks": return <ThanksPage locale={l} />;
    case "review": return <ReviewRequestPage locale={l} />;
    case "estimator": return <EstimatorPage locale={l} />;
    case "guides": return <GuidesIndexPage locale={l} />;
    case "areas": return <AreasIndexPage locale={l} />;
    case "privacy": return <PrivacyPage locale={l} />;
  }
}
