/* Client-side lead delivery, shared by the full estimate form and the quick
   "call or text me" box. Two paths run side by side:
   1. /api/quote: the full pipeline (Resend email, Telegram alert, CRM
      webhook, optional Twilio), active for whichever channels have env vars.
   2. Web3Forms (free, 250/month), when NEXT_PUBLIC_WEB3FORMS_KEY is set. It
      posts from the browser because the free plan rejects server-side calls,
      so a lead reaches the owner's inbox before any paid channel exists. The
      key is public by design.
   The lead counts as sent if either path delivers it. */
import type { SiteContent } from "./content";
import type { Locale } from "./i18n";
import { getAttribution } from "./attribution";
import { trackLead } from "./track";

export type LeadLabels = Pick<SiteContent["contact"], "serviceOptions" | "timelineOptions" | "budgetOptions" | "contactOptions">;

export async function submitLead(locale: Locale, data: Record<string, string>, c: LeadLabels): Promise<{ ok: boolean; leadId?: string }> {
  /* Web3Forms access keys are public by design (they ship in the browser
     either way and can only send to the inbox they're tied to), so the live
     key is the default; a Vercel env var overrides it. */
  const w3fKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "4073f9e9-9005-4810-b6c0-745df45295fd";
  const label = (opts: { v: string; l: string }[], v?: string) => opts.find((o) => o.v === v)?.l || v || "-";
  const quick = data.form === "quick";
  const w3f = w3fKey && !data.company
    ? fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: w3fKey, botcheck: "", from_name: "Z Construction website", ...(data.email ? { replyto: data.email } : {}),
          subject: `${quick ? "CALL BACK" : "New estimate request"}: ${data.name} · ${data.city || "Lee County"} · ${label(c.serviceOptions, data.service)}${locale === "es" ? " · ESPAÑOL" : ""}`,
          Name: data.name, Phone: data.phone, Email: data.email || "-", City: data.city || "-",
          Service: label(c.serviceOptions, data.service), Timeline: label(c.timelineOptions, data.timeline), Budget: label(c.budgetOptions, data.budget),
          "Contact by": label(c.contactOptions, data.contactPref), "Texts OK": data.smsConsent ? "Yes" : "No",
          Message: data.message || "-", Language: locale === "es" ? "Spanish" : "English", Page: location.href,
        }),
      }).then((r) => r.json()).then((j: { success?: boolean }) => !!j.success).catch(() => false)
    : Promise.resolve(false);
  const api = fetch("/api/quote", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, language: locale, page: location.href, attribution: getAttribution() }),
  }).then(async (r) => ({ r, j: (await r.json().catch(() => ({}))) as { ok?: boolean; leadId?: string; delivered?: boolean } }))
    .catch(() => ({ r: null as Response | null, j: {} as { ok?: boolean; leadId?: string; delivered?: boolean } }));
  const [w3fOk, { r, j }] = await Promise.all([w3f, api]);
  /* In production an "ok but delivered: false" answer means no channel is
     configured: report failure so the visitor sees the call-us message
     instead of a false success. */
  const apiOk = !!r?.ok && !!j.ok && (j.delivered !== false || process.env.NODE_ENV !== "production");
  if (!w3fOk && !apiOk) return { ok: false };
  const leadId = j.leadId || crypto.randomUUID();
  trackLead({ leadId, service: data.service || "other", email: data.email || "", phone: data.phone, language: locale });
  return { ok: true, leadId };
}
