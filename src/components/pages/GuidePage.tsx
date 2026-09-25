import Link from "next/link";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import { Reveal } from "@/components/motion";
import { CONTENT, photo } from "@/lib/content";
import { GUIDES, type GuideId } from "@/lib/content-guides";
import { serviceById } from "@/lib/content-services";
import { href, type Locale } from "@/lib/i18n";
import { guideHref, serviceHref } from "@/lib/routes";
import { article, faqPage, JsonLd } from "@/lib/schema";

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* Long-form guide. The "short answer" box up top is deliberate: it's the
   sentence Google's AI Overviews and ChatGPT lift when they cite a page. */
export default function GuidePage({ locale, id }: { locale: Locale; id: GuideId }) {
  const c = CONTENT[locale], gi = c.guidesIndex;
  const g = GUIDES.find((x) => x.id === id)!, t = g.t[locale];
  const path = guideHref(locale, id);
  const svc = serviceById(g.service);
  const date = new Date(g.updated + "T12:00:00Z").toLocaleDateString(locale === "es" ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <>
      <PageHero photoKey={g.photo} alt={t.h1} eyebrow={t.eyebrow} h1={t.h1} lede={t.lede} />
      <Breadcrumbs items={[{ name: c.ui.home, path: href(locale, "home") }, { name: c.footer.guides, path: href(locale, "guides") }, { name: t.h1, path }]} />
      <article className="bg-bone" data-tone="light">
        <div className="shell grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_18rem] lg:gap-gutter">
          <div className="max-w-[68ch]">
            <p className="slate text-muted mb-6">{gi.updated} <time dateTime={g.updated}>{date}</time> · Z Construction & Remodeling · Auburn, AL</p>
            <Reveal className="rounded-card border-l-4 border-amber bg-bone-2 p-6 mb-12">
              <h2 className="eyebrow text-amber-deep mb-3">{gi.answer}</h2>
              <p className="text-step-1 leading-snug text-ink">{t.answer}</p>
            </Reveal>
            {t.sections.map((s) => (
              <section key={s.h} id={slugify(s.h)} className="mb-12 [scroll-margin-top:6rem]">
                <h2 className="d text-step-3 text-navy mb-4">{s.h}</h2>
                <div className="grid gap-4 text-muted">
                  {s.p?.map((p) => <p key={p}>{p}</p>)}
                  {s.list && <ul className="grid gap-2 list-disc pl-5">{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}
                  {s.table && (
                    <div className="overflow-x-auto"><table className="w-full min-w-[32rem] text-step--1 border-collapse text-ink">
                      <thead><tr>{s.table.head.map((h) => <th key={h} scope="col" className="text-left py-2 pr-4 border-b-2 border-ink font-mono font-normal text-[.72rem] tracking-[.1em] uppercase">{h}</th>)}</tr></thead>
                      <tbody>{s.table.rows.map((r) => <tr key={r.join()} className="border-b border-hairline">{r.map((cell, i) => <td key={i} className={`py-2.5 pr-4 ${i ? "font-mono whitespace-nowrap" : ""}`}>{cell}</td>)}</tr>)}</tbody>
                    </table></div>
                  )}
                </div>
              </section>
            ))}
            {t.faq.length > 0 && (
              <section className="faq">
                <h2 className="d text-step-3 text-navy mb-4">FAQ</h2>
                {t.faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p className="text-muted pb-6">{f.a}</p></details>)}
              </section>
            )}
          </div>
          <aside className="lg:sticky lg:top-28 self-start grid gap-6">
            <nav className="rounded-card border border-hairline p-5" aria-label={gi.toc}>
              <h2 className="slate text-muted mb-3">{gi.toc}</h2>
              <ol className="grid gap-2 text-step--1">{t.sections.map((s) => <li key={s.h}><a className="hover:text-amber-deep" href={`#${slugify(s.h)}`}>{s.h}</a></li>)}</ol>
            </nav>
            <div className="rounded-card bg-navy-2 text-bone p-5" data-tone="dark">
              <h2 className="slate text-amber mb-2">{gi.related}</h2>
              <Link className="text-link text-bone" href={serviceHref(locale, g.service)}>{svc.t[locale].name} <Arrow /></Link>
              {g.estimator && <Link className="btn btn--solid btn--sm mt-4 w-full" href={`${href(locale, "estimator")}?type=${g.estimator}`}>{c.footer.estimator} <Arrow /></Link>}
            </div>
          </aside>
        </div>
      </article>
      <CtaBand locale={locale} h={gi.ctaH} p={gi.ctaP} btn={c.cta.btn} word={c.cta.word} />
      <JsonLd data={[article({ headline: t.h1, description: t.description, path, locale, image: photo(g.photo, 1600), published: g.published, updated: g.updated }), ...(t.faq.length ? [faqPage(t.faq)] : [])]} />
    </>
  );
}
