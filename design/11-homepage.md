# 11 — Homepage

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Whoever implements `apps/web/app/page.tsx`
> **Supersedes:** `docs/DESIGN-SPEC.md §6.2`. Honesty rule (§0 there) still fully applies — see §3 below for exactly how it constrains this section order.

---

## 1. Section order

```
Navbar
  ↓
Hero (headline, subheading, search, hero graphic)
  ↓
Popular searches (real tool chips)
  ↓
Stats bar
  ↓
Categories (real categories only)
  ↓
Popular tools (real tools, no ratings/usage)
  ↓
Recently added (real tools, sorted by real registry order — see §3)
  ↓
Why choose UToolios (feature badges)
  ↓
Footer
```

This adapts the requested template (`Hero → Search → Popular Searches → Categories → Featured → Trending → Recently Added → Popular This Week → Why Choose → Statistics → SEO → Newsletter → Footer`) to what we can honestly populate today — see §3 for what's deferred and why.

## 2. Hero

- **Layout:** left-aligned text (mobile: stacked, graphic hidden; `lg:`: two columns, text left, graphic right) — this is the exact fix from the `d8dc6b1` correction; centered hero text is wrong.
- **Headline:** "Find the right tool for **any task**." — "any task" in the signature gradient (`02-colors.md §2`), Geist font (`03-typography.md`).
- **Subheading:** one sentence, Inter, `text-gray-500`.
- **Search:** large pill input, leading `Search` icon (Lucide), trailing primary button on `sm:`+.
- **Hero graphic** (`lg:` only): the real logo mark (`icon-mark.png`) as centerpiece, with real category icons (Lucide, per `09-icons.md`) floating around it at small rotations — never invented illustration (`01-brand-guidelines.md §3`).

## 3. Honesty-constrained sections

| Requested section | Status | Why |
|---------------------|--------|-----|
| Popular searches | ✅ Built | Real tool titles, linked |
| Categories | ✅ Built | Real categories with real counts only |
| Featured / Popular tools | ✅ Built | Real tools, no stars, no "used by" |
| Recently added | ✅ Buildable now | Sort the real registry by the tool folder's actual creation — needs a real `publishedAt`-style field added to `ToolConfig` (small, honest addition: a real date, not a fake one) |
| Trending | ⛔ Deferred | Requires real analytics (`docs/31-ANALYTICS.md`) — not wired yet. Do not fake a ranking. |
| Popular this week | ⛔ Deferred | Same — needs real traffic data |
| Newsletter signup | ⛔ Omitted | No email infrastructure exists; a non-functional signup form is dishonest UX (same principle as omitting "Sign in" until auth exists) |
| Statistics (as separate from stats bar) | Merged into Stats bar | Avoid a duplicate section — one honest stats bar (`docs/DESIGN-SPEC.md §5.5`: real tool count + true statements) covers this |

**When traffic/analytics data becomes real, revisit this file and promote Trending/Popular-this-week from deferred to built — don't build the visual shell first and backfill fake data into it.**

## 4. Container

`max-w-5xl` (`Container wide`) — unchanged from current build.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Reconciled the requested template against the honesty rule; documented what's deferred and why | Prevent a future session from fabricating Trending/newsletter data to match the template literally |
