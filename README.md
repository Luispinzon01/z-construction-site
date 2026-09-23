# Z Construction & Remodeling LLC — website

Next.js 16 · React 19 · Tailwind CSS v4 · @react-three/fiber · Framer Motion. English at `/`, Spanish at `/es` (native copy, localized slugs, hreflang).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy on Vercel (framework preset detects Next). Set the env vars from `.env.example` in Vercel → Settings → Environment Variables.

## Where things live

| Path | What |
| --- | --- |
| `src/lib/content.ts` | **Every word on the site, in both languages.** Edit copy here, not in components. Spanish is written natively (usted register) for Auburn/Opelika families, not machine-translated. |
| `src/lib/i18n.ts` | Locales, localized slugs (`/services` ↔ `/es/servicios`), URL helpers. |
| `src/proxy.ts` | Locale routing: `/` → English (rewritten to `/en` internally), `/es/...` → Spanish. |
| `src/app/[locale]/layout.tsx` | Fonts (Barlow Condensed / Barlow / Space Mono), nav, footer, grain, JSON-LD LocalBusiness schema. |
| `src/app/[locale]/[[...slug]]/page.tsx` | Routes slug → page component; per-page metadata with canonical + hreflang. |
| `src/app/api/quote/route.ts` | Quote form → email via Resend (logs to console when `RESEND_API_KEY` is unset). |
| `src/components/three/BlueprintLiquid.tsx` | The WebGL scene: cursor-warped blueprint grid that morphs into a clearcoat liquid-paint surface on scroll. |
| `src/components/three/Background3D.tsx` | Client-only host; pauses the render loop when the hero/services zone leaves the viewport. |
| `src/components/motion.tsx` | Framer Motion primitives: `Reveal`, `Stagger`/`Item`, `SplitWords` (CSS keyframes), `Counter`, `Magnetic`. |
| `src/components/pages/*` | One component per page (Home, Services, About, Work, Reviews, Contact, Thanks). |
| `src/app/globals.css` | Tailwind `@theme` tokens + the handful of custom pieces (glass nav, grain, marquee, compare slider, faq, forms). |
| `src/app/sitemap.ts`, `robots.ts` | Bilingual sitemap with alternates; robots. |

## The 3D background, briefly

One `PlaneGeometry`, two skins sharing one displacement function so the crossfade is seamless:

- **Blueprint** — `ShaderMaterial` (wireframe) + `Points`. Vertices ripple and pull toward the cursor (distance measured in screen space, so it tracks the pointer regardless of the plane's tilt).
- **Liquid gloss** — `MeshPhysicalMaterial` (metalness .55, roughness ~.16, clearcoat 1, iridescence .3) with the wave displacement injected via `onBeforeCompile`, normals recomputed by finite differences. Lit by three's `RoomEnvironment` through PMREM, so no HDR download. Color drifts through a six-stop paint palette.

`uMorph` (0→1) is driven by `scrollY` across roughly the first viewport height and smoothed with an exponential lerp. It crossfades the two skins, tilts the plane, and pans the camera down. DPR is capped at 1.75; segment count drops on phones; `prefers-reduced-motion` freezes the animation; a WebGL failure renders nothing (the CSS blueprint grid underneath remains). The canvas resizes with the viewport via R3F's ResizeObserver.

## Motion rules (DOM)

Transform and opacity only. No animated filters, box-shadows or large blurred surfaces (the WebGL canvas is the one deliberate exception and lives on its own layer). Grain is static. One easing everywhere: `cubic-bezier(.22, 1, .36, 1)`. Reduced motion is respected globally.

## Language behavior

- EN/ES pill in the nav and in the mobile menu, plus a footer link. Any language link stores the choice in `localStorage` (`zc-lang`).
- Landing from outside the site with a stored choice that differs from the page language redirects to the matching page.
- No stored choice + browser language Spanish on an English page (or vice-versa) shows a small suggestion pill. No automatic redirect (Google advises against it).
- Every page carries `<link rel="alternate" hreflang>` for en / es / x-default; the sitemap does too.

## Before launch (search `TODO` in `content.ts`)

1. Real phone number, email, license number, Google review link.
2. Replace the six sample reviews with verbatim reviews from Google / Angi / HomeAdvisor.
3. Replace Unsplash placeholders with job photos (drop them in `public/work/` and swap `photo()` sources).
4. Confirm the four homepage counters (projects, square feet, years, rating).
5. Set `NEXT_PUBLIC_SITE_URL` to the real domain; add Resend key and verify the sending domain.
6. Optional: `npx @next/codemod@canary middleware-to-proxy .` is already done (file is `src/proxy.ts`).
