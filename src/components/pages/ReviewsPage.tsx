import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Arrow, Stars } from "@/components/Icons";
import { Reveal, Stagger, Item } from "@/components/motion";
import { BRAND, CONTENT } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";

export default function ReviewsPage({ locale }: { locale: Locale }) {
  const c = CONTENT[locale]; const r = c.reviews;
  return (
    <>
      <PageHero photoKey="porch3" alt={r.h1} eyebrow={r.eyebrow} h1={r.h1} lede={r.lede} />
      <section className="sec bg-bone" data-tone="light">
        <div className="shell">
          <div className="grid gap-4 items-end mb-10 md:mb-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-gutter">
            <Reveal><span className="inline-flex items-center gap-3 rounded-full border border-hairline bg-bone pl-3.5 pr-4 py-2.5"><Stars label={c.ui.starsLabel} /><strong className="font-display text-2xl leading-none">{c.ui.rating}</strong><span className="slate text-muted">{c.ui.ratingSources}</span></span></Reveal>
            <Reveal delay={0.1}><p className="lede text-muted lg:justify-self-end">{r.intro}</p></Reveal>
          </div>
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {r.items.map((x) => (
              <Item key={x.name} className="flex flex-col gap-4 rounded-card border border-hairline bg-bone p-7 pb-6">
                <Stars label={c.ui.starsLabel} />
                <blockquote className="flex-1 leading-[1.55] before:content-['\201C'] before:font-display before:text-5xl before:leading-[0] before:align-[-.35em] before:text-amber before:mr-1">{x.quote}</blockquote>
                <cite className="not-italic"><b className="block d text-step-1 leading-none tracking-[.02em] text-navy">{x.name}</b><span className="font-mono text-[.74rem] tracking-[.12em] uppercase text-muted">{x.meta}</span></cite>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="sec bg-navy text-bone" data-tone="dark">
        <div className="shell grid gap-10 md:grid-cols-2 md:gap-gutter">
          <Reveal>
            <span className="eyebrow text-amber mb-4">{r.askEyebrow}</span><h2 className="d h-md">{r.askH}</h2>
            <p className="mt-4 max-w-[58ch] text-muted-d">{r.askP}</p>
            <div className="flex flex-wrap gap-3 mt-6"><a className="btn btn--solid" href={BRAND.googleReviewUrl} rel="noopener" target="_blank">{r.google} <Arrow /></a><a className="btn btn--ghost" href={BRAND.angiUrl} rel="noopener" target="_blank">{r.angi}</a></div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow text-amber mb-4">{r.refEyebrow}</span><h2 className="d h-md">{r.refH}</h2>
            <p className="mt-4 max-w-[58ch] text-muted-d">{r.refP}</p>
            <Link className="text-link text-bone mt-6" href={href(locale, "contact")}>{r.refLink} <Arrow /></Link>
          </Reveal>
        </div>
      </section>
      <CtaBand locale={locale} h={c.cta.h} p={c.cta.p} btn={c.cta.btn} word={c.cta.word} />
    </>
  );
}
