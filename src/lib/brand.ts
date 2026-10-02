/* Brand facts and photo IDs, split out of content.ts so client components
   (nav, forms, tracking, slideshow) can import them without pulling the
   whole bilingual copy deck into the browser bundle. content.ts re-exports
   everything here, so server code can keep importing from "@/lib/content". */

export const BRAND = {
  name: "Z Construction & Remodeling LLC",
  short: "Z Construction",
  phone: "(334) 319-2126",
  tel: "+13343192126",
  email: "info@zconstructionremodeling.com", // TODO real inbox
  city: "Auburn",
  region: "AL",
  zip: "36830",
  geo: { lat: 32.6099, lng: -85.4808 },
  founded: 2025,
  rating: "5.0", // real: 5.0 across the reviews on Angi and HomeAdvisor
  license: "#00000", // TODO Alabama HBLB license number. Hidden from the page and schema while it is a placeholder.
  googleReviewUrl: "https://g.page/r/REPLACE_WITH_GOOGLE_REVIEW_LINK/review", // TODO
  angiUrl: "https://www.angi.com/", // TODO direct link to the Angi profile
  hblbSearchUrl: "https://alhobv7prod.glsuite.us/GLSuiteWeb/Clients/ALHOB/Public/LicenseeSearch.aspx",
  homeAdvisorUrl: "https://www.homeadvisor.com/", // TODO direct link to the HomeAdvisor profile
  /* WhatsApp Business number, digits only with country code. Spanish-speaking
     families overwhelmingly prefer WhatsApp to a phone call or a form. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "13343192126", // same number as the phone
  /* Profiles that corroborate the business for Google and AI assistants
     (schema sameAs). Add each URL as soon as the profile exists. */
  profiles: [] as string[], // TODO: Google Business Profile, Facebook, Instagram, Nextdoor, Yelp, BBB, Houzz, Angi, Bing Places
  /* The owner as a named, accountable person: Google's quality raters and AI
     assistants weigh who stands behind advice. Leave name empty until the
     owner confirms how he wants to appear (and ideally adds a headshot at
     public/brand/owner.jpg); nothing about him renders until then.
     TODO(owner): name, e.g. "Luis Pinzón", and optional profile URLs. */
  owner: { name: "", jobTitle: { en: "Owner", es: "Dueño" }, image: "", sameAs: [] as string[] },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],
};

/* Unsplash IDs. Swap for the owner's own job photos in public/work/ when available. */
export const PHOTOS = {
  hero: "photo-1789352050947-c87040ebe0cb", kitchen1: "photo-1682888813913-e13f18692019", kitchen2: "photo-1628745277862-bc0b2d68c50c",
  kitchen3: "photo-1592506119503-c0b18879bd5a", bath1: "photo-1584622650111-993a426fbf0a", bath2: "photo-1638799869566-b17fa794c4de",
  bath3: "photo-1620626011761-996317b8d101", framing1: "photo-1587582423116-ec07293f0395", framing2: "photo-1676802037786-3697d60497ae",
  roomRaw: "photo-1656733911001-16912b79d2bf", worker1: "photo-1589939705384-5185137a7f0f", worker2: "photo-1646324554833-f0b6a479fa5d",
  worker3: "photo-1631396326838-de37e5f8bcbc", worker4: "photo-1505798577917-a65157d3320a", paint1: "photo-1786295866839-d17f879c65cd",
  houseWhite: "photo-1688573156630-950f631f1c38", houseWeathered: "photo-1777728868180-dbfc61eef59f", porch1: "photo-1625602812206-5ec545ca1231",
  porch2: "photo-1761061079517-2ff8192b2f02", porch3: "photo-1669345800916-6f453e20a6cd", deck1: "photo-1613544723371-23b514a78c85",
  deck2: "photo-1722881445918-75ae564ffced", deck3: "photo-1773979638724-c6ffed7fe0de", floor1: "photo-1613621792067-8e28d16b735c",
  floor2: "photo-1731185752376-a4cf3e8556fa",
} as const;
export type PhotoKey = keyof typeof PHOTOS;
export const photo = (k: PhotoKey, w = 1600) => `https://images.unsplash.com/${PHOTOS[k]}?auto=format&fit=crop&w=${w}&q=75`;
