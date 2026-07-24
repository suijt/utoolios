# 01 — Brand Guidelines

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone placing the logo, writing UI copy, or choosing imagery

---

## 1. The logo

The **only** real logo assets are in `/brand` (source) and `apps/web/public/brand/icon-mark.png` (transparent, web-ready cutout of `brand-symbol.png`). **Never hand-draw a recreation** — that was the exact mistake that caused the first rebuild to drift from the mockup. If a new format/size is needed, derive it from the source files in `/brand`, don't redraw it.

- **Icon mark** (`icon-mark.png`): the gradient "U" with sparkles. Transparent background — safe on both light and dark surfaces without a color swap. Use for the header, footer, favicon, and any compact placement.
- **Full lockup** (`/brand/logo.png`, `/brand/logo-dark.png`): icon + "UToolios" wordmark + tagline, flattened backgrounds (light/dark respectively). Use only where a single flattened image is acceptable (e.g., social card, email header) — not inline in the live UI, since the baked background won't blend with arbitrary surface colors.
- **In-app wordmark:** for the header/footer, pair the icon mark image with **live text** ("UToolios" in the current heading font, see `03-typography.md`) rather than the flattened lockup image — this stays crisp at any size and inherits the current theme's text color automatically.

### Clearspace and sizing
- Minimum clearspace around the icon mark: half the mark's own width on every side.
- Minimum display size: 20px (favicon-scale) up to any size at the hero (large decorative use, see `11-homepage.md`).
- Never stretch, recolor, rotate, or add effects (drop shadows are the one exception, used sparingly per `07-cards.md` elevation rules) to the mark.

### Favicon / app icon
Generate the favicon set from `/brand`'s existing favicon exports (multiple square PNG sizes already provided) — don't regenerate from scratch.

---

## 2. Voice and tone

- **Simple, confident, helpful.** We explain what a tool does in one sentence a non-expert understands.
- **Never salesy.** No "Unlock the power of...", no exclamation-point marketing copy. State the fact: "Calculate your monthly mortgage payment."
- **Honest, always** (`docs/02` C2/C7, restated in `00-design-principles.md §6`). If we don't have a number, we don't invent one — we omit the claim entirely.
- **Second person, present tense.** "Calculate your BMI" not "Users can calculate their BMI."

---

## 3. Illustration style

Where decorative imagery is used (hero graphics, empty states, error states):

- **Simple, 2D, gradient, rounded** — matching the icon mark's own visual language (soft gradients, rounded terminals).
- **No stock illustration.** No generic "person at a desk" or "team celebrating" art.
- **No cartoon mascots.**
- **No 3D blobs/gradients-as-background-noise** (a common "AI startup" cliché — avoid it).
- Prefer **composition from real UI elements** (real category icons, real logo mark, real tool cards) over invented graphics — see the hero graphic in `11-homepage.md` as the reference pattern: the real logo mark plus real category icons, not a custom illustration.

---

## 4. Category color identity

Categories are identity-bearing — each real category owns exactly one semantic color token, no two categories share a color (`02-colors.md §3` has the authoritative table). Do not invent a category without a published tool behind it (honesty rule).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Documented real logo usage rules after v1 mistakenly used a hand-drawn recreation | Prevent recurrence; codify the fix from the `d8dc6b1` correction |
