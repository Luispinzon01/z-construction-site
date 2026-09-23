import Link from "next/link";
import Background3D from "@/components/three/Background3D";
import BlueprintHud from "@/components/BlueprintHud";
import Photo from "@/components/Photo";
import Marquee from "@/components/Marquee";
import Compare from "@/components/Compare";
import CtaBand from "@/components/CtaBand";
import SectionHead from "@/components/SectionHead";
import { Arrow, Check, Stars } from "@/components/Icons";
import { Reveal, Stagger, Item, SplitWords, Counter, Magnetic } from "@/components/motion";
import { CONTENT, type Service } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";

function ServiceCard({ s, i, locale }: { s: Service; i: number; locale: Locale }) {
  return (
    <Item>
      <Link href={href(locale, "services", s.id)} className="svc group relative block overflow-hidden rounded-card border border-hairline-d bg-void/75 text-bone no-underline transition-colors hover:border-hairline-d-strong">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Photo k={s.photo} alt={s.alt} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,26,46,.85))]" />
          <span className="absolute top-4 left-5 font-mono text-[.78rem] tracking-[.14em] text-amber-bright [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">0{i + 1}</span>
          <span className="svc__arrow absolute top-3.5 right-3.5 w-10 h-10 rounded-full border border-hairline-d-strong grid place-items-center"><Arrow className="w-4 h-4" /></span>
        </div>
        <div className="p-5 pb-6">
          <h3 className="d text-step-2 leading-[.95] mb-2">{s.name}</h3>
          <p className="text-step--1 text-muted-d max-w-[38ch]">{s.blurb}</p>
        </div>
      </Link>
    </Item>
  );
}

