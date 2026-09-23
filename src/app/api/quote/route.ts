import { NextResponse } from "next/server";
import { BRAND } from "@/lib/content";

/* Quote form delivery. With RESEND_API_KEY set the request becomes an email
   to QUOTE_TO_EMAIL; without it (local dev) the payload is logged and the
   form still succeeds so the flow can be exercised end to end. */
export const runtime = "nodejs";

type Body = Record<string, string>;
const clean = (v: unknown, max = 2000) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let b: Body;
  try { b = (await req.json()) as Body; } catch { return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 }); }
  if (clean(b.company)) return NextResponse.json({ ok: true }); // honeypot: pretend success
  const name = clean(b.name, 120), phone = clean(b.phone, 40), email = clean(b.email, 160), city = clean(b.city, 80), message = clean(b.message);
  if (!name || !phone || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const lines = [
    `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, `City: ${city}`,
    `Service: ${clean(b.service, 60) || "-"}`, `Timeline: ${clean(b.timeline, 60) || "-"}`, `Language: ${clean(b.language, 5) || "en"}`, `Page: ${clean(b.page, 300)}`, "", message,
  ];
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.log("[quote] (no RESEND_API_KEY, logging only)\n" + lines.join("\n")); return NextResponse.json({ ok: true, delivered: false }); }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL || `Z Construction <quotes@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").hostname}>`,
      to: [process.env.QUOTE_TO_EMAIL || BRAND.email],
      replyTo: email,
      subject: `Quote request: ${name} · ${city || "Auburn"}${b.service ? ` · ${clean(b.service, 60)}` : ""}`,
      text: lines.join("\n"),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[quote] send failed", e);
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 502 });
  }
}
