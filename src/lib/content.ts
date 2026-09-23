/* ---------------------------------------------------------------------------
   Every word, number and link on the site lives here, once per language.
   Editing the site's words almost never means touching a component.

   The Spanish is written as its own copy, not run through the English. It
   speaks to the Hispanic families and landlords of Auburn, Opelika and Lee
   County in the "usted" register they'd expect from a contractor they are
   about to trust with their house: direct, warm, no marketing gloss.

   PLACEHOLDERS TO CONFIRM BEFORE LAUNCH (search "TODO"):
   phone, email, license number, Google review link, real reviews, real photos,
   and the four homepage counters (projects, square feet, years, rating).
   ------------------------------------------------------------------------- */
import type { Locale, PageKey } from "./i18n";

export const BRAND = {
  name: "Z Construction & Remodeling LLC",
  short: "Z Construction",
  phone: "(334) 555-0123", // TODO real number
  tel: "+13345550123",
  email: "info@zconstructionremodeling.com", // TODO real inbox
  city: "Auburn",
  region: "AL",
  zip: "36830",
  geo: { lat: 32.6099, lng: -85.4808 },
  license: "#00000", // TODO Alabama HBLB / GC license number
  googleReviewUrl: "https://g.page/r/REPLACE_WITH_GOOGLE_REVIEW_LINK/review", // TODO
  angiUrl: "https://www.angi.com/",
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

export type ServiceId = "remodeling" | "additions" | "kitchensBaths" | "painting" | "finishing" | "repairs";
export type ServiceGroup = "build" | "finish";
export type GalleryCat = "kitchen" | "bath" | "addition" | "exterior" | "deck" | "flooring";

export interface Service {
  id: ServiceId; group: ServiceGroup; name: string; sub: string; blurb: string; para: string; items: string[]; timeline: string; range: string; photo: PhotoKey; alt: string;
}
export interface Review { quote: string; name: string; meta: string }
export interface GalleryCell {
  kind: "photo" | "wide" | "tall" | "compare"; cat: GalleryCat; title: string; meta: string;
  photo?: PhotoKey; before?: PhotoKey; after?: PhotoKey; alt?: string; altBefore?: string; altAfter?: string;
}

export interface SiteContent {
  nav: Record<Exclude<PageKey, "thanks">, string>;
  ui: {
    freeQuote: string; quoteShort: string; call: string; menu: string; primaryNav: string; quickActions: string;
    langSwitch: string; langSwitchLong: string; langTitle: string; scroll: string; before: string; after: string; dragToCompare: string;
    readMore: string; skip: string; rating: string; ratingSources: string; starsLabel: string;
  };
  footer: { blurb: string; badge: string; services: string; company: string; contact: string; hours: string[]; rights: string; otherSite: string };
  cta: { h: string; p: string; btn: string; word: string };
  meta: Record<Exclude<PageKey, "thanks"> | "thanks", { title: string; description: string }>;
  home: {
    eyebrow: string; h1: string; h1Accent: string; lede: string; primary: string; secondary: string; meta: string[]; marquee: string[];
    counters: { value: number; suffix: string; decimals?: number; label: string; note: string }[];
    split: { eyebrow: string; h: string; lede: string; build: string; buildSub: string; finish: string; finishSub: string; link: string };
    introEyebrow: string; introH: string; introP: string[]; introLink: string;
    stats: { n: string; l: string }[];
    servicesEyebrow: string; servicesH: string; servicesLede: string; servicesLink: string;
    processEyebrow: string; processH: string; processLede: string; steps: { h: string; p: string }[];
    workEyebrow: string; workH: string; workP: string; workChecks: string[]; workBtn: string;
    reviewsEyebrow: string; reviewsH: string; reviewsLink: string;
    areaEyebrow: string; areaH: string; areaP: string; areaBadge: string; areaLink: string;
  };
  services: Service[];
  servicesPage: { eyebrow: string; h1: string; lede: string; timelineLbl: string; rangeLbl: string; quoteBtn: string; faqEyebrow: string; faqH: string; faqLede: string; faq: { q: string; a: string }[]; ctaH: string; ctaP: string };
  about: {
    eyebrow: string; h1: string; lede: string; storyEyebrow: string; storyH: string; storyP: string[]; storyBadge: string;
    valuesEyebrow: string; valuesH: string; values: { h: string; p: string }[];
    licEyebrow: string; licH: string; licP: string; licChecks: string[];
    areaEyebrow: string; areaH: string; areaP: string; stats: { n: string; l: string }[]; ctaH: string; ctaP: string;
  };
  work: { eyebrow: string; h1: string; lede: string; filterLbl: string; filters: { v: string; l: string }[]; cells: GalleryCell[]; notice: string; ctaH: string; ctaP: string };
  reviews: { eyebrow: string; h1: string; lede: string; intro: string; items: Review[]; askEyebrow: string; askH: string; askP: string; google: string; angi: string; refEyebrow: string; refH: string; refP: string; refLink: string };
  contact: {
    eyebrow: string; h1: string; lede: string; formEyebrow: string; formH: string; formP: string;
    f: { name: string; phone: string; email: string; city: string; cityPh: string; service: string; timeline: string; select: string; message: string; messagePh: string; send: string; sending: string; note: string; ok: string; err: string; honeypot: string };
    serviceOptions: { v: string; l: string }[]; timelineOptions: string[];
    callH: string; callP: string; emailH: string; emailP: string; hoursH: string; hoursRows: [string, string][]; basedH: string; basedP: string;
    areaEyebrow: string; areaH: string; areaP: string; mapTitle: string;
  };
  thanks: { eyebrow: string; h1: string; lede: string; home: string; work: string };
  areas: string[];
  langSuggest: { msg: string; go: string; dismiss: string };
}

const AREAS_EN = ["Auburn", "Opelika", "Smiths Station", "Loachapoka", "Waverly", "Beauregard", "Notasulga", "Salem", "Cusseta", "Lee County"];
const AREAS_ES = ["Auburn", "Opelika", "Smiths Station", "Loachapoka", "Waverly", "Beauregard", "Notasulga", "Salem", "Cusseta", "Condado de Lee"];

const en: SiteContent = {
  nav: { home: "Home", services: "Services", about: "About", work: "Our Work", reviews: "Reviews", contact: "Contact" },
  ui: {
    freeQuote: "Get a Free Quote", quoteShort: "Free Quote", call: "Call", menu: "Menu", primaryNav: "Primary", quickActions: "Quick actions",
    langSwitch: "ES", langSwitchLong: "ES · Español", langTitle: "Leer en español", scroll: "Scroll", before: "Before", after: "After",
    dragToCompare: "Drag to compare before and after", readMore: "Read more reviews", skip: "Skip to content", rating: "5.0", ratingSources: "Google · Angi · HomeAdvisor", starsLabel: "5 out of 5 stars",
  },
  footer: {
    blurb: "Family-owned residential construction and remodeling based in Auburn, Alabama. Kitchens, baths, additions, whole-home remodels and the repairs in between.",
    badge: "Licensed & Insured · Alabama", services: "Services", company: "Company", contact: "Contact",
    hours: ["Mon–Fri 7:00am–6:00pm", "Sat 8:00am–2:00pm"], rights: "All rights reserved.", otherSite: "Sitio en español",
  },
  cta: { h: "Ready to start your project?", p: "Tell us what you have in mind. We come out, take a look, and send a clear, written estimate. No pressure, no surprises.", btn: "Get a Free Quote", word: "Let's Build" },
  meta: {
    home: { title: "Construction, Remodeling & Painting Contractor in Auburn, AL | Z Construction & Remodeling LLC", description: "Family-owned construction, remodeling and painting company in Auburn, AL. Home additions, kitchen and bath renovations, interior and exterior painting, cabinet refinishing and repairs for Auburn, Opelika and Lee County. Free written estimates." },
    services: { title: "Remodeling, Additions, Kitchen & Bath Renovation | Auburn, AL", description: "Home remodeling, home additions, kitchen and bathroom renovation, general contracting and repair services in Auburn and Opelika, AL. Licensed, insured and owner-operated." },
    about: { title: "About Us | Family-Owned Contractor in Auburn, AL", description: "Meet Z Construction & Remodeling, an owner-operated, family-owned residential contractor based in Auburn, Alabama and serving Opelika and Lee County. Licensed and insured." },
    work: { title: "Project Gallery: Before & After Remodels in Auburn & Opelika, AL", description: "Before and after photos of kitchen remodels, bathroom renovations, additions, decks and exterior work by Z Construction & Remodeling in Auburn and Opelika, Alabama." },
    reviews: { title: "Customer Reviews | Auburn & Opelika Homeowners", description: "Read reviews from Auburn and Opelika homeowners about Z Construction & Remodeling. Rated 5.0 for kitchen, bath, addition and repair work across Lee County." },
    contact: { title: "Get a Free Quote | Auburn, AL Remodeling Contractor", description: "Request a free written estimate from Z Construction & Remodeling in Auburn, AL. Call, text or send the form. Serving Auburn, Opelika and Lee County. Mon–Fri 7am–6pm." },
    thanks: { title: "Thanks", description: "We received your request and will follow up within one business day." },
  },
  home: {
    eyebrow: "Auburn, Alabama · Construction & Painting · Licensed & insured",
    h1: "Built with precision.", h1Accent: "Finished like art.",
    lede: "Z Construction & Remodeling is a family-owned construction and painting company in Auburn. Additions, kitchens, baths and whole-home remodels built plumb and square, then finished with premium paint by the same crew that built them.",
    primary: "Build Your Vision", secondary: "See Our Work",
    counters: [
      { value: 120, suffix: "+", label: "Projects completed", note: "Auburn · Opelika · Lee County" },
      { value: 48000, suffix: "+", label: "Square feet renovated", note: "Kitchens, baths, additions" },
      { value: 15, suffix: "+", label: "Years of trade experience", note: "On the tools, not behind a desk" },
      { value: 5, decimals: 1, suffix: "", label: "Customer rating", note: "Google · Angi · HomeAdvisor" },
    ],
    split: { eyebrow: "What we do", h: "We build it. Then we finish it.", lede: "Two crafts under one roof, so the crew that frames your addition is the crew that paints it. No hand-offs, no finger-pointing, one written price.",
      build: "Construction", buildSub: "Structure, layout, systems", finish: "Painting & Finishes", finishSub: "Surfaces, color, detail", link: "All services & details" },
    meta: ["Free written estimates", "Owner on every job", "5.0 customer rating", "Hablamos español"],
    marquee: ["Home Additions", "Kitchens & Baths", "Whole-Home Remodels", "Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Flooring", "Repairs & Punch Lists", "Auburn · Opelika · Lee County"],
    introEyebrow: "Why homeowners call us", introH: "A remodel is a big deal. We treat it that way.",
    introP: [
      "Most of the stress in a renovation comes from not knowing what happens next. So we tell you. You get a written scope and price before we start, one person who answers the phone, and a crew that shows up when we said we would.",
      "We're not the biggest outfit in Lee County and we don't want to be. We want to be the one your neighbors recommend.",
    ],
    introLink: "Meet the company",
    stats: [{ n: "5.0", l: "Customer rating" }, { n: "100%", l: "Owner-operated jobs" }, { n: "Free", l: "Written estimates" }, { n: "AL", l: "Licensed & insured" }],
    servicesEyebrow: "What we do", servicesH: "Residential construction, start to finish",
    servicesLede: "From a single bathroom to a full addition, every project gets the same crew, the same standards and the same phone number.", servicesLink: "All services & details",
    processEyebrow: "How it works", processH: "No surprises. That's the whole process.", processLede: "Four steps, clearly communicated, so you always know where your project stands.",
    steps: [
      { h: "Walkthrough", p: "We come to the house, listen to what you want, measure, and talk honestly about what's possible and what it costs." },
      { h: "Written estimate", p: "A clear scope, line-item pricing and a realistic timeline in writing. No vague \"we'll see\" numbers." },
      { h: "Build", p: "Permits pulled, trades scheduled, site kept clean. You get updates as the work happens, not after." },
      { h: "Final walkthrough", p: "We walk every inch with you, handle the punch list, and don't call it done until you do." },
    ],
    workEyebrow: "Recent work", workH: "Drag to see the difference",
    workP: "Real kitchens, baths, exteriors and decks across Auburn and Opelika. Slide the handle to compare where each project started and where it ended up.",
    workChecks: ["Cabinetry, counters and tile installed by people who do it every week", "Finishes that match the age and style of your house", "Clean job sites and dust control while you live in the home"],
    workBtn: "View the gallery",
    reviewsEyebrow: "Reviews", reviewsH: "What our customers say", reviewsLink: "Read more reviews",
    areaEyebrow: "Service area", areaH: "Local. Actually local.",
    areaP: "We live here, our kids go to school here, and we drive past our work every day. We serve Auburn, Opelika and the surrounding Lee County communities, including rental and game-day properties for out-of-town owners.",
    areaBadge: "Based in Auburn, AL", areaLink: "Check your address",
  },
  services: [
    { id: "remodeling", group: "build", name: "Home Remodeling", sub: "Whole-home and single-room remodels", blurb: "Whole-home and single-room remodels that respect the bones of the house.", photo: "kitchen3", alt: "Remodeled open-plan living area",
      para: "Whether it's opening up a wall between the kitchen and living room or updating an entire 1980s house, we plan remodels around how your family actually lives. We keep what's good about the house and fix what isn't.",
      items: ["Whole-home remodels", "Open-concept conversions", "Basement & bonus room finishing", "Trim, doors & built-ins", "Structural repairs", "Permits & inspections", "Rental turnover refreshes", "Design coordination"], timeline: "2–8 weeks", range: "From $10k" },
    { id: "additions", group: "build", name: "Home Additions", sub: "Room additions, sunrooms & garages", blurb: "Bedrooms, bonus rooms, sunrooms and garages that look like they were always there.", photo: "framing2", alt: "New home addition with wood framing and roof trusses",
      para: "An addition should look like it was part of the original plan. We match rooflines, siding, windows and trim so the new space blends in, and we handle the permits, engineering and inspections from start to finish.",
      items: ["Bedroom & bathroom additions", "Bonus rooms & second stories", "Sunrooms & screened porches", "Attached & detached garages", "In-law suites", "Foundations, framing & roofing", "Electrical & plumbing coordination", "Permits & inspections"], timeline: "6–16 weeks", range: "From $40k" },
    { id: "kitchensBaths", group: "build", name: "Kitchens & Baths", sub: "Layouts, cabinetry, tile, counters & plumbing", blurb: "The two rooms that sell a house, built with cabinetry, tile and plumbing done right the first time.", photo: "kitchen1", alt: "Renovated kitchen with white cabinets and a marble island",
      para: "Kitchens and bathrooms are where a house earns its keep, and where there's zero margin for error. We design for storage, workflow and light, then install cabinetry, countertops, tile, waterproofing and fixtures with the precision they deserve.",
      items: ["Full kitchen remodels", "Layout changes & islands", "Custom & semi-custom cabinetry", "Quartz, granite & butcher block", "Walk-in & curbless showers", "Tub-to-shower conversions", "Custom tile work", "Vanities, mirrors & lighting"], timeline: "2–6 weeks", range: "From $8k" },
    { id: "painting", group: "finish", name: "Interior & Exterior Painting", sub: "Prep-first painting with premium finishes", blurb: "Walls, ceilings, siding and trim, prepped like it matters and finished in premium paint.", photo: "paint1", alt: "Painter masking a window before painting a house exterior",
      para: "A great paint job is ninety percent preparation. We wash, scrape, sand, caulk and prime before a single finish coat goes on, then use premium Sherwin-Williams and Benjamin Moore products chosen for Alabama sun and humidity.",
      items: ["Interior walls, ceilings & trim", "Exterior siding, brick & stucco", "Pressure washing & prep", "Caulking, patching & priming", "Color consultation", "Accent walls & feature finishes", "Rental turnover repaints", "HOA-compliant exterior colors"], timeline: "2–7 days", range: "From $1,800" },
    { id: "finishing", group: "finish", name: "Cabinet & Trim Finishing", sub: "Sprayed cabinetry, doors and millwork", blurb: "Factory-smooth sprayed finishes on cabinets, doors and millwork, at a fraction of replacement cost.", photo: "kitchen2", alt: "Kitchen with freshly refinished white cabinetry",
      para: "Refinishing cabinets is the single highest-return update in a kitchen. We remove doors and drawers, degrease, sand, prime and spray a catalyzed enamel finish that looks and wears like factory paint.",
      items: ["Kitchen cabinet refinishing", "Bathroom vanity refinishing", "Interior doors & trim", "Staircases & railings", "Built-ins & mantels", "Hardware & soft-close upgrades", "Sprayed enamel finishes", "Stain & clear-coat work"], timeline: "3–7 days", range: "From $3,500" },
    { id: "repairs", group: "finish", name: "Flooring & Repairs", sub: "LVP, hardwood, drywall, decks & punch lists", blurb: "New floors, rot repair, drywall, doors and the punch list before you list or rent.", photo: "floor2", alt: "Installer laying luxury vinyl plank flooring",
      para: "Not every job needs a big crew. New LVP or hardwood, rotten trim, a sagging deck, a door that won't latch, drywall damage or a punch list before you list the house. We handle it with the same care as a full remodel.",
      items: ["LVP, hardwood & tile flooring", "Wood rot & siding repair", "Deck & porch repair", "Drywall & texture", "Door & window replacement", "Pre-sale punch lists", "Rental make-ready", "Storm & water damage"], timeline: "1–5 days", range: "From $350" },
  ],
  servicesPage: {
    eyebrow: "Services · Auburn & Opelika, AL", h1: "Residential construction & remodeling services",
    lede: "Kitchens, baths, additions, whole-home remodels and repairs. One crew, one point of contact, one written price.",
    timelineLbl: "Typical timeline", rangeLbl: "Typical range", quoteBtn: "Get a quote for this",
    faqEyebrow: "Pricing, honestly", faqH: "How we price a project", faqLede: "The ranges above are starting points for planning. Your written estimate is the real number, and it's the one we hold to.",
    faq: [
      { q: "Are estimates really free?", a: "Yes. We visit the home, measure, talk through options and send a written scope and price. There's no fee and no obligation." },
      { q: "What changes the price?", a: "Layout changes that move plumbing or walls, material choices (tile, counters, cabinetry) and the condition of what we uncover behind walls. We flag any of those before the work happens, never after." },
      { q: "Do you handle permits and inspections?", a: "Yes. For any project that requires them in Auburn, Opelika or Lee County, we pull the permits, schedule the inspections and meet the inspector." },
      { q: "Can you work around a rental lease cycle?", a: "We do a lot of turnover work for Auburn University-area rentals. Tell us the move-out and move-in dates and we'll schedule around them." },
      { q: "How do payments work?", a: "A deposit to schedule and order materials, progress payments at agreed milestones, and the balance after your final walkthrough. It's all spelled out in the estimate." },
    ],
    ctaH: "Not sure which service you need?", ctaP: "Describe the problem or the idea. We'll tell you what it takes, what it costs, and whether it's worth doing.",
  },
  about: {
    eyebrow: "About us · Family-owned in Auburn, AL", h1: "Built by a family, for families",
    lede: "We started Z Construction & Remodeling because homeowners around here deserve a contractor who answers the phone, shows up and finishes.",
    storyEyebrow: "Our story", storyH: "Owner-operated, on purpose",
    storyP: [
      "Z Construction & Remodeling is a family-owned company based in Auburn, Alabama. After years of hands-on trade experience working on other people's crews, we opened our own doors with a simple idea: the person who quotes your job should be the person who builds it.",
      "That's still how it works. The owner walks every project, sets every schedule and makes every phone call. Our crew is small, skilled and consistent, and our subcontractors are people we've worked beside for years.",
      "We're building this company the way we build houses: slowly, squarely and to last.",
    ],
    storyBadge: "Owner on every job",
    valuesEyebrow: "What we stand on", valuesH: "Four things we won't compromise",
    values: [
      { h: "Show up", p: "Be there when we said. Call if anything changes. Never leave you guessing." },
      { h: "Tell the truth", p: "If it doesn't need doing, we say so. If something's wrong behind a wall, you hear it first." },
      { h: "Build it right", p: "Plumb, level, square, waterproofed, to code. The parts you'll never see get the most attention." },
      { h: "Leave it clean", p: "Daily cleanup, dust barriers, respect for the house and the people living in it." },
    ],
    licEyebrow: "Licensed & insured", licH: "Protected, on paper",
    licP: "We carry general liability insurance and are licensed for residential work in the State of Alabama. Copies of our license and certificate of insurance are available on request, and we're glad to provide them before you sign anything.",
    licChecks: [`Alabama residential contractor license ${BRAND.license}`, "General liability insurance, certificate available on request", "Permits pulled in our name for permitted work", "Written estimates and contracts on every project"],
    areaEyebrow: "Service area", areaH: "Auburn, Opelika & Lee County",
    areaP: "We're headquartered in Auburn and work throughout Lee County. If you're within about 30 minutes of downtown Auburn, we'll come take a look.",
    stats: [{ n: "5.0", l: "Rating" }, { n: "LLC", l: "Est. Auburn, AL" }, { n: "1", l: "Point of contact" }, { n: "0", l: "Surprise invoices" }],
    ctaH: "Let's talk about your house.", ctaP: "A conversation and a walkthrough cost nothing. Reach out and we'll find a time that works.",
  },
  work: {
    eyebrow: "Our work · Auburn & Opelika", h1: "Before, after, and everything in between",
    lede: "Drag the sliders. Every project here is the kind of work we do every week for homeowners across Lee County.",
    filterLbl: "Filter projects",
    filters: [{ v: "all", l: "All" }, { v: "compare", l: "Before / After" }, { v: "kitchen", l: "Kitchens" }, { v: "bath", l: "Bathrooms" }, { v: "addition", l: "Additions" }, { v: "exterior", l: "Exterior" }, { v: "deck", l: "Decks" }, { v: "flooring", l: "Flooring" }],
    cells: [
      { kind: "compare", cat: "exterior", before: "houseWeathered", after: "houseWhite", altBefore: "Weathered wood-sided house before exterior renovation", altAfter: "White farmhouse exterior with black shutters after renovation", title: "Exterior refresh", meta: "Auburn · Siding, paint, trim" },
      { kind: "tall", cat: "kitchen", photo: "kitchen2", title: "Kitchen remodel", meta: "Auburn · Cabinets & counters" },
      { kind: "photo", cat: "bath", photo: "bath2", title: "Primary bath", meta: "Opelika · Tub & walk-in shower" },
      { kind: "photo", cat: "addition", photo: "framing1", title: "Second-story addition", meta: "Lee County · Framing" },
      { kind: "compare", cat: "kitchen", before: "roomRaw", after: "kitchen1", altBefore: "Kitchen space stripped to the subfloor before remodel", altAfter: "Finished kitchen with marble island and white cabinetry", title: "Full kitchen renovation", meta: "Auburn · Layout change & island" },
      { kind: "photo", cat: "deck", photo: "deck2", title: "Backyard deck", meta: "Auburn · Composite decking" },
      { kind: "wide", cat: "exterior", photo: "porch2", title: "Porch rebuild", meta: "Opelika · Columns, rails & paint" },
      { kind: "photo", cat: "flooring", photo: "floor2", title: "LVP flooring", meta: "Auburn · Rental turnover" },
      { kind: "compare", cat: "deck", before: "deck3", after: "deck1", altBefore: "Plain wooden deck before rebuild", altAfter: "Rebuilt deck with built-in bench seating", title: "Deck rebuild", meta: "Auburn · Rot repair to full rebuild" },
      { kind: "tall", cat: "bath", photo: "bath3", title: "Guest bath", meta: "Auburn · Freestanding tub" },
      { kind: "photo", cat: "kitchen", photo: "kitchen3", title: "Kitchen refresh", meta: "Opelika · Cabinet paint & backsplash" },
      { kind: "photo", cat: "addition", photo: "framing2", title: "Garage addition", meta: "Beauregard · Framing & roofing" },
      { kind: "wide", cat: "flooring", photo: "floor1", title: "Whole-home flooring", meta: "Auburn · Engineered hardwood" },
      { kind: "photo", cat: "exterior", photo: "paint1", title: "Exterior painting", meta: "Opelika · Prep & paint" },
      { kind: "photo", cat: "bath", photo: "bath1", title: "Walk-in shower", meta: "Auburn · Tile & glass" },
    ],
    notice: "Photos on this page are representative of our work. Want to see a project like yours in person? Ask us for local references.",
    ctaH: "Want your house on this page?", ctaP: "Send us a photo of the room and a sentence about what you'd like to change. We'll take it from there.",
  },
  reviews: {
    eyebrow: "Reviews · What our customers say", h1: "Rated 5.0 by the people we build for",
    lede: "Straight from homeowners in Auburn and Opelika. We ask every customer for an honest review when the job is done.",
    intro: "Reviews are the only marketing we really trust, which is why we ask for one on every job, good or bad.",
    /* TODO: replace with verbatim reviews from Google / Angi / HomeAdvisor. These are samples. */
    items: [
      { quote: "Our kitchen went from 1990s oak to something we actually want to show people. He walked us through every decision, showed up when he said he would, and the final bill matched the estimate.", name: "Amanda R.", meta: "Kitchen renovation · Auburn" },
      { quote: "We had new LVP flooring, cabinets painted and the whole interior repainted between tenants. Fast, clean, and the place rented in a week.", name: "Mark T.", meta: "Rental refresh · Opelika" },
      { quote: "Honest is the word. He told us what we didn't need to do, which saved us money, and then did the rest beautifully. Our bathroom is the best room in the house now.", name: "Denise & Carl W.", meta: "Bathroom remodel · Auburn" },
      { quote: "Rot repair on the back porch turned into a rebuilt deck we love. Communication was excellent from the first text to the final walkthrough.", name: "Jessica L.", meta: "Deck rebuild · Auburn" },
      { quote: "The addition matches the original house so well that people don't believe it's new. Permits, inspections, everything handled for us.", name: "The Pruitt Family", meta: "Home addition · Lee County" },
      { quote: "Small job, big care. Fixed doors, drywall and trim in one afternoon and left the place cleaner than he found it.", name: "Robert H.", meta: "Repairs · Opelika" },
    ],
    askEyebrow: "Worked with us?", askH: "Leave a review, it helps more than you know", askP: "A two-minute Google review is how the next family on your street finds us. Thank you.",
    google: "Review on Google", angi: "Review on Angi",
    refEyebrow: "References", refH: "Want to talk to a past customer?", refP: "We'll connect you with homeowners who've had similar work done. Just ask when you request your estimate.", refLink: "Request a quote",
  },
  contact: {
    eyebrow: "Contact · Free estimates in Auburn & Opelika", h1: "Get a free quote",
    lede: "Tell us about the project. We'll follow up within one business day to set a time to come out.",
    formEyebrow: "Request an estimate", formH: "Tell us what you're thinking", formP: "Every field marked required helps us give you a faster, more accurate answer.",
    f: { name: "Name", phone: "Phone", email: "Email", city: "Property city", cityPh: "Auburn, Opelika…", service: "Service", timeline: "Timeline", select: "Select one", message: "Tell us about the project", messagePh: "What room, what you'd like to change, anything we should know about the house.",
      send: "Send my request", sending: "Sending…", note: "We reply within one business day. Your info is never shared.",
      ok: "Thanks, we got it. Expect a call or email within one business day.", err: "Something went wrong sending the form. Please call or text us directly and we will take care of you.", honeypot: "Leave this empty" },
    serviceOptions: [{ v: "remodeling", l: "Home remodeling" }, { v: "additions", l: "Home addition" }, { v: "kitchensBaths", l: "Kitchen or bath" }, { v: "painting", l: "Interior / exterior painting" }, { v: "finishing", l: "Cabinet & trim finishing" }, { v: "repairs", l: "Flooring / repairs" }, { v: "other", l: "Something else" }],
    timelineOptions: ["As soon as possible", "Within 1–3 months", "3–6 months", "Just planning"],
    callH: "Call or text", callP: "Fastest way to reach us during business hours.", emailH: "Email", emailP: "For plans, photos and anything longer than a text.",
    hoursH: "Hours", hoursRows: [["Monday – Friday", "7:00am – 6:00pm"], ["Saturday", "8:00am – 2:00pm"], ["Sunday", "Closed"]],
    basedH: "Based in", basedP: "Serving Auburn, Opelika & Lee County",
    areaEyebrow: "Service area", areaH: "Where we work",
    areaP: "Auburn is home base. We take projects throughout Lee County and a few neighboring communities, generally within about 30 minutes of downtown Auburn. Not sure if you're in range? Ask, the answer is usually yes.",
    mapTitle: "Map of the Z Construction service area around Auburn, Alabama",
  },
  thanks: { eyebrow: "Request received", h1: "Thanks, we'll be in touch", lede: "We got your request and will follow up within one business day. If it's urgent, call or text us at", home: "Back to home", work: "See our work" },
  areas: AREAS_EN,
  langSuggest: { msg: "¿Prefiere leerlo en español?", go: "Ver en español", dismiss: "Cerrar" },
};

/* -------------------------------------------------------------------------
   ESPAÑOL — escrito directamente para la comunidad hispana de Auburn,
   Opelika y el condado de Lee. Trato de usted, tono de vecino que sabe
   de obra, sin traducciones literales ni frases de folleto.
   ------------------------------------------------------------------------- */
const es: SiteContent = {
  nav: { home: "Inicio", services: "Servicios", about: "Nosotros", work: "Proyectos", reviews: "Reseñas", contact: "Contacto" },
  ui: {
    freeQuote: "Pida su cotización gratis", quoteShort: "Cotización gratis", call: "Llamar", menu: "Menú", primaryNav: "Principal", quickActions: "Acciones rápidas",
    langSwitch: "EN", langSwitchLong: "EN · English", langTitle: "Read in English", scroll: "Baje", before: "Antes", after: "Después",
    dragToCompare: "Deslice para comparar el antes y el después", readMore: "Ver más reseñas", skip: "Ir al contenido", rating: "5.0", ratingSources: "Google · Angi · HomeAdvisor", starsLabel: "5 de 5 estrellas",
  },
  footer: {
    blurb: "Empresa familiar de construcción y remodelación de casas en Auburn, Alabama. Cocinas, baños, ampliaciones, remodelaciones completas y todas esas reparaciones que se van acumulando.",
    badge: "Con licencia y asegurados · Alabama", services: "Servicios", company: "Empresa", contact: "Contacto",
    hours: ["Lun–Vie 7:00am–6:00pm", "Sáb 8:00am–2:00pm"], rights: "Todos los derechos reservados.", otherSite: "Site in English",
  },
  cta: { h: "¿Tiene un proyecto en mente?", p: "Cuéntenos qué quiere hacer. Pasamos a su casa, revisamos con calma y le dejamos un presupuesto claro y por escrito. Sin compromiso, sin presión y sin sorpresas después.", btn: "Pida su cotización gratis", word: "Manos a la obra" },
  meta: {
    home: { title: "Contratista de remodelación y pintura en Auburn, AL | Hablamos español | Z Construction & Remodeling", description: "Empresa familiar de construcción, remodelación y pintura en Auburn, Alabama. Ampliaciones, cocinas, baños, pintura interior y exterior, gabinetes y reparaciones en Auburn, Opelika y el condado de Lee. Atención en español y presupuesto gratis por escrito." },
    services: { title: "Remodelación de cocinas, baños y ampliaciones en Auburn, AL | Z Construction", description: "Remodelación de casas, ampliaciones, cocinas, baños, contratista general y reparaciones en Auburn y Opelika, Alabama. Contratista con licencia y seguro. Lo atendemos en español." },
    about: { title: "Quiénes somos | Contratista familiar en Auburn, Alabama", description: "Z Construction & Remodeling es una empresa familiar de Auburn, Alabama. El dueño está en cada obra. Servimos a Opelika y todo el condado de Lee, con licencia y seguro." },
    work: { title: "Proyectos: antes y después de remodelaciones en Auburn y Opelika", description: "Fotos del antes y después de cocinas, baños, ampliaciones, terrazas y exteriores hechos por Z Construction & Remodeling en Auburn y Opelika, Alabama." },
    reviews: { title: "Reseñas de clientes | Familias de Auburn y Opelika", description: "Lo que dicen las familias de Auburn y Opelika sobre Z Construction & Remodeling. Calificación de 5.0 en cocinas, baños, ampliaciones y reparaciones." },
    contact: { title: "Cotización gratis | Contratista en Auburn, AL que habla español", description: "Pida su presupuesto gratis por escrito a Z Construction & Remodeling en Auburn, Alabama. Llame, mande un mensaje o llene el formulario. Atendemos Auburn, Opelika y el condado de Lee, en español." },
    thanks: { title: "Gracias", description: "Recibimos su solicitud. Le respondemos en un día hábil." },
  },
  home: {
    eyebrow: "Auburn, Alabama · Construcción y pintura · Hablamos español",
    h1: "Construido con precisión.", h1Accent: "Terminado con arte.",
    lede: "Somos una empresa familiar de construcción y pintura en Auburn. Ampliaciones, cocinas, baños y remodelaciones completas hechas a plomo y a escuadra, y terminadas con pintura de primera por la misma cuadrilla que las construyó. El dueño lo atiende en su idioma, de la cotización a la entrega.",
    primary: "Construyamos su visión", secondary: "Vea nuestro trabajo",
    counters: [
      { value: 120, suffix: "+", label: "Proyectos terminados", note: "Auburn · Opelika · Condado de Lee" },
      { value: 48000, suffix: "+", label: "Pies cuadrados renovados", note: "Cocinas, baños, ampliaciones" },
      { value: 15, suffix: "+", label: "Años de oficio", note: "En la obra, no detrás de un escritorio" },
      { value: 5, decimals: 1, suffix: "", label: "Calificación de clientes", note: "Google · Angi · HomeAdvisor" },
    ],
    split: { eyebrow: "Lo que hacemos", h: "Lo construimos. Y lo terminamos.", lede: "Dos oficios bajo el mismo techo: la cuadrilla que levanta su ampliación es la misma que la pinta. Sin intermediarios, sin echarse la culpa unos a otros y con un solo precio por escrito.",
      build: "Construcción", buildSub: "Estructura, distribución, instalaciones", finish: "Pintura y acabados", finishSub: "Superficies, color, detalle", link: "Todos los servicios" },
    meta: ["Presupuesto gratis y por escrito", "El dueño en cada obra", "Calificación de 5.0", "Atención en español"],
    marquee: ["Ampliaciones", "Cocinas y baños", "Remodelaciones completas", "Pintura interior", "Pintura exterior", "Gabinetes", "Pisos", "Reparaciones", "Auburn · Opelika · Condado de Lee"],
    introEyebrow: "Por qué nos llaman", introH: "Remodelar su casa es cosa seria. Nosotros la tomamos en serio.",
    introP: [
      "Lo que más desgasta en una obra no es el polvo, es no saber qué va a pasar. Por eso aquí se lo explicamos todo antes de empezar: qué se va a hacer, cuánto cuesta y cuánto tarda, por escrito y en español. Y cuando llame, le contesta la misma persona que estuvo en su casa.",
      "No pretendemos ser la empresa más grande del condado. Queremos ser la que usted le recomienda a su compadre, a su hermana y a su vecino.",
    ],
    introLink: "Conózcanos",
    stats: [{ n: "5.0", l: "Calificación" }, { n: "100%", l: "Obras con el dueño presente" }, { n: "Gratis", l: "Presupuesto por escrito" }, { n: "AL", l: "Licencia y seguro" }],
    servicesEyebrow: "Lo que hacemos", servicesH: "Construcción residencial, de principio a fin",
    servicesLede: "Desde un baño hasta una ampliación completa: la misma cuadrilla, el mismo cuidado y el mismo número de teléfono en cada proyecto.", servicesLink: "Ver todos los servicios",
    processEyebrow: "Así trabajamos", processH: "Sin sorpresas. Así de simple.", processLede: "Cuatro pasos, bien explicados, para que usted siempre sepa en qué va su obra.",
    steps: [
      { h: "Visita", p: "Vamos a su casa, escuchamos lo que quiere, medimos y le hablamos con franqueza de lo que se puede hacer y lo que cuesta." },
      { h: "Presupuesto por escrito", p: "Alcance claro, precios detallados y un calendario realista. Nada de \"luego vemos\" ni de letra chica." },
      { h: "La obra", p: "Permisos en regla, oficios coordinados y la casa limpia cada día. Le vamos avisando conforme avanza el trabajo, no al final." },
      { h: "Entrega", p: "Recorremos todo con usted, corregimos cualquier detalle y no damos la obra por terminada hasta que usted quede conforme." },
    ],
    workEyebrow: "Trabajo reciente", workH: "Deslice y vea la diferencia",
    workP: "Cocinas, baños, fachadas y terrazas reales de Auburn y Opelika. Mueva el control para comparar cómo empezó cada proyecto y cómo quedó.",
    workChecks: ["Gabinetes, cubiertas y azulejo instalados por gente que lo hace todas las semanas", "Acabados que van con la edad y el estilo de su casa", "Obra limpia y control de polvo mientras su familia sigue viviendo ahí"],
    workBtn: "Ver la galería",
    reviewsEyebrow: "Reseñas", reviewsH: "Lo que dicen nuestros clientes", reviewsLink: "Ver más reseñas",
    areaEyebrow: "Zona de servicio", areaH: "De aquí, de verdad.",
    areaP: "Vivimos aquí, nuestros hijos van a la escuela aquí y pasamos frente a nuestras obras todos los días. Atendemos Auburn, Opelika y las comunidades del condado de Lee, incluyendo casas de renta de dueños que viven en otra ciudad.",
    areaBadge: "Con sede en Auburn, AL", areaLink: "Vea si llegamos a su zona",
  },
  services: [
    { id: "remodeling", group: "build", name: "Remodelación de casas", sub: "Casa completa o una sola habitación", blurb: "Remodelaciones completas o de un solo espacio, respetando la estructura de la casa.", photo: "kitchen3", alt: "Sala remodelada con concepto abierto",
      para: "Ya sea tirar la pared entre la cocina y la sala o poner al día una casa entera de los años ochenta, planeamos la remodelación pensando en cómo vive su familia de verdad. Conservamos lo que la casa tiene de bueno y arreglamos lo que no.",
      items: ["Remodelación de casa completa", "Conversión a concepto abierto", "Acabado de sótanos y cuartos extra", "Molduras, puertas y muebles empotrados", "Reparaciones estructurales", "Permisos e inspecciones", "Renovación entre inquilinos", "Coordinación de diseño"], timeline: "2 a 8 semanas", range: "Desde $10,000" },
    { id: "additions", group: "build", name: "Ampliaciones", sub: "Cuartos, solarios y cocheras", blurb: "Cuartos, dormitorios, solarios y cocheras que parecen haber estado ahí desde siempre.", photo: "framing2", alt: "Ampliación en construcción con estructura de madera",
      para: "Una ampliación tiene que verse como parte del diseño original. Igualamos techos, fachada, ventanas y molduras para que el espacio nuevo se integre, y nosotros nos encargamos de permisos, ingeniería e inspecciones de principio a fin.",
      items: ["Dormitorios y baños adicionales", "Cuartos extra y segundos pisos", "Solarios y porches con mosquitero", "Cocheras adosadas e independientes", "Cuartos para los suegros o la familia", "Cimientos, estructura y techo", "Coordinación eléctrica y de plomería", "Permisos e inspecciones"], timeline: "6 a 16 semanas", range: "Desde $40,000" },
    { id: "kitchensBaths", group: "build", name: "Cocinas y baños", sub: "Distribución, gabinetes, azulejo, cubiertas y plomería", blurb: "Los dos espacios que más valor le dan a una casa, con gabinetes, azulejo y plomería bien hechos a la primera.", photo: "kitchen1", alt: "Cocina renovada con gabinetes blancos e isla de mármol",
      para: "La cocina y el baño son donde más se nota una buena remodelación, y donde no hay margen de error. Diseñamos pensando en espacio, orden y luz, y luego instalamos gabinetes, cubiertas, azulejo, impermeabilización y accesorios con la precisión que se merecen.",
      items: ["Remodelación completa de cocina", "Cambio de distribución e islas", "Gabinetes a la medida", "Cuarzo, granito y madera", "Regaderas a ras de piso", "Cambio de tina por regadera", "Azulejo a la medida", "Tocadores, espejos e iluminación"], timeline: "2 a 6 semanas", range: "Desde $8,000" },
    { id: "painting", group: "finish", name: "Pintura interior y exterior", sub: "Preparación a conciencia y pintura de primera", blurb: "Paredes, techos, fachadas y molduras, preparados como se debe y terminados con pintura de primera calidad.", photo: "paint1", alt: "Pintor cubriendo una ventana antes de pintar la fachada",
      para: "Un buen trabajo de pintura es noventa por ciento preparación. Lavamos, raspamos, lijamos, sellamos y aplicamos primario antes de dar la primera mano de acabado, y usamos productos Sherwin-Williams y Benjamin Moore pensados para el sol y la humedad de Alabama.",
      items: ["Paredes, techos y molduras interiores", "Fachadas de madera, ladrillo y estuco", "Lavado a presión y preparación", "Sellado, resane y primario", "Asesoría de color", "Paredes de acento y acabados especiales", "Repintado entre inquilinos", "Colores exteriores aprobados por la HOA"], timeline: "2 a 7 días", range: "Desde $1,800" },
    { id: "finishing", group: "finish", name: "Gabinetes y molduras", sub: "Gabinetes, puertas y carpintería a pistola", blurb: "Acabado a pistola, liso como de fábrica, en gabinetes, puertas y carpintería, por una fracción de lo que cuesta cambiarlos.", photo: "kitchen2", alt: "Cocina con gabinetes blancos recién pintados",
      para: "Renovar los gabinetes es la mejora que más valor regresa en una cocina. Quitamos puertas y cajones, desengrasamos, lijamos, aplicamos primario y pintamos a pistola con un esmalte catalizado que se ve y aguanta como pintura de fábrica.",
      items: ["Gabinetes de cocina", "Tocadores de baño", "Puertas y molduras interiores", "Escaleras y barandales", "Muebles empotrados y chimeneas", "Herrajes y cierre suave", "Esmalte a pistola", "Tinte y barniz"], timeline: "3 a 7 días", range: "Desde $3,500" },
    { id: "repairs", group: "finish", name: "Pisos y reparaciones", sub: "LVP, madera, tablaroca, terrazas y detalles", blurb: "Pisos nuevos, madera podrida, tablaroca, puertas y esa lista de detalles antes de vender o rentar.", photo: "floor2", alt: "Instalador colocando piso de vinilo de lujo",
      para: "No todo necesita una cuadrilla grande. Piso LVP o de madera, una moldura podrida, una terraza vencida, una puerta que no cierra, un golpe en la tablaroca o los detalles antes de vender o rentar la casa. Lo atendemos con la misma seriedad que una remodelación completa.",
      items: ["Pisos de LVP, madera y azulejo", "Madera podrida y fachada", "Terrazas y porches", "Tablaroca y textura", "Cambio de puertas y ventanas", "Detalles antes de vender", "Preparación de casas de renta", "Daños por tormenta y agua"], timeline: "1 a 5 días", range: "Desde $350" },
  ],
  servicesPage: {
    eyebrow: "Servicios · Auburn y Opelika, AL", h1: "Construcción y remodelación para su casa",
    lede: "Cocinas, baños, ampliaciones, remodelaciones completas y reparaciones. Una cuadrilla, un responsable y un precio por escrito.",
    timelineLbl: "Duración típica", rangeLbl: "Rango típico", quoteBtn: "Cotizar este servicio",
    faqEyebrow: "Precios, con franqueza", faqH: "Cómo cotizamos un proyecto", faqLede: "Los rangos de arriba son para que se dé una idea. Su presupuesto por escrito es el número real, y ese es el que respetamos.",
    faq: [
      { q: "¿De verdad la cotización es gratis?", a: "Sí. Vamos a su casa, medimos, platicamos las opciones y le mandamos el alcance y el precio por escrito. No cobramos la visita y no queda comprometido a nada." },
      { q: "¿Qué puede cambiar el precio?", a: "Cambios de distribución que muevan plomería o paredes, los materiales que elija (azulejo, cubiertas, gabinetes) y lo que encontremos detrás de las paredes. Cualquiera de esas cosas se la avisamos antes de hacerla, nunca después." },
      { q: "¿Ustedes sacan los permisos?", a: "Sí. Si el proyecto lo requiere en Auburn, Opelika o el condado de Lee, nosotros tramitamos los permisos, programamos las inspecciones y recibimos al inspector." },
      { q: "¿Pueden ajustarse a las fechas de renta?", a: "Hacemos mucho trabajo de cambio de inquilino en casas cerca de Auburn University. Díganos cuándo se va uno y cuándo entra el otro, y nos organizamos con esas fechas." },
      { q: "¿Cómo se paga?", a: "Un anticipo para programar la obra y pedir materiales, pagos por avance en las etapas acordadas y el resto después del recorrido final. Todo queda detallado en el presupuesto." },
    ],
    ctaH: "¿No sabe qué servicio necesita?", ctaP: "Descríbanos el problema o la idea. Le decimos qué se necesita, cuánto cuesta y, con toda honestidad, si vale la pena hacerlo.",
  },
  about: {
    eyebrow: "Nosotros · Empresa familiar de Auburn, AL", h1: "Una familia que construye para otras familias",
    lede: "Abrimos Z Construction & Remodeling porque las familias de esta zona merecen un contratista que conteste el teléfono, llegue a la hora y termine el trabajo.",
    storyEyebrow: "Nuestra historia", storyH: "El dueño en la obra, siempre",
    storyP: [
      "Z Construction & Remodeling es una empresa familiar con sede en Auburn, Alabama. Después de muchos años trabajando en cuadrillas de otros contratistas, abrimos la nuestra con una idea muy sencilla: la persona que le cotiza el trabajo debe ser la misma que lo construye.",
      "Así seguimos hasta hoy. El dueño recorre cada proyecto, arma cada calendario y hace cada llamada. La cuadrilla es chica, con oficio y siempre la misma, y los subcontratistas son gente con la que hemos trabajado hombro a hombro durante años.",
      "Sabemos lo que significa confiarle la casa a alguien. Por eso construimos esta empresa como construimos una casa: sin prisa, a escuadra y para que dure.",
    ],
    storyBadge: "El dueño en cada obra",
    valuesEyebrow: "Nuestros principios", valuesH: "Cuatro cosas que no negociamos",
    values: [
      { h: "Cumplir", p: "Llegar cuando dijimos. Avisar si algo cambia. Nunca dejarlo esperando sin explicación." },
      { h: "Hablar claro", p: "Si algo no hace falta, se lo decimos. Si aparece un problema detrás de una pared, usted es el primero en saberlo." },
      { h: "Hacerlo bien", p: "A plomo, a nivel, a escuadra, impermeabilizado y conforme al código. Lo que no se ve es lo que más cuidamos." },
      { h: "Dejar limpio", p: "Limpieza diaria, barreras contra el polvo y respeto por su casa y por la familia que vive en ella." },
    ],
    licEyebrow: "Licencia y seguro", licH: "Todo en regla, por escrito",
    licP: "Contamos con seguro de responsabilidad civil y con licencia para trabajo residencial en el estado de Alabama. Si quiere ver la licencia y el certificado de seguro antes de firmar cualquier cosa, con gusto se los entregamos. Es lo correcto.",
    licChecks: [`Licencia de contratista residencial de Alabama ${BRAND.license}`, "Seguro de responsabilidad civil, certificado disponible a solicitud", "Permisos tramitados a nuestro nombre", "Presupuesto y contrato por escrito en cada proyecto"],
    areaEyebrow: "Zona de servicio", areaH: "Auburn, Opelika y el condado de Lee",
    areaP: "Nuestra base está en Auburn y trabajamos en todo el condado de Lee. Si está a unos 30 minutos del centro de Auburn, pasamos a ver su proyecto.",
    stats: [{ n: "5.0", l: "Calificación" }, { n: "LLC", l: "Con sede en Auburn, AL" }, { n: "1", l: "Solo responsable" }, { n: "0", l: "Cobros sorpresa" }],
    ctaH: "Hablemos de su casa.", ctaP: "Platicar y hacer la visita no cuesta nada. Escríbanos y buscamos un horario que le acomode.",
  },
  work: {
    eyebrow: "Proyectos · Auburn y Opelika", h1: "El antes, el después y todo lo de en medio",
    lede: "Mueva los controles. Cada proyecto de esta página es el tipo de trabajo que hacemos cada semana para familias del condado de Lee.",
    filterLbl: "Filtrar proyectos",
    filters: [{ v: "all", l: "Todo" }, { v: "compare", l: "Antes / Después" }, { v: "kitchen", l: "Cocinas" }, { v: "bath", l: "Baños" }, { v: "addition", l: "Ampliaciones" }, { v: "exterior", l: "Fachadas" }, { v: "deck", l: "Terrazas" }, { v: "flooring", l: "Pisos" }],
    cells: [
      { kind: "compare", cat: "exterior", before: "houseWeathered", after: "houseWhite", altBefore: "Casa con madera desgastada antes de renovar la fachada", altAfter: "Fachada blanca con persianas negras ya renovada", title: "Fachada renovada", meta: "Auburn · Fachada, pintura y molduras" },
      { kind: "tall", cat: "kitchen", photo: "kitchen2", title: "Remodelación de cocina", meta: "Auburn · Gabinetes y cubiertas" },
      { kind: "photo", cat: "bath", photo: "bath2", title: "Baño principal", meta: "Opelika · Tina y regadera" },
      { kind: "photo", cat: "addition", photo: "framing1", title: "Segundo piso", meta: "Condado de Lee · Estructura" },
      { kind: "compare", cat: "kitchen", before: "roomRaw", after: "kitchen1", altBefore: "Cocina desmantelada hasta el subpiso antes de la obra", altAfter: "Cocina terminada con isla de mármol y gabinetes blancos", title: "Cocina completa", meta: "Auburn · Nueva distribución e isla" },
      { kind: "photo", cat: "deck", photo: "deck2", title: "Terraza trasera", meta: "Auburn · Deck de material compuesto" },
      { kind: "wide", cat: "exterior", photo: "porch2", title: "Porche reconstruido", meta: "Opelika · Columnas, barandal y pintura" },
      { kind: "photo", cat: "flooring", photo: "floor2", title: "Piso LVP", meta: "Auburn · Cambio de inquilino" },
      { kind: "compare", cat: "deck", before: "deck3", after: "deck1", altBefore: "Terraza sencilla antes de reconstruirla", altAfter: "Terraza reconstruida con banca integrada", title: "Terraza nueva", meta: "Auburn · De reparar a reconstruir" },
      { kind: "tall", cat: "bath", photo: "bath3", title: "Baño de visitas", meta: "Auburn · Tina independiente" },
      { kind: "photo", cat: "kitchen", photo: "kitchen3", title: "Cocina renovada", meta: "Opelika · Gabinetes pintados y salpicadero" },
      { kind: "photo", cat: "addition", photo: "framing2", title: "Cochera nueva", meta: "Beauregard · Estructura y techo" },
      { kind: "wide", cat: "flooring", photo: "floor1", title: "Pisos en toda la casa", meta: "Auburn · Madera de ingeniería" },
      { kind: "photo", cat: "exterior", photo: "paint1", title: "Pintura exterior", meta: "Opelika · Preparación y pintura" },
      { kind: "photo", cat: "bath", photo: "bath1", title: "Regadera a ras de piso", meta: "Auburn · Azulejo y cristal" },
    ],
    notice: "Las fotos de esta página muestran el tipo de trabajo que hacemos. ¿Quiere ver en persona un proyecto parecido al suyo? Pídanos referencias de clientes de la zona.",
    ctaH: "¿Quiere ver su casa en esta página?", ctaP: "Mándenos una foto del espacio y una frase de lo que quiere cambiar. Nosotros nos encargamos del resto.",
  },
  reviews: {
    eyebrow: "Reseñas · Lo que dicen nuestros clientes", h1: "Las familias nos califican con 5.0",
    lede: "Opiniones directas de dueños de casa en Auburn y Opelika. Al terminar cada trabajo le pedimos al cliente una reseña honesta.",
    intro: "Las reseñas son la única publicidad en la que de verdad confiamos. Por eso pedimos una en cada trabajo, salga bien o salga mal.",
    /* TODO: sustituir por reseñas reales tal cual aparecen en Google / Angi / HomeAdvisor. Estas son muestras. */
    items: [
      { quote: "Nuestra cocina pasó de los gabinetes de roble de los noventa a algo que ahora sí nos gusta enseñar. Nos explicó cada decisión, llegó cuando dijo y la cuenta final fue la misma del presupuesto.", name: "Amanda R.", meta: "Cocina · Auburn" },
      { quote: "Piso LVP nuevo, gabinetes pintados y todo el interior repintado entre un inquilino y otro. Rápido, limpio, y la casa se rentó en una semana.", name: "Mark T.", meta: "Casa de renta · Opelika" },
      { quote: "Honesto, esa es la palabra. Nos dijo qué no hacía falta hacer, con eso ahorramos, y lo demás lo hizo precioso. El baño quedó como el mejor cuarto de la casa.", name: "Denise y Carl W.", meta: "Baño · Auburn" },
      { quote: "Empezamos con una reparación de madera podrida en el porche y terminamos con una terraza nueva que nos encanta. La comunicación fue excelente desde el primer mensaje hasta el recorrido final.", name: "Jessica L.", meta: "Terraza · Auburn" },
      { quote: "La ampliación combina tan bien con la casa original que la gente no cree que sea nueva. Permisos, inspecciones, todo lo resolvieron ellos.", name: "Familia Pruitt", meta: "Ampliación · Condado de Lee" },
      { quote: "Trabajo chico, pero con mucho cuidado. Arregló puertas, tablaroca y molduras en una tarde y dejó la casa más limpia de como la encontró.", name: "Robert H.", meta: "Reparaciones · Opelika" },
    ],
    askEyebrow: "¿Ya trabajó con nosotros?", askH: "Déjenos una reseña. Ayuda más de lo que se imagina.", askP: "Dos minutos en Google son la forma en que la siguiente familia de su calle nos encuentra. Muchas gracias.",
    google: "Reseña en Google", angi: "Reseña en Angi",
    refEyebrow: "Referencias", refH: "¿Quiere hablar con un cliente nuestro?", refP: "Lo ponemos en contacto con familias que ya hicieron un trabajo parecido al suyo. Solo pídalo cuando solicite su cotización.", refLink: "Pedir cotización",
  },
  contact: {
    eyebrow: "Contacto · Cotización gratis en Auburn y Opelika", h1: "Pida su cotización gratis",
    lede: "Cuéntenos de su proyecto. En un día hábil le llamamos para ponernos de acuerdo y pasar a su casa. Lo atendemos en español.",
    formEyebrow: "Solicite su presupuesto", formH: "Cuéntenos qué tiene en mente", formP: "Con estos datos le damos una respuesta más rápida y más precisa.",
    f: { name: "Nombre", phone: "Teléfono", email: "Correo electrónico", city: "Ciudad de la propiedad", cityPh: "Auburn, Opelika…", service: "Servicio", timeline: "¿Para cuándo?", select: "Elija una opción", message: "Cuéntenos del proyecto", messagePh: "Qué espacio, qué le gustaría cambiar y cualquier detalle de la casa que debamos saber.",
      send: "Enviar solicitud", sending: "Enviando…", note: "Le respondemos en un día hábil. Sus datos no se comparten con nadie.",
      ok: "Listo, recibimos su solicitud. Espere nuestra llamada o correo en un día hábil.", err: "Hubo un problema al enviar el formulario. Llámenos o mándenos un mensaje y con gusto lo atendemos.", honeypot: "Deje este campo vacío" },
    serviceOptions: [{ v: "remodeling", l: "Remodelación de casa" }, { v: "additions", l: "Ampliación" }, { v: "kitchensBaths", l: "Cocina o baño" }, { v: "painting", l: "Pintura interior / exterior" }, { v: "finishing", l: "Gabinetes y molduras" }, { v: "repairs", l: "Pisos / reparaciones" }, { v: "other", l: "Otra cosa" }],
    timelineOptions: ["Lo antes posible", "En 1 a 3 meses", "En 3 a 6 meses", "Apenas estoy planeando"],
    callH: "Llame o mande mensaje", callP: "La forma más rápida de encontrarnos en horario de trabajo.", emailH: "Correo", emailP: "Para planos, fotos y todo lo que no cabe en un mensaje de texto.",
    hoursH: "Horario", hoursRows: [["Lunes a viernes", "7:00am – 6:00pm"], ["Sábado", "8:00am – 2:00pm"], ["Domingo", "Cerrado"]],
    basedH: "Sede", basedP: "Atendemos Auburn, Opelika y el condado de Lee",
    areaEyebrow: "Zona de servicio", areaH: "Dónde trabajamos",
    areaP: "Auburn es nuestra base. Tomamos proyectos en todo el condado de Lee y en algunas comunidades vecinas, por lo general a unos 30 minutos del centro de Auburn. ¿No sabe si llegamos a su zona? Pregunte; casi siempre la respuesta es sí.",
    mapTitle: "Mapa de la zona de servicio de Z Construction alrededor de Auburn, Alabama",
  },
  thanks: { eyebrow: "Solicitud recibida", h1: "Gracias, en breve le llamamos", lede: "Recibimos su solicitud y le respondemos en un día hábil. Si es algo urgente, llámenos o mándenos un mensaje al", home: "Volver al inicio", work: "Ver proyectos" },
  areas: AREAS_ES,
  langSuggest: { msg: "Prefer to read this in English?", go: "View in English", dismiss: "Dismiss" },
};

export const CONTENT: Record<Locale, SiteContent> = { en, es };
