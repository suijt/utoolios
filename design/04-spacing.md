# 04 — Spacing

> **Status:** v2 · **Owner:** Lead Product Designer · **Audience:** Anyone laying out a page or component

---

## 1. Base unit: 8px

Every spacing value is a multiple of 8px (Tailwind's default 4px scale gives us the half-steps where needed: `1`=4px, `2`=8px, `3`=12px, `4`=16px, `6`=24px, `8`=32px, `12`=48px, `16`=64px, `24`=96px). Don't use arbitrary values (`mt-[13px]`) — round to the nearest step on the scale.

| Step | Tailwind | px | Use |
|------|----------|-----|-----|
| xs | `1`–`2` | 4–8px | Icon-to-label gap, tight inline spacing |
| sm | `3`–`4` | 12–16px | Card internal padding (compact), form field gaps |
| md | `5`–`6` | 20–24px | Card padding (default), gaps between related items |
| lg | `8` | 32px | Gaps between distinct cards in a grid |
| xl | `12`–`16` | 48–64px | Gaps between page sections (mobile) |
| 2xl | `20`–`24` | 80–96px | Gaps between page sections (desktop) |

---

## 2. Section rhythm

- Between major homepage/tool-page sections: `mt-16` mobile, `lg:mt-24` desktop.
- Within a section (heading to content): `mt-6`.
- Within a card (title to body): `mt-3`.

## 3. Card and container padding

- Card padding: `p-6` default, `p-5` for compact/dense grids (tool card, category tile — matches `07-cards.md`).
- Container gutters: `px-4` mobile, `sm:px-6` tablet+, unchanged from current `Container` component.

## 4. Touch targets

Minimum interactive element size: 44×44px (`13-mobile.md`), regardless of visual size — pad tap targets with invisible hit-area if the visual element is smaller (e.g., a small icon button still gets `p-2.5` minimum).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Formalized the 8px scale as an explicit spec (was implicit in Tailwind defaults before) | Prevent spacing drift across future changes |
