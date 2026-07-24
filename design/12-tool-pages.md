# 12 — Tool Pages

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Whoever touches `apps/web/app/[category]/[tool]/page.tsx`
> **Supersedes:** `docs/DESIGN-SPEC.md §6.3` visual specifics; the plugin architecture itself (`docs/13`) is unchanged — every tool still renders from this one template.

---

## 1. The one universal template

**Never redesign a tool page individually.** Every one of the (eventually 1,000+) tools renders through this exact structure — only the content differs, driven by the plugin's `config`/`content`/`inputFields`/`present()`.

```
Breadcrumb
  ↓
Header (category icon + title + summary)
  ↓
Tabs: Calculator | Formula | Examples | FAQ
  ↓
  [Calculator tab] Inputs → Result card → Ad slot
  ↓
Assumptions
  ↓
Related tools
  ↓
Article (long-form SEO content)
  ↓
Footer
```

This matches the current build (`apps/web/app/[category]/[tool]/page.tsx`) structurally — the rebrand changes the *visual* tokens (radius, color, icons, fonts) each piece uses, not the section order.

## 2. Component sourcing

| Section | Component | Spec |
|---------|-----------|------|
| Tabs | `Tabs` (`packages/ui`) | `10-navigation.md` pattern, ARIA tabs (`16-accessibility.md`) |
| Inputs | Generic form renderer (`ToolRunner`) | `08-inputs.md` |
| Result | `ResultCard` | `07-cards.md §2`, gradient signature |
| Ad slot | `AdSlot` | Reserved height, no CLS (`docs/19-ADS-ARCHITECTURE.md`) |
| Related tools | Chips | `rounded-full` chip style (unchanged — chips stay pill-shaped even though cards/buttons don't, see `06-buttons.md` vs. chip as its own small pattern) |

## 3. What never changes per-tool

- Section order.
- Card/button/input radii and colors.
- Tab labels (`Calculator`/`Formula`/`Examples`/`FAQ`) and their hide-if-empty rule (`docs/DESIGN-SPEC.md §5.9`, unchanged).

## 4. What does change per-tool

- The actual inputs, their labels/units.
- The result's primary/secondary lines (including `wide` blocks for code/JSON/JWT output, `packages/core`'s `ResultLine.wide`).
- The explanation, assumptions, article, and FAQ copy.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Restated the universal-template rule under the new visual system | Explicit reminder this rebrand is a re-skin, not a re-architecture, of the plugin-rendered page |
