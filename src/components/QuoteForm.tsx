"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Arrow } from "./Icons";
import { CONTENT } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";

export default function QuoteForm({ locale }: { locale: Locale }) {
  const c = CONTENT[locale].contact;
  const router = useRouter();
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, language: locale, page: location.href }) });
      if (!r.ok) throw new Error(String(r.status));
      router.push(href(locale, "thanks"));
    } catch { setStatus("error"); }
  }

  return (
    <form className="grid gap-4 mt-6" onSubmit={onSubmit} noValidate>
      <p className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true"><label>{c.f.honeypot} <input name="company" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor="name">{c.f.name} *</label><input id="name" name="name" type="text" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="phone">{c.f.phone} *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor="email">{c.f.email} *</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="city">{c.f.city} *</label><input id="city" name="city" type="text" placeholder={c.f.cityPh} required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor="service">{c.f.service}</label>
          <select id="service" name="service" defaultValue={preset}><option value="">{c.f.select}</option>{c.serviceOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
        <div className="field"><label htmlFor="timeline">{c.f.timeline}</label>
          <select id="timeline" name="timeline" defaultValue=""><option value="">{c.f.select}</option>{c.timelineOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
      </div>
      <div className="field"><label htmlFor="message">{c.f.message} *</label><textarea id="message" name="message" required placeholder={c.f.messagePh} /></div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button className="btn btn--solid" type="submit" disabled={status === "sending"}>{status === "sending" ? c.f.sending : c.f.send} <Arrow /></button>
        <p className="font-mono text-[.72rem] tracking-[.1em] uppercase text-muted max-w-[34ch] leading-relaxed">{c.f.note}</p>
      </div>
      {status === "error" && <div role="status" className="rounded-[10px] bg-[#fbe8e5] text-[#8f2a1f] px-4 py-4 font-semibold">{c.f.err}</div>}
    </form>
  );
}
