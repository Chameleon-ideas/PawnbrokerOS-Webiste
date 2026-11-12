# Docs Index — PawnbrokerOS marketing site

Trust these in order.

| # | Doc | What it covers |
|---|---|---|
| 1 | [`../SESSION_2026-11-13.md`](../SESSION_2026-11-13.md) | Latest session — Calendly popup widget removed, "Book a demo" is now a plain link |
| 2 | [`../SESSION_2026-11-11.md`](../SESSION_2026-11-11.md) | Sign In removed from navbar, US copy → Canada (SSN → SIN) |
| 3 | [`../SESSION_2026-10-20.md`](../SESSION_2026-10-20.md) | Schedule a Demo redesign + UI bug fixes |
| 4 | [`../SESSION_2026-10-17.md`](../SESSION_2026-10-17.md) | Book a Demo section, HubSpot embed, CTA wiring (lead capture since replaced by Calendly) |

## Project at a glance

- **Stack:** Astro 5, static output (no adapter, no SSR). Single page: `src/pages/index.astro`.
- **Styling:** hand-written CSS with Figma-derived tokens in `src/styles/global.css`. Components use
  Astro scoped `<style>`. Scoped selectors cannot reach `<Icon />`'s SVG — use `:global(svg)`.
- **Config:** `src/config/calendly.ts` reads `PUBLIC_CALENDLY_URL` from `.env` (see `.env.example`).
  `src/config/hubspot.ts` still exists but **no component imports it**.
- **Lead capture:** a **plain link to Calendly**, not a HubSpot form and no longer the popup widget.
  The "Book a demo" button in `BookDemo.astro` is an `<a href={calendly.url} target="_blank">` — no
  JavaScript, and `Layout.astro` loads no Calendly script or stylesheet. Every "Get Started" CTA on
  the page is an anchor to `#book-demo` tagged with `data-demo-cta`. The popup widget was removed on
  2026-11-13 by request; do not re-add `widget.js`, `data-calendly-url`, or `[data-calendly-trigger]`
  without asking — the decision was deliberate, not a bug fix.
- **The Calendly host name is misspelled "PawnbrockerOS"** on the booking page. That string comes from
  the Calendly account profile, not this repo (`grep -i brocker` returns nothing here). It can only be
  fixed in Calendly → Account settings → Profile.
- **A push to `master` auto-deploys the live public site.** Nothing in the repo shows this — there is
  no `.github/workflows`, no `.vercel`, no `netlify.toml`, and no matching Vercel project on the
  connected account; the host is still unidentified. Treat `git push origin master` as a production
  deploy and confirm before running it. Local commits are safe.
- **Canada-only market (for now).** All copy and mockup data must be Canadian: SIN not SSN, province
  not state, postal code not ZIP, "licence" not "license", Canadian area codes (416/647/905),
  ISO or unambiguous dates. Keep compliance copy jurisdiction-neutral.
- **No Sign In / login link on this site.** It is a marketing page; the only CTA is the demo booking.
  Do not re-add a link to `dashboard.pawnbrokeros.com/login`.
- **No pricing is shown.** `Pricing.astro` exists but is intentionally not mounted — the page converts
  to a demo booking, not a price list. Confirm before rendering it.

## Conventions

- Section anchors live on the component's root `<section>` (`#product`, `#features`, `#how-it-works`,
  `#faq`, `#book-demo`). Before adding a CTA, confirm its target anchor exists — several shipped
  broken before 2026-10-17.
- Third-party scripts are lazy-loaded behind an `IntersectionObserver` and must degrade to a visible
  fallback, never a silent failure.
- Supersede docs by moving them to `Docs/archive/`. Never delete.
