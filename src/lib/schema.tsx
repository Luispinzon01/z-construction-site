/* JSON-LD builders. Every page links back to the one LocalBusiness node
   (@id = /#business, emitted by the layout), so Google and AI assistants see
   a single entity with services, areas, guides and FAQs hanging off it. */
import { absolute, SITE_URL, type Locale } from "./i18n";

export const BUSINESS_ID = `${SITE_URL}/#business`;

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absolute(it.path) })),
});

export const faqPage = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceNode = (o: { name: string; description: string; path: string; locale: Locale; areas: string[]; image: string; lo?: number; hi?: number }) => ({
  "@context": "https://schema.org", "@type": "Service",
  "@id": `${absolute(o.path)}#service`, name: o.name, serviceType: o.name, description: o.description, url: absolute(o.path), inLanguage: o.locale, image: o.image,
  provider: { "@id": BUSINESS_ID },
  areaServed: o.areas.map((name) => ({ "@type": "City", name: `${name}, AL` })),
  ...(o.lo ? { offers: { "@type": "Offer", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: o.lo, ...(o.hi ? { maxPrice: o.hi } : {}), priceCurrency: "USD" } } } : {}),
});

export const article = (o: { headline: string; description: string; path: string; locale: Locale; image: string; published: string; updated: string }) => ({
  "@context": "https://schema.org", "@type": "Article",
  headline: o.headline, description: o.description, inLanguage: o.locale, image: o.image, datePublished: o.published, dateModified: o.updated,
  mainEntityOfPage: absolute(o.path), author: { "@id": BUSINESS_ID }, publisher: { "@id": BUSINESS_ID },
});

/** Typed WebPage node for pages that have no richer type. `kind` picks the schema.org subtype. */
export const webPage = (o: { kind: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage"; name: string; description: string; path: string; locale: Locale; image?: string }) => ({
  "@context": "https://schema.org", "@type": o.kind,
  "@id": `${absolute(o.path)}#webpage`, name: o.name, description: o.description, url: absolute(o.path), inLanguage: o.locale,
  ...(o.image ? { primaryImageOfPage: { "@type": "ImageObject", contentUrl: o.image } } : {}),
  about: { "@id": BUSINESS_ID }, isPartOf: { "@id": `${SITE_URL}/#website` },
});

/** ItemList of the service landing pages, for the services index. */
export const serviceList = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "ItemList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absolute(it.path) })),
});

/** ImageGallery for the before/after page. */
export const imageGallery = (o: { name: string; path: string; locale: Locale; images: { url: string; caption: string }[] }) => ({
  "@context": "https://schema.org", "@type": "ImageGallery",
  "@id": `${absolute(o.path)}#gallery`, name: o.name, url: absolute(o.path), inLanguage: o.locale, about: { "@id": BUSINESS_ID },
  associatedMedia: o.images.map((im) => ({ "@type": "ImageObject", contentUrl: im.url, caption: im.caption })),
});

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
