# DESIGN-SPEC — UToolios Visual & Component Specification

> **Status:** v1 · **Owner:** CTO / Product Architect · **Audience:** Whoever implements the UI (human or Sonnet)
> **Purpose:** The precise, implementable target for the MVP look, derived from the two brand mockups in `/brand`. Match this exactly. Governed by `10-FRONTEND-ARCHITECTURE.md`, `19-ADS-ARCHITECTURE.md`, `37-ACCESSIBILITY.md`.
> **How to use:** This is the source of truth for layout, color, spacing, and every component. If a component isn't specified here, follow the closest specified pattern. Build with Tailwind classes; keep tokens in `packages/config`.

---

## 0. Honesty rules (do NOT violate — trust moat, `02` C2/C7)

The mockups contain **placeholder marketing numbers**. We have **0 users and 3 live tools**. Therefore:

| Mockup shows | We render instead (until real data exists) |
|--------------|--------------------------------------------|
| "4.9 (2,431 reviews)" star ratings | **Omit ratings entirely.** No stars until we have a real rating source. |
| "Used by 2.4M+" | **Omit.** No usage counts until analytics provides real numbers (`31`). |
| "120+ tools", "1,000+ Free Tools" | Use the **real registry count** (`getAllTools().length`). Say "Free tools" without a fake number, or the true count. |
| Categories we don't have yet (Food, Travel, Image, etc.) | **Only render categories that have ≥1 published tool.** No empty/"Coming soon" tiles in MVP. |

Rule of thumb: **the design language matches the mockup; the data is always real.** Better to show less than to fabricate.

---

## 1. Design feel (the "not too plain" fix)

The current build is too flat. Target feel from the mockup:

- **Polished, soft, and colorful-but-clean.** White/very-light surfaces, generous whitespace, **rounded corners** (cards `rounded-2xl`), **soft shadows** (`shadow-sm` resting → `shadow-md` on hover), subtle borders (`border-gray-200`).
- **Color used with intent:** blue is the brand anchor; the **blue→cyan→violet gradient** is the signature accent (hero word, logo, primary result card). Category tiles use **soft pastel tints** of their category color.
- **Depth via layering:** cards lift slightly on hover (`hover:-translate-y-0.5 hover:shadow-md transition`).
- **Generous spacing:** sections separated by `mt-16`/`mt-20`; card padding `p-5`/`p-6`.

---

## 2. Color tokens (exact — already in `packages/config/src/tokens.ts`)

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| Primary | `#2563EB` | `primary` | Brand, buttons, links |
| Primary hover | `#1D4ED8` | `primary-hover` | Button hover |
| Secondary | `#06B6D4` | `secondary` | Tech accent, gradient mid |
| Accent | `#8B5CF6` | `accent` | Creativity, gradient end |
| Success | `#10B981` | `success` | Finance category, positive |
| Warning | `#F59E0B` | `warning` | Home category, sparkle |
| Error | `#EF4444` | `error` | Health category, alerts |
| Gray 50→900 | `#F8FAFC`→`#0F172A` | `gray-*` | Surfaces, text, borders |

**Signature gradient** (logo, hero word, primary result card):
```
bg-gradient-to-r from-primary via-secondary to-accent    /* text: add bg-clip-text text-transparent */
bg-gradient-to-br from-primary to-accent                 /* surfaces like the result card */
```

