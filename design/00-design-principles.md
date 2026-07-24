# 00 — Design Principles

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Everyone touching UI — this is the constitution for the `design/` system
> **Type:** Constitution for visual/product design, sibling to `docs/00-ENGINEERING-PRINCIPLES.md`. Where this folder is silent, `docs/00`–`52` still govern (honesty rule, plugin architecture, SEO, a11y baseline). Where they overlap on visual specifics, **this folder wins** — it supersedes the visual parts of `docs/DESIGN-SPEC.md` (v1, now archived in spirit; kept on disk for history).

---

## 1. Why this folder exists

A single "build the homepage like this mockup" prompt drifts. Card radius creeps, spacing gets inconsistent, a hero gets centered when it should be left-aligned, a hand-drawn icon replaces a real logo. Every one of those was a real mistake in this project's first pass. The fix isn't a better single prompt — it's a **standing, numbered specification** that every future change (by a human or by Claude) is checked against, the same way Stripe, Linear, Vercel, and Notion maintain internal design systems.

**Rule:** before shipping any UI change, check it against the relevant file here. If a file doesn't cover the case, extend the file — don't improvise silently.

---

## 2. What we're building

Not a marketing website. Not a calculator blog. **A premium product**, comparable in polish to Stripe, Linear, Vercel, Raycast, Arc, Notion, Canva, Apple, and Google's Material 3 — applied to a free online-tools platform.

> **Design mindset:** design the UI as if Linear built Google Calculator, Stripe built Calculator.net, and Apple reviewed every pixel.

Every page should immediately read as: professional, fast, trustworthy, simple, modern, minimal, useful. Never cluttered. Never cheap. Never a WordPress theme.

---

## 3. Primary goal

**The user finds the right tool within 5 seconds of landing.** Every design decision is judged against this — search prominence, category scannability, load speed, visual noise. If a component doesn't serve this goal, question why it's on the page.

---

## 4. Core philosophy

- **White space is a feature**, not empty space to fill.
- **Every card feels touchable** — a subtle lift and shadow on hover/focus, never a hard edge.
- **Typography is the hero.** Color and imagery support; type carries the hierarchy.
- **Icons are meaningful**, not decorative filler — one icon system (`09-icons.md`), used consistently.
- **Animation is subtle** (`15-animations.md`) — it confirms an action happened, it never performs.
- **Nothing distracts from the user's task.** A tool page's job is to compute an answer fast; ads, related links, and articles are secondary and never interrupt the primary flow.

---

## 5. Mobile-first, always

Design starts at **390px width** and scales up — never the reverse. Desktop is an enhanced version of mobile, not the other way around. Concretely (detail in `13-mobile.md`):

- Every interactive target is at least 44×44px.
- No horizontal scrolling, ever.
- Every interaction works with one thumb.
- Search and category navigation are reachable without scrolling back to the top.

---

## 6. Non-negotiables inherited from the engineering constitution

These come from `docs/00`–`52` and are **not** relaxed by this rebrand:

- **Honesty rule (`docs/DESIGN-SPEC.md §0`, `docs/02` C2/C7):** no fabricated ratings, usage counts, "trending" rankings, or categories without real published tools. A "Recently Added" section must be sorted by real registry data; a "Popular This Week" section is not built until real analytics exist.
- **Accessibility floor:** WCAG AA (`16-accessibility.md`).
- **One universal template per page type** (`docs/13-TOOL-PLUGIN-ARCHITECTURE.md`): every tool page shares the same layout; no per-tool bespoke design.
- **Ads reserve space, never shift layout** (`docs/19-ADS-ARCHITECTURE.md`).

---

## 7. How to use this folder

| File | Answers |
|------|---------|
| `01-brand-guidelines.md` | How do we use the logo, voice, and illustration style? |
| `02-colors.md` | What color, when? |
| `03-typography.md` | What font, what size, what weight? |
| `04-spacing.md` | How much space between things? |
| `05-grid.md` | How does layout respond across breakpoints? |
| `06-buttons.md` | What does a button look like, in every state? |
| `07-cards.md` | What does a card look like, in every state? |
| `08-inputs.md` | What does a form field look like? |
| `09-icons.md` | Which icon, at what size, in what color? |
| `10-navigation.md` | Header, footer, mobile nav — structure and behavior. |
| `11-homepage.md` | Exact homepage section order and content rules. |
| `12-tool-pages.md` | Exact tool-page template. |
| `13-mobile.md` | Mobile-specific rules beyond what's covered elsewhere. |
| `14-dark-mode.md` | How every surface/text/border maps in dark mode. |
| `15-animations.md` | What animates, how long, how it degrades. |
| `16-accessibility.md` | The accessibility floor for every component. |

**Amendments:** propose a change by editing the relevant file and noting it in that file's changelog table. Don't silently diverge — if you must break a rule for a good reason, document the exception where it lives in code (comment) and update the spec.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Rebrand: new palette, Lucide icons, Framer Motion, Geist + JetBrains Mono | User rejected v1 visual drift; standing spec system requested to prevent recurrence |
