# 05 — Grid & Breakpoints

> **Status:** v2 · **Owner:** Lead Product Designer · **Audience:** Anyone building a responsive layout

---

## 1. Mobile-first breakpoints

Design starts at **390px** (a common small-phone reference width) and scales up. Tailwind's default breakpoints, used as-is:

| Breakpoint | Min width | Represents |
|------------|-----------|------------|
| (base) | 0px | Design baseline — 390px is the reference canvas, but the base styles must work down to ~360px |
| `sm` | 640px | Large phone / small tablet portrait |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small laptop — sidebar/multi-column layouts activate here |
| `xl` | 1280px | Desktop |

**Rule:** write the base (no prefix) styles for mobile first, then layer `sm:`/`md:`/`lg:`/`xl:` overrides — never the reverse (no `lg:flex flex-col-reverse` hacks to undo a desktop-first default).

---

## 2. Containers

Two container widths (`packages/ui/src/container.tsx`):

- **Wide** (`max-w-7xl`, 1280px): homepage, header, footer. **Widened from `max-w-5xl`** per explicit v3 spec — gives the two-column homepage (`11-homepage.md`) enough room for the sidebar without cramping the main column.
- **Default** (`max-w-3xl`): tool pages, category pages, article content — anything meant to be read, not browsed.

Gutter: `px-4` below `sm`, `px-6` at `sm` and above.

---

## 3. Grid rules by component

| Component | Mobile | `sm` | `lg` |
|-----------|--------|------|------|
| Category tiles | 1 column | 2 columns | 3 columns |
| Popular tool cards | 1 column | 2 columns | 3 columns |
| Hero (text + graphic) | Stacked, graphic hidden | Stacked, graphic hidden | 2 columns, graphic visible |
| Stat bar | 2 columns | — | 4 columns |
| Tool page inputs | 1 column | 2 columns | 2 columns (page stays `max-w-3xl`, no 3rd column) |

---

## 4. Safe areas and no horizontal scroll

- Respect `env(safe-area-inset-*)` for any fixed/sticky mobile element (bottom nav, sticky search) so content isn't obscured by device home-indicators/notches.
- No component may force horizontal scroll on the page body. Wide content (code blocks, tables) scrolls **within its own container** (`overflow-x-auto` on that element only) — same rule already applied to Artifact-style embeds, applied here too.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Formalized mobile-first breakpoint and grid rules | Previously implicit; needed explicit reference given the mobile-first mandate |
