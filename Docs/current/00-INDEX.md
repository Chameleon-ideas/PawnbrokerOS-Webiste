# Docs Index — PawnDesk marketing site

Trust these in order.

| # | Doc | What it covers |
|---|---|---|
| 1 | [`../SESSION_2026-10-20.md`](../SESSION_2026-10-20.md) | Latest session — Schedule a Demo redesign + UI bug fixes |
| 2 | [`../SESSION_2026-10-17.md`](../SESSION_2026-10-17.md) | Book a Demo section, HubSpot embed, CTA wiring (lead capture since replaced by Calendly) |

## Project at a glance

- **Stack:** Astro 5, static output (no adapter, no SSR). Single page: `src/pages/index.astro`.
- **Styling:** hand-written CSS with Figma-derived tokens in `src/styles/global.css`. Components use
  Astro scoped `<style>`. Scoped selectors cannot reach `<Icon />`'s SVG — use `:global(svg)`.
- **Config:** `src/config/calendly.ts` reads `PUBLIC_CALENDLY_URL` from `.env` (see `.env.example`).
  `src/config/hubspot.ts` still exists but **no component imports it**.
- **Lead capture:** the **Calendly popup widget**, not a HubSpot form. Script + stylesheet load in
  `Layout.astro`; `#book-demo` carries the URL on `data-calendly-url`, and any element with
  `[data-calendly-trigger]` opens the popup (falling back to `window.open` if the widget is blocked
  or still loading). Every "Get Started" CTA on the page is an anchor to `#book-demo` tagged with
  `data-demo-cta`. Trigger binding is idempotent via `data-calendly-bound` — do not re-add
  `removeEventListener` with a locally-created handler, it silently fails and double-fires the popup.
- **No pricing is shown.** `Pricing.astro` exists but is intentionally not mounted — the page converts
  to a demo booking, not a price list. Confirm before rendering it.

## Conventions

- Section anchors live on the component's root `<section>` (`#product`, `#features`, `#how-it-works`,
  `#faq`, `#book-demo`). Before adding a CTA, confirm its target anchor exists — several shipped
  broken before 2026-10-17.
- Third-party scripts are lazy-loaded behind an `IntersectionObserver` and must degrade to a visible
  fallback, never a silent failure.
- Supersede docs by moving them to `Docs/archive/`. Never delete.
