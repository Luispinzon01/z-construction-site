import Link from "next/link";
import Photo from "@/components/Photo";
import { Arrow } from "@/components/Icons";
import { SplitWords, Reveal } from "@/components/motion";
import { BRAND, CONTENT } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";

export default function ThanksPage({ locale }: { locale: Locale }) {
  const c = CONTENT[locale]; const t = c.thanks;
  return (
    <section className="relative isolate flex items-end min-h-[min(72svh,720px)] overflow-clip bg-navy-2 text-bone" data-tone="dark">
      <div className="absolute inset-0 -z-30"><Photo k="porch1" alt={t.h1} sizes="100vw" priority /></div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(15,26,46,.42),rgba(15,26,46,.94))]" />
      <div className="shell relative grid gap-4 pt-[calc(var(--barh)+5rem)] pb-16">
        <span className="eyebrow self-start rounded-md bg-navy-2/60 px-3 py-1.5 text-amber-bright">{t.eyebrow}</span>
        <SplitWords as="h1" text={t.h1} className="d d-lg max-w-[16ch]" />
        <Reveal delay={0.4}><p className="lede text-bone/95">{t.lede} <a className="text-amber" href={`tel:${BRAND.tel}`}>{BRAND.phone}</a>.</p></Reveal>
        <Reveal delay={0.5} className="flex flex-wrap gap-3 mt-2"><Link className="btn btn--solid" href={href(locale, "home")}>{t.home} <Arrow /></Link><Link className="btn btn--ghost" href={href(locale, "work")}>{t.work}</Link></Reveal>
      </div>
    </section>
  );
}
