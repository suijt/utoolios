# 13 — Mobile

> **Status:** v2 · **Owner:** Lead Product Designer · **Audience:** Anyone building or reviewing a UI change

---

## 1. Design order

**Every component and page is designed at 390px first, then scaled up** via `05-grid.md`'s breakpoints. Do not design at desktop width and "make it responsive" afterward — that produces cramped mobile layouts with content that was never actually considered at that size.

## 2. Touch

- Minimum target: **44×44px**, always (`04-spacing.md §4`).
- No hover-only affordances — anything revealed on `:hover` on desktop (e.g., a card's secondary action) must have an equivalent always-visible or tap-revealed affordance on touch devices.
- Adequate spacing between adjacent tap targets (minimum 8px gap) to avoid mis-taps.

## 3. Reachability

- **Sticky search:** on the homepage, once the user scrolls past the hero, a condensed search bar sticks below the header (mobile only) so search is always one tap away.
- **Sticky category filter:** on a category page, the category switcher (if multiple categories are being browsed) sticks below the header.
- **Bottom navigation** (`10-navigation.md §3`) puts Home/Categories/Search/Menu within thumb reach at all times.

## 4. No horizontal scroll

Enforced per `05-grid.md §4`. Verify with a real 360–390px viewport, not just Chrome DevTools' default 412px — the narrowest real device in common use is the constraint, not the average.

## 5. Performance on mobile

Mobile-first also means performance-first: the hero graphic (`11-homepage.md §2`) is `hidden` (not just visually collapsed) below `lg:` so its image isn't loaded on mobile at all. Any future addition here follows the same rule — decorative desktop-only elements don't ship to mobile bytes.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | New file — mobile-first was previously implicit in Tailwind's responsive prefixes, not an explicit standing rule | User-directed mobile-first mandate |
