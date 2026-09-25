"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow } from "./Icons";
import { CONTENT } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { getAttribution } from "@/lib/attribution";
import { track, trackLead } from "@/lib/track";

/* The quote form. Also embedded on every service and town page, so it takes
   an optional preset service; ?service= and ?note= (from the cost estimator)
   override it. Budget + timeline feed lead scoring; attribution rides along
   so every lead says which ad, search or AI assistant produced it. */
export default function QuoteForm({ locale, service, compact = false }: { locale: Locale; service?: string; compact?: boolean }) {
  const c = CONTENT[locale].contact;
  const router = useRouter();
  const params = useSearchParams();
  const preset = params.get("service") ?? service ?? "";
  const note = params.get("note") ?? "";
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const started = useRef(false);
  const id = (k: string) => (compact ? `q-${k}` : k);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: compact ? "inline" : "contact", service: preset || "none" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    try {
      const r = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: locale, page: location.href, attribution: getAttribution() }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; leadId?: string };
      if (!r.ok || !j.ok) throw new Error(String(r.status));
      trackLead({ leadId: j.leadId || crypto.randomUUID(), service: data.service || "other", email: data.email, phone: data.phone, language: locale });
      router.push(href(locale, "thanks"));
    } catch { setStatus("error"); }
  }

  const select = (name: string, label: string, options: { v: string; l: string }[], value = "") => (
    <div className="field" key={name}><label htmlFor={id(name)}>{label}</label>
      <select id={id(name)} name={name} defaultValue={value}><option value="">{c.f.select}</option>{options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
  );

  return (
    <form className="grid gap-4 mt-6" onSubmit={onSubmit} onFocus={onStart} noValidate data-track={compact ? "inline-form" : "contact-form"}>
      <p className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true"><label>{c.f.honeypot} <input name="company" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor={id("name")}>{c.f.name} *</label><input id={id("name")} name="name" type="text" autoComplete="name" required /></div>
        <div className="field"><label htmlFor={id("phone")}>{c.f.phone} *</label><input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor={id("email")}>{c.f.email} *</label><input id={id("email")} name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor={id("city")}>{c.f.city} *</label><input id={id("city")} name="city" type="text" autoComplete="address-level2" placeholder={c.f.cityPh} required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {select("service", c.f.service, c.serviceOptions, preset)}
        {select("timeline", c.f.timeline, c.timelineOptions)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {select("budget", c.f.budget, c.budgetOptions)}
        {select("contactPref", c.f.contactPref, c.contactOptions, c.contactOptions[0].v)}
      </div>
      <div className="field"><label htmlFor={id("message")}>{c.f.message} *</label><textarea id={id("message")} name="message" required placeholder={c.f.messagePh} defaultValue={note} /></div>
      <label className="flex gap-3 items-start text-step--1 text-muted cursor-pointer">
        <input type="checkbox" name="smsConsent" className="mt-1 w-4 h-4 shrink-0 accent-[var(--color-amber-deep)]" />
        <span>{c.f.smsConsent} <Link className="underline" href={href(locale, "privacy")}>{c.f.privacy}</Link></span>
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button className="btn btn--solid" type="submit" disabled={status === "sending"}>{status === "sending" ? c.f.sending : c.f.send} <Arrow /></button>
        <p className="font-mono text-[.72rem] tracking-[.1em] uppercase text-muted max-w-[34ch] leading-relaxed">{c.f.note}</p>
      </div>
      {status === "error" && <div role="status" className="rounded-[10px] bg-[#fbe8e5] text-[#8f2a1f] px-4 py-4 font-semibold">{c.f.err}</div>}
    </form>
  );
}
