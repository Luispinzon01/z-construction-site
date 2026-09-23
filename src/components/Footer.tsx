import Link from "next/link";
import { Mark, Phone, Arrow } from "./Icons";
import { BRAND, CONTENT } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const c = CONTENT[locale];
  const other: Locale = locale === "en" ? "es" : "en";
  const H = ({ children }: { children: React.ReactNode }) => <h4 className="font-mono font-normal text-[.74rem] tracking-[.24em] uppercase text-bone/60 mb-4">{children}</h4>;
  return (
    <>
      <footer className="bg-navy-2 text-muted-d border-t border-hairline-d pt-14 md:pt-24 pb-8" data-tone="dark">
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.1fr] md:gap-gutter">
            <div>
              <Link className="flex items-center gap-2.5 text-bone no-underline mb-4" href={href(locale, "home")}>
                <Mark className="w-10 h-10" />
                <span className="font-display font-extrabold uppercase tracking-[.02em] text-[1.15rem] leading-none">Z Construction<small className="block font-mono font-normal text-[.58rem] tracking-[.18em] text-bone/60 mt-[3px]">&amp; Remodeling LLC</small></span>
              </Link>
              <p className="max-w-[40ch] text-step--1">{c.footer.blurb}</p>
              <span className="inline-flex items-center gap-2 mt-4 rounded-full border border-hairline-d px-3 py-1.5 font-mono text-[.72rem] tracking-[.12em] uppercase text-bone before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-amber">{c.footer.badge}</span>
            </div>
            <div><H>{c.footer.services}</H><ul className="grid gap-2">{c.services.map((s) => <li key={s.id}><Link className="text-bone hover:text-amber no-underline" href={href(locale, "services", s.id)}>{s.name}</Link></li>)}</ul></div>
            <div><H>{c.footer.company}</H><ul className="grid gap-2">
              {(["about", "work", "reviews", "contact"] as const).map((k) => <li key={k}><Link className="text-bone hover:text-amber no-underline" href={href(locale, k)}>{c.nav[k]}</Link></li>)}
              <li><a className="text-bone hover:text-amber no-underline" href={href(other, "home")} hrefLang={other} lang={other}>{c.footer.otherSite}</a></li>
            </ul></div>
            <div><H>{c.footer.contact}</H><ul className="grid gap-2">
              <li><a className="text-bone hover:text-amber no-underline" href={`tel:${BRAND.tel}`}>{BRAND.phone}</a></li>
              <li><a className="text-bone hover:text-amber no-underline break-all" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              <li>{BRAND.city}, {BRAND.region} {BRAND.zip}</li>
              <li>{c.footer.hours[0]}<br />{c.footer.hours[1]}</li>
            </ul></div>
          </div>
          <div className="mt-12 pt-6 border-t border-hairline-d flex flex-wrap justify-between gap-x-8 gap-y-2 font-mono text-[.72rem] tracking-[.1em] uppercase text-bone/60">
            <span>© {new Date().getFullYear()} {BRAND.name}. {c.footer.rights}</span><span>Auburn · Opelika · Lee County, Alabama</span>
          </div>
        </div>
      </footer>
      {/* sticky phone-width call bar */}
      <div className="fixed left-3 right-3 bottom-3 z-[900] grid grid-cols-2 gap-1.5 p-1.5 rounded-full bg-navy-2/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] lg:hidden" aria-label={c.ui.quickActions}>
        <a href={`tel:${BRAND.tel}`} className="h-[46px] rounded-full inline-flex items-center justify-center gap-2 no-underline font-display uppercase font-bold tracking-[.06em] text-bone border border-hairline-d-strong"><Phone className="w-4 h-4" /> {c.ui.call}</a>
        <Link href={href(locale, "contact")} className="h-[46px] rounded-full inline-flex items-center justify-center gap-2 no-underline font-display uppercase font-bold tracking-[.06em] bg-amber text-navy-2">{c.ui.quoteShort} <Arrow className="w-4 h-4" /></Link>
      </div>
    </>
  );
}
