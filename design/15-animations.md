# 15 — Animations

> **Status:** v2 (new) · **Owner:** Lead Product Designer · **Audience:** Anyone adding motion; implemented via Framer Motion

---

## 1. Library

**Framer Motion**, added as a new dependency. No other animation library, no raw CSS `@keyframes` for anything covered by the patterns below (CSS transitions remain fine for simple property changes like `:hover` color shifts that don't need Framer's spring/easing control).

## 2. Durations and easing (exact)

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Page transition | 200ms | `ease-out` |
| Card hover (lift + shadow) | 120ms | `ease-out` |
| Button hover | 100ms | `ease-out` |
| Button press (`whileTap`) | 80ms | `ease-in` |
| Tab panel switch | 150ms | fade, `ease-in-out` |
| Accordion/disclosure expand | 180ms | height auto via Framer's `AnimatePresence`, `ease-out` |

**Nothing exceeds 200ms.** Motion confirms an action happened; it never becomes something the user waits for.

## 3. What animates

Fade, scale (subtle — `0.98`–`1.02` range, never dramatic), and slide (small offsets, ≤8px) — matching the "very subtle" mandate. Never: bounce, spin-in, elaborate staggered reveals, parallax scrolling effects.

## 4. Reduced motion

Every animation respects `prefers-reduced-motion`. Use Framer Motion's `useReducedMotion()` hook; when true, swap durations to `0` (instant state change) rather than skipping the state change entirely — the end state must still be reachable, just without the transition.

## 4a. Known deviation: tab panel switch (implementation note, 2026-07-24)

§2 specifies a 150ms fade on tab panel switch. **Implemented as an instant, unanimated switch instead** (the existing `hidden`-attribute toggle in `packages/ui/src/tabs.tsx`), for two concrete reasons discovered during implementation:

1. **State preservation:** the Calculator tab's `ToolRunner` holds live input state. A real cross-fade requires either mounting only the active panel (Framer's `AnimatePresence` unmount/remount) — which would reset the user's inputs every time they switch away from and back to Calculator — or an absolute-stacked opacity cross-fade, which keeps all panels mounted but requires re-deriving everything the `hidden` attribute currently gives for free.
2. **Accessibility:** the `hidden` attribute removes inactive panels from the accessibility tree and tab order automatically. Replacing it with an opacity-based cross-fade means manually managing `aria-hidden`, focus containment (`inert` or per-element `tabIndex={-1}`), and hit-testing on the invisible panels — real a11y regression risk for a 150ms cosmetic detail.

**Decision:** keep the current accessible, state-safe `hidden`-based switch. Revisit only if the Calculator tab's input state is ever lifted above the `Tabs` component (removing the state-loss risk) — at that point, an `AnimatePresence`-based fade becomes safe to add.

## 5. What never animates

- Text content reflow (no animated line-height/font-size changes).
- Focus rings (must appear instantly for keyboard users — no fade-in delay on `:focus-visible`).
- Error/validation messages (appear instantly — a fade here reads as sluggish feedback on a failed action).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | New file — no animation system existed before this rebrand | User-directed addition of Framer Motion |
