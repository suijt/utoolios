# 10 — Navigation

> **Status:** v2 · **Owner:** Lead Product Designer · **Audience:** Anyone touching the header, footer, or mobile nav

---

## 1. Desktop header

Sticky, `backdrop-blur`, border-bottom — unchanged structurally from the current build:

`Logo (left) · Tools, Categories (center-right) · Search icon, theme toggle (right)`

Per the honesty/MVP rule (`docs/DESIGN-SPEC.md §6.1`, still binding): no "Sign in" until auth exists, no "Resources"/"About" dead links. If a real Blog/Resources section ships later, add it then.

## 2. Mobile header

Same sticky bar, condensed: `Logo (left) · Search icon, theme toggle, menu icon (right)`. Tapping the menu icon opens a full-screen or drawer nav listing Tools/Categories — not a cramped inline dropdown.

## 3. Mobile bottom navigation

Add a bottom nav bar, visible `< md`, hidden `md:` and above:

`Home · Categories · Search · Menu`

- Fixed to viewport bottom, respects `env(safe-area-inset-bottom)`.
- Each item: icon (24px, Lucide) + label (`text-xs`), 44px+ tap height.
- Active route highlighted with the `primary` token.
- This is additive — it doesn't replace the sticky header, it supplements one-thumb reachability for the two things a mobile user does most: search and browse categories.

## 4. Footer

Unchanged structurally: logo, tagline, feature badges. Wide container (`max-w-5xl`), matching header width.

## 5. Breadcrumbs

`text-sm text-gray-500`, `/` separators, last item `aria-current="page"` — unchanged from current implementation.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Added mobile bottom nav spec (new) | Mobile-first mandate calls for one-thumb reachable search/categories |