export default function HomePage({ locale }: { locale: Locale }) {
  const c = CONTENT[locale];
  const h = c.home;
  const build = c.services.filter((s) => s.group === "build");
  const finish = c.services.filter((s) => s.group === "finish");

  return (
    <>
      {/* ---- canvas zone: hero + stats + services share the WebGL background ---- */}
      <div id="canvas-zone" className="relative text-bone">
        <Background3D zoneId="canvas-zone" />

        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-end" data-tone="dark">
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(10,17,32,.35),rgba(10,17,32,.15)_35%,rgba(10,17,32,.8)_100%)]" />
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(90deg,rgba(10,17,32,.8)_0%,rgba(10,17,32,.55)_45%,rgba(10,17,32,.1)_100%)]" />
          <BlueprintHud />
          <div className="shell relative grid gap-4 pt-[calc(var(--barh)+5rem)] pb-24 sm:pb-16 md:pb-20">
            <Reveal><span className="eyebrow self-start rounded-md bg-navy-2/60 px-3 py-1.5 text-amber-bright">{h.eyebrow}</span></Reveal>
            <h1 className="d d-xl max-w-[13ch]">
              <SplitWords text={h.h1} className="block" delay={0.1} />
              <SplitWords text={h.h1Accent} className="block text-amber" delay={0.45} />
            </h1>
            <Reveal delay={0.7}><p className="lede text-bone/95">{h.lede}</p></Reveal>
            <Reveal delay={0.85} className="flex flex-wrap gap-3 mt-2">
              <Magnetic><Link className="btn btn--solid" href={href(locale, "contact")}>{h.primary} <Arrow /></Link></Magnetic>
              <Link className="btn btn--ghost" href={href(locale, "work")}>{h.secondary}</Link>
            </Reveal>
            <Stagger delay={1} className="flex flex-wrap gap-x-7 gap-y-2.5 mt-6 pt-5 border-t border-hairline-d-strong slate text-bone">
              {h.meta.map((m) => <Item key={m} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber" /> {m}</Item>)}
            </Stagger>
          </div>
          <div className="scrollcue absolute right-gutter bottom-8 hidden lg:flex items-center gap-3 font-mono text-[.68rem] tracking-[.18em] uppercase text-bone/70 [writing-mode:vertical-rl]" aria-hidden="true"><i />{c.ui.scroll}</div>
        </section>

        {/* STATS */}
        <section className="relative py-16 md:py-24" data-tone="dark">
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(10,17,32,.55),rgba(10,17,32,.35))]" />
          <div className="shell relative">
            <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline-d border border-hairline-d rounded-card overflow-hidden">
              {h.counters.map((k) => (
                <Item key={k.label} className="bg-void/70 p-6 md:p-8">
                  <strong className="block d text-step-4 leading-[.9] text-bone"><Counter value={k.value} suffix={k.suffix} decimals={k.decimals} /></strong>
                  <span className="block mt-3 font-display uppercase text-step-1 leading-none text-amber-bright">{k.label}</span>
                  <span className="block mt-2 slate text-bone/70">{k.note}</span>
                </Item>
              ))}
            </Stagger>
          </div>
        </section>

        {/* SERVICES SPLIT */}
        <section id="services" className="relative pb-20 md:pb-32 pt-6" data-tone="dark">
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(10,17,32,.2),rgba(10,17,32,.7)_25%,rgba(10,17,32,.95)_100%)]" />
          <div className="shell relative">
            <SectionHead dark eyebrow={h.split.eyebrow} h={h.split.h} lede={h.split.lede} />
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              {[{ label: h.split.build, sub: h.split.buildSub, list: build, n: "01" }, { label: h.split.finish, sub: h.split.finishSub, list: finish, n: "02" }].map((g) => (
                <div key={g.n}>
                  <Reveal className="flex items-baseline gap-4 pb-4 mb-5 border-b border-hairline-d-strong">
                    <span className="font-mono text-[.78rem] tracking-[.14em] text-amber">{g.n}</span>
                    <h3 className="d text-step-2 leading-none">{g.label}</h3>
                    <span className="slate text-bone/60 ml-auto hidden sm:inline">{g.sub}</span>
                  </Reveal>
                  <Stagger className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {g.list.map((s, i) => <ServiceCard key={s.id} s={s} i={g.n === "01" ? i : i + 3} locale={locale} />)}
                  </Stagger>
                </div>
              ))}
            </div>
            <Reveal className="mt-10"><Link className="text-link text-bone" href={href(locale, "services")}>{h.split.link} <Arrow /></Link></Reveal>
          </div>
        </section>
      </div>

      <Marquee items={h.marquee} />

      {/* INTRO */}
      <section className="sec bg-bone" data-tone="light">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-gutter lg:items-start">
          <Reveal><span className="eyebrow text-amber-deep mb-4">{h.introEyebrow}</span><h2 className="d h-md text-navy">{h.introH}</h2></Reveal>
          <Reveal delay={0.1} className="max-w-[58ch] text-muted grid gap-4">
            {h.introP.map((p) => <p key={p}>{p}</p>)}
            <Link className="text-link text-navy mt-1" href={href(locale, "about")}>{h.introLink} <Arrow /></Link>
          </Reveal>
        </div>
        <div className="shell mt-8">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
            {h.stats.map((s) => <Item key={s.l} className="bg-bone p-5"><strong className="block d text-step-3 leading-[.95] text-navy">{s.n}</strong><span className="block mt-2 font-mono text-[.76rem] tracking-[.12em] uppercase text-muted">{s.l}</span></Item>)}
          </Stagger>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec bg-bone-2" data-tone="light">
        <div className="shell">
          <SectionHead eyebrow={h.processEyebrow} h={h.processH} lede={h.processLede} />
          <Stagger className="grid gap-px bg-hairline border-y border-hairline md:grid-cols-2 xl:grid-cols-4">
            {h.steps.map((s, i) => (
              <Item key={s.h} className="bg-bone-2 p-7 pb-8">
                <span className="block font-mono text-[.8rem] tracking-[.14em] text-amber-deep mb-6">0{i + 1}</span>
                <h3 className="d text-step-2 leading-[.95] text-navy mb-2">{s.h}</h3>
                <p className="text-step--1 text-muted">{s.p}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* WORK / COMPARE */}
      <section className="sec bg-bone" data-tone="light">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:gap-[calc(var(--spacing-gutter)*1.5)] lg:items-center">
          <Reveal className="lg:order-2">
            <span className="eyebrow text-amber-deep mb-4">{h.workEyebrow}</span>
            <h2 className="d h-md text-navy">{h.workH}</h2>
            <p className="mt-4 max-w-[58ch] text-muted">{h.workP}</p>
            <ul className="grid gap-3 my-6">{h.workChecks.map((x) => <li key={x} className="flex gap-3 items-start"><Check className="w-5 h-5 shrink-0 mt-[.2em] text-amber-deep" /><span>{x}</span></li>)}</ul>
            <Link className="btn btn--ink" href={href(locale, "work")}>{h.workBtn} <Arrow /></Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <Compare before="roomRaw" after="kitchen1" altBefore={c.work.cells[4].altBefore!} altAfter={c.work.cells[4].altAfter!} labels={[c.ui.before, c.ui.after]} ariaLabel={c.ui.dragToCompare} />
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="sec bg-navy-2 text-bone" data-tone="dark">
        <div className="shell">
          <SectionHead dark eyebrow={h.reviewsEyebrow} h={h.reviewsH} right={
            <span className="inline-flex items-center gap-3 rounded-full border border-hairline-d bg-bone/5 pl-3.5 pr-4 py-2.5"><Stars label={c.ui.starsLabel} /><strong className="font-display text-2xl leading-none">{c.ui.rating}</strong><span className="slate text-muted-d">{c.ui.ratingSources}</span></span>
          } />
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {c.reviews.items.slice(0, 3).map((r) => (
              <Item key={r.name} className="flex flex-col gap-4 rounded-card border border-hairline-d bg-bone/[.04] p-7 pb-6">
                <Stars label={c.ui.starsLabel} />
                <blockquote className="flex-1 leading-[1.55] before:content-['\201C'] before:font-display before:text-5xl before:leading-[0] before:align-[-.35em] before:text-amber before:mr-1">{r.quote}</blockquote>
                <cite className="not-italic"><b className="block d text-step-1 leading-none tracking-[.02em]">{r.name}</b><span className="font-mono text-[.74rem] tracking-[.12em] uppercase text-muted-d">{r.meta}</span></cite>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-10"><Link className="text-link text-bone" href={href(locale, "reviews")}>{h.reviewsLink} <Arrow /></Link></Reveal>
        </div>
      </section>

      {/* AREA */}
      <section className="sec bg-bone" data-tone="light">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:gap-[calc(var(--spacing-gutter)*1.5)] lg:items-center">
          <Reveal className="relative overflow-hidden rounded-card-lg aspect-[5/4]">
            <Photo k="porch1" alt={h.areaBadge} sizes="(min-width: 60rem) 50vw, 100vw" />
            <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-bone text-navy px-3.5 py-2 font-mono text-[.68rem] tracking-[.12em] uppercase before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber">{h.areaBadge}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow text-amber-deep mb-4">{h.areaEyebrow}</span>
            <h2 className="d h-md text-navy">{h.areaH}</h2>
            <p className="mt-4 max-w-[58ch] text-muted">{h.areaP}</p>
            <ul className="grid grid-cols-2 gap-x-6 mt-6 text-step--1">{c.areas.slice(0, 8).map((a) => <li key={a} className="py-1.5 border-b border-hairline">{a}</li>)}</ul>
            <Link className="text-link text-navy mt-8" href={href(locale, "contact", "areas")}>{h.areaLink} <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      <CtaBand locale={locale} h={c.cta.h} p={c.cta.p} btn={c.cta.btn} word={c.cta.word} />
    </>
  );
}
