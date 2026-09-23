import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Grain from "@/components/Grain";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LangSuggest from "@/components/LangSuggest";
import { BRAND, CONTENT, photo } from "@/lib/content";
import { isLocale, LOCALES, SITE_URL, type Locale } from "@/lib/i18n";

/* Barlow Condensed for the display voice: upright, industrial, squared off —
   the type equivalent of a plumb wall. Barlow for body, Space Mono for the
   drafting-table metadata layer (eyebrows, specs, labels). */
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], display: "swap", variable: "--font-bc" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-barlow" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-mono-sp" });

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };
export const viewport: Viewport = { themeColor: "#16233a" };

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

function jsonLd(locale: Locale) {
  const c = CONTENT[locale];
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: BRAND.name, alternateName: BRAND.short, url: `${SITE_URL}/`, inLanguage: locale,
    logo: `${SITE_URL}/brand/logo.png`, telephone: BRAND.tel, email: BRAND.email, image: photo("hero", 1600), description: c.meta.home.description, priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: BRAND.city, addressRegion: BRAND.region, postalCode: BRAND.zip, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: BRAND.geo.lat, longitude: BRAND.geo.lng },
    areaServed: [
      { "@type": "City", name: "Auburn", sameAs: "https://en.wikipedia.org/wiki/Auburn,_Alabama" },
      { "@type": "City", name: "Opelika", sameAs: "https://en.wikipedia.org/wiki/Opelika,_Alabama" },
      { "@type": "AdministrativeArea", name: "Lee County, Alabama" },
    ],
    availableLanguage: ["en", "es"],
    openingHoursSpecification: BRAND.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Construction, Remodeling & Painting Services", itemListElement: c.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })) },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "2", bestRating: "5" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = CONTENT[locale];
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="pb-[72px] lg:pb-0">
        <a className="skip-link" href="#main">{c.ui.skip}</a>
        <Grain />
        <ScrollProgress />
        <Nav locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <LangSuggest locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }} />
      </body>
    </html>
  );
}
