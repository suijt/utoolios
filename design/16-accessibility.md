# 16 — Accessibility

> **Status:** v2 · **Owner:** Lead Product Designer · **Audience:** Everyone — this is the floor, not a checklist to run once at the end
> **Aligns with:** `docs/37-ACCESSIBILITY.md` (engineering-level detail); this file is the design-level restatement so it lives alongside the visual system that must satisfy it.

---

## 1. Standard

**WCAG 2.1 AA, minimum, for every component in this folder.** Not a target to reach eventually — a gate every new component must pass before shipping.

## 2. Non-negotiables

- **Contrast:** 4.5:1 body text, 3:1 large text (≥24px or ≥19px bold) and UI component boundaries, checked against both light and dark surfaces (`02-colors.md §6`).
- **Keyboard:** every interactive element reachable and operable via keyboard alone, in a logical tab order. No `tabindex` greater than 0.
- **Focus rings:** always visible on keyboard focus (`focus-visible:ring-2 focus-visible:ring-primary/30`), never `outline: none` without an equivalent replacement.
- **Color is never the sole signal:** error states pair color with text/icon; category identity pairs color with the category label, not color alone.
- **Every input has a `<label>`** (`08-inputs.md §2`); every icon-only control has an `aria-label`.
- **Motion respects `prefers-reduced-motion`** (`15-animations.md §4`).
- **Semantic HTML and heading hierarchy:** one `<h1>` per page, no skipped heading levels, landmarks (`<nav>`, `<main>`, `<footer>`) used correctly — unchanged requirement from `docs/37`.

## 3. Component-specific requirements

| Component | Requirement |
|-----------|--------------|
| Tabs (`10-navigation.md`) | Full ARIA tabs pattern: `role="tablist"`/`"tab"`/`"tabpanel"`, roving tabindex, arrow-key navigation — already implemented in `packages/ui/src/tabs.tsx`, keep it. |
| Result card | `aria-live="polite"` so screen readers announce updates as inputs change — already implemented, keep it. |
| Bottom nav (mobile, new) | `<nav aria-label="Primary">`, current route marked `aria-current="page"`. |
| Accordion/FAQ | Native `<details>/<summary>` (already used) — inherits correct semantics for free; don't replace with a custom div-based implementation that has to re-implement what the browser gives natively. |
| Skeleton loaders (new, `07-cards.md §3`) | `aria-busy="true"` on the loading container, `aria-hidden="true"` on the skeleton shapes themselves (they carry no real content). |

## 4. Testing

Every new component gets at minimum: a keyboard-only pass (tab through it, operate it with no mouse) and a contrast check on its actual token pairing (not eyeballed) before merging.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Restated as the explicit design-level floor, cross-referenced to `docs/37` | Ensure the new component set (bottom nav, skeletons) inherits the same bar as existing components |
