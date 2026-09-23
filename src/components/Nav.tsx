"use client";
/* Liquid-glass nav pill. Transparent over the hero; after 40px of scroll it
   picks up the glass and samples the section beneath it (data-tone) to flip
   between bone and navy text. On phones the bar itself becomes the menu. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark, Globe } from "./Icons";
import { BRAND, CONTENT } from "@/lib/content";
import { href, pageFromSlug, type Locale, type PageKey } from "@/lib/i18n";

const ORDER: Exclude<PageKey, "thanks">[] = ["home", "services", "about", "work", "reviews", "contact"];

export function currentPage(locale: Locale, pathname: string): PageKey {
  const rest = locale === "es" ? pathname.replace(/^\/es\/?/, "") : pathname.replace(/^\//, "");
  return pageFromSlug(locale, rest ? rest.split("/") : []) ?? "home";
}

export default function Nav({ locale }: { locale: Locale }) {
  const c = CONTENT[locale];
  const pathname = usePathname();
  const page = currentPage(locale, pathname);
  const other: Locale = locale === "en" ? "es" : "en";
  const altHref = href(other, page === "thanks" ? "home" : page);
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuH, setMenuH] = useState(440);

  useEffect(() => {
    let last = 0;
    const sample = () => {
      const el = bar.current; if (!el) return;
      const y = el.getBoundingClientRect().bottom + 6;
      const els = document.elementsFromPoint(window.innerWidth / 2, y);
      for (const e of els) {
        if (e === el || el.contains(e) || e.classList.contains("grain")) continue;
        const tone = (e as HTMLElement).closest("[data-tone]");
        if (tone) { setLight(tone.getAttribute("data-tone") === "light"); return; }
        const bg = getComputedStyle(e).backgroundColor; const m = bg.match(/\d+(\.\d+)?/g);
        if (m && m.length >= 3 && !(m.length >= 4 && parseFloat(m[3]) === 0)) { setLight((0.2126 * +m[0] + 0.7152 * +m[1] + 0.0722 * +m[2]) / 255 > 0.55); return; }
      }
    };
    const onScroll = () => { setScrolled(window.scrollY > 40); const now = Date.now(); if (now - last > 150) { last = now; sample(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sample);
    const iv = setInterval(sample, 400);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", sample); clearInterval(iv); };
  }, [pathname]);

  useEffect(() => { setOpen(false); document.body.style.overflow = ""; }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  const toggle = () => {
    const next = !open;
    if (next && menu.current) setMenuH(menu.current.scrollHeight + 60);
    setOpen(next); document.body.style.overflow = next ? "hidden" : "";
  };
  const remember = () => { try { localStorage.setItem("zc-lang", other); } catch {} };

  return (
    <header className="navwrap">
      <nav ref={bar} className={`bar${scrolled ? " scrolled" : ""}${light ? " light" : ""}${open ? " open" : ""}`} style={{ ["--menuh" as string]: `${menuH}px` }} aria-label={c.ui.primaryNav}>
        <Link className="brand flex items-center gap-2.5 no-underline" href={href(locale, "home")} aria-label={BRAND.name}>
          <Mark className="w-[34px] h-[34px] shrink-0" />
          <span className="font-display font-extrabold uppercase tracking-[.02em] text-[1.15rem] leading-none">Z Construction<small className="brand__small hidden min-[40rem]:block font-mono font-normal text-[.58rem] tracking-[.18em] opacity-80 mt-[3px] whitespace-nowrap">&amp; Remodeling · Auburn, AL</small></span>
        </Link>
        <div className="links">
          {ORDER.map((k) => <Link key={k} href={href(locale, k)} aria-current={page === k ? "page" : undefined}>{c.nav[k]}</Link>)}
        </div>
        <div className="bar-cta">
          <a className="call" href={`tel:${BRAND.tel}`}>{BRAND.phone}</a>
          <a className="lang" href={altHref} hrefLang={other} lang={other} title={c.ui.langTitle} onClick={remember}><Globe />{c.ui.langSwitch}</a>
          <Link className="btn btn--solid btn--sm" href={href(locale, "contact")}>{c.ui.quoteShort}</Link>
          <button className="burger" aria-label={c.ui.menu} aria-expanded={open} aria-controls="menu" onClick={toggle}><span /><span /><span /></button>
        </div>
        <div className="menu" id="menu" ref={menu}>
          {ORDER.map((k) => <Link key={k} href={href(locale, k)}>{c.nav[k]}</Link>)}
          <a className="menu__lang" href={altHref} hrefLang={other} lang={other} onClick={remember}><Globe className="w-4 h-4" /> {c.ui.langSwitchLong}</a>
          <div className="menu__meta">Auburn · Opelika · Lee County<br /><a href={`tel:${BRAND.tel}`}>{BRAND.phone}</a></div>
        </div>
      </nav>
    </header>
  );
}
