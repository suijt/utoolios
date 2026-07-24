# 14 — Dark Mode

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone adding a new surface or component
> **Supersedes:** `docs/DESIGN-SPEC.md §7` token values (structure unchanged, values updated for the new palette).

---

## 1. Surface mapping

| Surface | Light | Dark |
|---------|-------|------|
| Page background | `#F8FAFC` (gray-50) | `#0F172A` (gray-900) |
| Card/surface | white | `gray-800` (`#1E293B`) |
| Border | `gray-200` | `gray-700` |
| Body text | `gray-900` | `gray-50` |
| Muted text | `gray-500` | `gray-400` |
| Category tile tint | `bg-<color>/10` | `bg-<color>/10` (unchanged — low-opacity tints read fine on dark) |
| Logo wordmark (live text) | `gray-900` | `white` |
| Logo mark (image) | `icon-mark.png`, unchanged | Same asset — the transparent cutout's own colors read on both surfaces (`01-brand-guidelines.md §1`) |

## 2. Gradient consistency

The signature gradient (`02-colors.md §2`) is **identical in both modes** — it's already a saturated, self-contained color statement that doesn't need surface-based adjustment. Never dim or desaturate it for dark mode.

## 3. Shadows in dark mode

Soft shadows (`07-cards.md §1`) are barely visible on a dark background by default — rely more on the `border` than the `shadow` for card definition in dark mode; don't compensate by making the shadow darker/heavier (that reintroduces the "heavy Material shadow" look this rebrand explicitly avoids).

## 4. Toggle behavior

Unchanged from current implementation: class-based (`dark` on `<html>`), persisted to `localStorage`, no-flash init script runs before paint, defaults to OS `prefers-color-scheme` when no stored preference exists.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Updated to reference new gray-800 (card surface) explicitly; confirmed logo mark needs no dark variant | Rebrand consistency pass |
