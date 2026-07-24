# 02 — Colors

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone writing Tailwind classes or touching `packages/config/src/tokens.ts`
> **Supersedes:** the v1 palette in `docs/DESIGN-SPEC.md §2` (primary unchanged; secondary, accent, and category mapping change — see §5 for the migration).

---

## 1. Core tokens

| Token | Hex | Tailwind class | Role |
|-------|-----|-----------------|------|
| Primary | `#2563EB` | `primary` | Brand anchor — buttons, links, primary actions. **Unchanged from v1.** |
| Primary hover | `#1D4ED8` | `primary-hover` | Hover/active state of primary. |
| Secondary | `#7C3AED` | `secondary` | Violet — tech/developer identity, secondary CTAs, gradient mid-to-end. **Changed from v1's cyan `#06B6D4`.** |
| Accent | `#F59E0B` | `accent` | Amber — warmth/highlight, signature gradient accent, home category. **Changed from v1's violet `#8B5CF6`.** |
| Success | `#10B981` | `success` | Finance category, positive states. Unchanged. |
| Warning | `#F97316` | `warning` | Caution states (draft badges, validation warnings) — deliberately a distinct orange from Accent's amber so the two don't read as the same signal when both appear together. |
| Error | `#EF4444` | `error` | Health category, destructive actions, alerts. Unchanged. |
| Background (light) | `#F8FAFC` | `gray-50` | Page background, light mode. Same value as v1's `gray50` — no change. |
| Dark | `#0F172A` | `gray-900` | Page background, dark mode. Same value as v1's `gray900` — no change. |

Full neutral scale (unchanged from v1, slate-based):

| Token | Hex |
|-------|-----|
| Gray 50 | `#F8FAFC` |
| Gray 100 | `#F1F5F9` |
| Gray 200 | `#E2E8F0` |
| Gray 300 | `#CBD5E1` |
| Gray 400 | `#94A3B8` |
| Gray 500 | `#64748B` |
| Gray 600 | `#475569` |
| Gray 700 | `#334155` |
| Gray 800 | `#1E293B` |
| Gray 900 | `#0F172A` |

> Implementation note: `packages/config/src/tailwind-preset.ts` currently only overrides gray 50/100/200/500/700/900; this rebrand should fill in the full 300/400/600/800 slate values above so the scale is complete and consistent, rather than falling back to Tailwind's default (non-slate) gray for those steps.

---

## 2. Signature gradient

The blue → violet → amber gradient is the one signature accent — used for the hero's emphasized word, the primary result card, and nowhere else (a signature loses meaning if it's everywhere):

```
bg-gradient-to-r from-primary via-secondary to-accent     /* text: add bg-clip-text text-transparent */
bg-gradient-to-br from-primary to-secondary                /* surfaces: gradient result card */
```

> Note the gradient's endpoints changed with the rebrand (violet mid-point, amber end) but the *pattern* — one gradient, reserved for exactly these two uses — is unchanged from v1.

---

## 3. Category color mapping (authoritative)

Five real categories, five semantic tokens, **no two categories share a color**:

| Category | Token | Tile background | Icon foreground | Changed from v1? |
|----------|-------|------------------|-------------------|--------------------|
| Finance | `success` | `bg-success/10` | `text-success` | No |
| Developer | `secondary` | `bg-secondary/10` | `text-secondary` | Yes — was `accent` (violet), now sourced from the new `secondary` violet |
| Health | `error` | `bg-error/10` | `text-error` | No |
| Text | `primary` | `bg-primary/10` | `text-primary` | No |
| Home | `accent` | `bg-accent/10` | `text-accent` | Yes — was `warning` (orange), now sourced from the new `accent` amber |

**Honesty rule applies here too:** only render a category tile for a category with ≥1 published tool (`docs/DESIGN-SPEC.md §0`). We have exactly 5 today. When a 6th category ships, it needs a new color — see §4.

---

## 4. Future categories (not built yet)

The palette only has 5 non-overlapping identity colors. When category #6 arrives, don't reuse a color from §3 — extend with a **tint/shade variant** of an existing hue (e.g., a deeper or lighter tone of an existing token) rather than introducing an arbitrary new hue that clashes with the system. Decide the specific tint when the category actually ships (real tools exist) — don't pre-assign colors to categories that don't exist yet (honesty rule extends to the design system itself: no placeholder identity for vaporware categories).

---

## 5. Migration from v1

| What | v1 | v2 |
|------|----|----|
| `secondary` | `#06B6D4` (cyan) | `#7C3AED` (violet) |
| `accent` | `#8B5CF6` (violet) | `#F59E0B` (amber) |
| `warning` | `#F59E0B` (amber — same as v2's accent) | `#F97316` (orange — distinct) |
| Developer category | accent (violet) | secondary (violet) — same hue family, different token source |
| Home category | warning (orange) | accent (amber) — same hue family, different token source |
| Gradient | blue → cyan → violet | blue → violet → amber |

This is a real rebrand, not a renaming exercise — the logo mark itself (`/brand/icon-mark.png`) still shows the original blue→cyan→violet gradient baked into the image. **Open question for the next session:** either regenerate brand assets to match the new gradient, or treat the logo mark as a fixed legacy asset that intentionally doesn't follow the UI gradient token (common for brand marks — e.g., many brand logos don't perfectly track a product's UI accent color). Flag this to the user before regenerating any brand imagery.

---

## 6. Contrast requirements

Every text/background pairing must meet WCAG AA (4.5:1 for body text, 3:1 for large text ≥24px/19px bold) — see `16-accessibility.md`. Category tints (`bg-<color>/10`) are backgrounds only, never used for text; the icon foreground (`text-<color>` at full opacity) must be checked against both the light and dark page background, not just the tinted tile.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | New secondary (violet)/accent (amber), new distinct warning, remapped category colors | User-directed rebrand to a Stripe/Linear-style palette |
