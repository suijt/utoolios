# 09 — Icons

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone adding or referencing an icon
> **Supersedes:** `docs/DESIGN-SPEC.md §8` (custom inline-SVG icon set) — this rebrand replaces the custom set with Lucide.

---

## 1. One icon library: Lucide

`lucide-react` is the only icon library in the app. Never mix in Heroicons, Feather, custom hand-drawn SVGs, or emoji-as-icon (emoji remain fine as literal decorative characters in copy, e.g. "🔥 Popular:", but not as a stand-in for a UI icon).

- Consistent stroke width: `strokeWidth={2}`.
- Consistent sizing scale: `16` (inline with text), `20` (default UI icon), `24` (buttons/nav), `32`+ (category tiles, decorative).
- All decorative icons get `aria-hidden="true"`; icons that are the *only* content of a control get an `aria-label` on the control instead.

## 2. Category icon mapping (authoritative)

| Category | Lucide icon | Color token (`02-colors.md §3`) |
|----------|--------------|-----------------------------------|
| Finance | `Calculator` | `success` |
| Developer | `Code2` | `secondary` |
| Health | `Heart` | `error` |
| Text | `FileText` | `primary` |
| Home | `House` | `accent` |

Rendered the same way as today's `CategoryIcon` (pastel tile background + colored icon foreground), just swapping the hand-drawn glyph for the Lucide component — the tile/color/size wrapper logic in `apps/web/components/category-icon.tsx` is reused, only the SVG source changes.

## 3. Future category icons (reference only, not built until the category ships)

| Future category | Lucide icon |
|------------------|--------------|
| Food | `ChefHat` |
| Travel | `Plane` |
| Image | `Image` |
| Business | `Briefcase` |
| Education | `GraduationCap` |
| Legal | `Scale` |
| Pets | `PawPrint` |
| Productivity | `Clock` |

## 4. Functional icon mapping (UI chrome, not categories)

| Purpose | Lucide icon |
|---------|--------------|
| Search | `Search` |
| Theme toggle (light) | `Sun` |
| Theme toggle (dark) | `Moon` |
| Decorative sparkle (near the logo mark) | `Sparkles` — used sparingly, echoes the logo's own sparkle motif |
| Wrench / tools stat | `Wrench` |
| Shield / secure stat | `ShieldCheck` |
| No-signup / user stat | `UserCheck` |
| External link | `ArrowUpRight` |
| Chevron (accordion/select) | `ChevronDown` |
| Close (dialog/drawer) | `X` |

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Replaced the custom inline-SVG icon set with Lucide throughout | User-directed; "never mix icon libraries" |