**Per-category color** (extend as categories are added; from the mockup's icon tiles):

| Category | Color token | Tile bg | Icon fg |
|----------|-------------|---------|---------|
| finance | success (green) | `bg-success/10` | `text-success` |
| developer | accent (violet) | `bg-accent/10` | `text-accent` |
| health | error (red) | `bg-error/10` | `text-error` |
| text | primary (blue) | `bg-primary/10` | `text-primary` |
| home | warning (orange) | `bg-warning/10` | `text-warning` |
| (future) food | error/pink | `bg-error/10` | `text-error` |
| (future) travel | primary | `bg-primary/10` | `text-primary` |
| (future) image | secondary (cyan) | `bg-secondary/10` | `text-secondary` |
| (future) business | secondary | `bg-secondary/10` | `text-secondary` |
| (future) education | accent | `bg-accent/10` | `text-accent` |

---

## 3. Typography

- Font: **Inter** (already wired via `next/font`). Fallback system sans.
- Scale:

| Element | Classes |
|---------|---------|
| Hero H1 | `text-4xl sm:text-5xl font-extrabold tracking-tight` |
| Section H2 | `text-2xl font-bold` |
| Card title | `font-semibold` |
| Body | `text-gray-600 dark:text-gray-300` |
| Muted/labels | `text-sm text-gray-500` |
| Eyebrow/category | `text-xs uppercase tracking-wide text-gray-400` |

---

## 4. Shape, spacing, elevation

| Property | Value |
|----------|-------|
| Card radius | `rounded-2xl` (define `rounded-card` = `1rem` in preset; update from current `0.75rem`) |
| Pill/chip radius | `rounded-full` |
| Card border | `border border-gray-200 dark:border-gray-700` |
| Card resting shadow | `shadow-sm` |
| Card hover | `hover:shadow-md hover:-translate-y-0.5 transition` |
| Section gap | `mt-16` (large), `mt-6`/`mt-8` (within) |
| Container | `max-w-5xl` for homepage; `max-w-3xl` for tool/article pages |

> **Note:** widen the homepage container to `max-w-5xl` (the mockup homepage is wider than the current `max-w-3xl`). Keep tool/content pages at `max-w-3xl` for readability.

---

## 5. Component specs (Tailwind recipes)

### 5.1 Button
- **Primary:** `inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-hover transition`
- **Primary gradient (CTAs):** `bg-gradient-to-r from-primary to-accent` variant.
- **Secondary:** `rounded-full border border-gray-300 px-5 py-2.5 font-medium hover:border-primary dark:border-gray-600`

### 5.2 Search input (hero)
- `w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-base shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-800`
- Optional leading magnifier icon (absolute left) + trailing primary "Search" button inside the pill on `sm+`.

### 5.3 Category tile (homepage grid)
Matches the mockup's colorful tiles:
```
<div class="rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition dark:border-gray-700">
  <CategoryIcon size=48 />                     // colored pastel tile + glyph
  <h3 class="mt-3 font-semibold">{label}</h3>
  <p class="text-sm text-gray-500">{realCount} tools</p>   // REAL count
</div>
```
Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`.

### 5.4 Tool card (popular / listings)
```
<a class="block rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition dark:border-gray-700">
  <div class="flex items-center gap-3">
    <CategoryIcon size=40 />
    <div>
      <span class="font-semibold">{title}</span>
      <span class="block text-xs uppercase tracking-wide text-gray-400">{categoryLabel}</span>
    </div>
  </div>
  <p class="mt-3 text-sm text-gray-500">{summary}</p>
  // NO rating stars, NO "used by" (honesty rule §0)
</a>
```

### 5.5 Stats / trust bar (hero)
4-up row, each: icon + bold value + label. Use **real or honest** values:
```
grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-gray-50 p-6 dark:bg-gray-800/40
```
Items: `{realToolCount} Free Tools` · `100% Free Forever` · `No Signup Required` · `Secure & Private`. (Tool count is real; the other three are true statements, not metrics.)

### 5.6 Feature badges row (footer area)
Inline flex-wrap, icon + text: Fast & Reliable · Secure & Private · Mobile Friendly · Accessible · Free Forever. `text-sm text-gray-500`.

### 5.7 Rating stars
**Build the component but DO NOT render it anywhere yet** (no data, §0). Signature: `<Stars value={number} count={number} />`. Wire it only when a real rating source exists.

### 5.8 Ad slot (`19`)
Reserved-height placeholder to prevent CLS — dashed box in MVP:
```
<div class="flex h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 text-xs text-gray-400 dark:border-gray-700">
  Advertisement
</div>
```
Always reserve the height even when empty (CLS = 0). Real AdSense wires behind the `AdSlot` abstraction later.

### 5.9 Tabs (tool page)
`Calculator | Formula | Examples | FAQ` — accessible tablist:
- `role="tablist"`, each `role="tab"` `aria-selected`, keyboard arrow support.
- Active: `border-b-2 border-primary text-primary font-medium`; inactive: `text-gray-500`.
- MVP scope: **Calculator** tab = the tool; **Formula/Examples/FAQ** = content from the plugin. If a tab has no content, hide it.

### 5.10 Result card (tool page) — the signature gradient
```
<div class="rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-white">
  <div class="text-sm/relaxed opacity-90">{primary.label}</div>
  <div class="text-4xl font-bold">{primary.value}</div>
  <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
    {secondary lines: label (opacity-80) + value (font-semibold)}
  </div>
</div>
```
This replaces the current gray ResultCard with the mockup's gradient panel. Keep `aria-live="polite"`.

### 5.11 Breadcrumb, tags
- Breadcrumb: `text-sm text-gray-500`, `/` separators, last item `aria-current="page"`.
- Tag/chip: `rounded-full border border-gray-200 px-3 py-1 text-sm`.

---

## 6. Page layouts

### 6.1 Header (sticky)
`logo (left) · nav: Tools, Categories, Resources, About (center-right, hidden on mobile) · search icon · theme toggle · "Sign in" primary button (right)`.
- MVP: "Resources"/"About" can link to `#` or be omitted; **"Sign in"** should be omitted or disabled until auth exists (`23`) — do not show a non-functional auth button. Prefer omitting.
- Backdrop blur, border-bottom, `sticky top-0 z-40`.

### 6.2 Homepage (order, `max-w-5xl`)
1. **Hero:** H1 "Find the right tool for `any task`." (gradient on "any task"), subtitle, big search pill, popular chips ("🔥 Popular:" + real tool chips), then the **stats bar** (§5.5).
2. **Categories:** "Browse by category" → colorful tile grid (§5.3), real categories/counts only.
3. **Popular tools:** "Popular tools" → tool-card grid (§5.4), no fake ratings.
4. **Feature badges** (§5.6) — in footer or above it.

### 6.3 Tool page (`max-w-3xl`)
1. Breadcrumb.
2. Header row: `CategoryIcon` + H1 title (+ rating slot, hidden). Summary line.
3. **Tabs** (§5.9): Calculator active.
4. Calculator: styled inputs (labels + units), then the **gradient result card** (§5.10), instant.
5. **Ad slot** (§5.8) below result.
6. "How it works" (explanation) + Assumptions.
7. Related tools (chips).
8. Article (rendered markdown).
9. FAQ (accessible disclosure list).
JSON-LD stays server-rendered (already implemented).

### 6.4 Category page `/[category]` (NEW — 6d)
- Breadcrumb (Home / Category).
- H1 `{CategoryIcon} {Category} tools`.
- Tool-card grid of that category (§5.4).
- Short intro paragraph (SEO).

---

## 7. Dark mode (exact)

| Surface | Light | Dark |
|---------|-------|------|
| Page bg | white | `gray-900` (#0F172A) |
| Card/surface | white | `gray-800` |
| Border | `gray-200` | `gray-700` |
| Body text | `gray-900` | `gray-50` |
| Muted text | `gray-500` | `gray-400` |
| Category tile tint | `bg-<color>/10` | `bg-<color>/10` (keep; reads on dark) |
| Logo wordmark | `gray-900` | `white` |

Toggle + no-flash init already implemented. Keep the gradient result card identical in both modes (it's already colored).

---

## 8. Icon set (category glyphs)

`CategoryIcon` already maps finance/developer/health/text/home. When adding categories, follow the mockup's icon set (calculator, house, chef hat, plane, `</>`, document, image, heart, grad cap, chart, health-plus, scales, paw, leaf, clock, globe, wand, droplet, tools, PDF, sparkle). Keep them as inline stroke SVGs (`stroke="currentColor" strokeWidth=2`), colored by the category token, on a pastel tile.

---

## 9. Accessibility (non-negotiable, `37`)

- All interactive elements keyboard-operable; visible focus rings (`focus:ring-2 focus:ring-primary/30`).
- Tabs implement the ARIA tabs pattern with arrow-key navigation.
- Result card `aria-live="polite"`.
- Color never the sole signal; contrast ≥ 4.5:1 (check category tints on white/dark).
- Every input has a `<label>`; icons `aria-hidden`.

---

## 10. Implementation order (for the executor)

1. Update `packages/config` preset: `rounded-card` → `1rem`; confirm gradient utilities.
2. `packages/ui`: rebuild `ResultCard` as the gradient panel (§5.10); add `Button`, `Stars` (unused), `AdSlot`, `Tabs`, `StatBar`, `ToolCard`, `CategoryTile` as shared components.
3. Homepage: apply §6.2 with `max-w-5xl`, category tiles, popular cards (no fake data).
4. Tool page: apply §6.3 — tabs + gradient result + ad slot + article/FAQ.
5. Category page `/[category]`: new route per §6.4.
6. Verify: `pnpm verify` + `pnpm --filter @utoolios/web build` green; check dark mode; Lighthouse.
7. Then build the 7 remaining tools (`03` plan): compound-interest, loan-repayment (finance); jwt-decoder, json-formatter, uuid-generator (developer); calorie-tdee (health); tile-calculator (home).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v1 | (draft) | Initial design spec from /brand mockups | Homepage v1 too plain; pin exact target before Sonnet execution |
