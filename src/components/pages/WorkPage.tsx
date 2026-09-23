import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import { CONTENT } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default function WorkPage({ locale }: { locale: Locale }) {
  const c = CONTENT[locale]; const w = c.work;
  return (
    <>
      <PageHero photoKey="kitchen2" alt={w.cells[1].title} eyebrow={w.eyebrow} h1={w.h1} lede={w.lede} />
      <section className="sec bg-bone" data-tone="light">
        <div className="shell">
          <GalleryGrid cells={w.cells} filters={w.filters} filterLabel={w.filterLbl} labels={[c.ui.before, c.ui.after]} compareLabel={c.ui.dragToCompare} beforeAfterText={`${c.ui.before} / ${c.ui.after}`} />
          <p className="mt-10 rounded-r-[10px] border-l-[3px] border-amber bg-amber/10 px-4 py-3.5 text-step--1">{w.notice}</p>
        </div>
      </section>
      <CtaBand locale={locale} h={w.ctaH} p={w.ctaP} btn={c.cta.btn} word={c.cta.word} />
    </>
  );
}
