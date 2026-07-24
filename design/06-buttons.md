# 06 — Buttons

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone adding a button; implements against `packages/ui/src/button.tsx`

---

## 1. Radius and sizing

- **Radius: 14px** (`rounded-[14px]` — a new `rounded-btn` token, replacing the fully-round `rounded-full` pill from v1). A soft squircle reads more "product," less "marketing pill," matching Stripe/Linear.
- **Min touch target: 44×44px** including padding, regardless of visual size.
- Sizes: `sm` (`px-3 py-2 text-sm`), `md`/default (`px-5 py-2.5 text-base`), `lg` (`px-6 py-3.5 text-base`, hero CTAs only).

## 2. Variants

| Variant | Classes | Use |
|---------|---------|-----|
| Primary | `bg-primary text-white hover:bg-primary-hover` | The one primary action per view |
| Gradient | `bg-gradient-to-r from-primary to-secondary text-white` | Hero CTA only — inherits the signature gradient rule (`02-colors.md §2`), used sparingly |
| Secondary | `border border-gray-300 hover:border-primary dark:border-gray-600` | Secondary actions |
| Ghost | `text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800` | Tertiary actions, toolbar icons |

## 3. States

- **Hover:** background/border shift per variant above, `transition` at 100ms (`15-animations.md`).
- **Active/pressed:** `scale-[0.98]` via Framer Motion `whileTap`.
- **Focus:** `focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none` — always visible on keyboard focus, never removed.
- **Disabled:** `opacity-50 cursor-not-allowed`, no hover/active transforms.

## 4. Icon buttons

Square, same 44px minimum, icon centered via `inline-flex items-center justify-center`, `aria-label` required (no visible text).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Radius changed from full pill to 14px squircle; gradient endpoint updated to secondary (violet) | Matches the new rebrand's less-pill, more-product aesthetic direction |
