# 07 — Cards

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone building a card component

---

## 1. Radius and elevation

- **Radius: 20px** (`rounded-[20px]` — new `rounded-card` token, up from v1's 16px/1rem).
- **Resting shadow:** soft only — `shadow-sm` (Tailwind default is already soft, no heavy Material-style elevation). Never add a hard 1px `box-shadow` that reads as a border-duplicate.
- **Border:** `border border-gray-200 dark:border-gray-700` — always paired with the shadow, not instead of it.
- **Hover:** `hover:shadow-md hover:-translate-y-0.5`, animated via Framer Motion at 120ms (`15-animations.md`), not a bare CSS transition (for consistent easing across the app).

## 2. Card types

| Type | Component | Notes |
|------|-----------|-------|
| Category tile | `CategoryTile` (`packages/ui`) | Icon + label + real count. Padding `p-5`. |
| Tool card | `ToolCard` (`packages/ui`) | Icon + title + category label + summary. No rating stars, no usage count (honesty rule). Padding `p-5`. |
| Result card | `ResultCard` (`packages/ui`) | The one card that breaks the neutral-surface rule — signature gradient background (`02-colors.md §2`), white text, `p-6`. |
| Stat card (within `StatBar`) | inline in `StatBar` | No border/shadow of its own — lives inside the bar's single soft surface. |

## 3. Empty and loading states

- **Empty state:** icon (muted `text-gray-400`) + one line of copy + optional single action. Never a bare "No results" with nothing else.
- **Loading skeleton:** `animate-pulse` blocks matching the real content's shape (e.g., a tool-card skeleton has the same icon-circle + two text-bar shape as the real card) — never a generic spinner in place of card content.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Radius 16px → 20px; hover lift moved to Framer Motion; added empty/loading state rules | Rebrand polish pass; empty/loading states weren't previously specified |
