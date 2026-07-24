# 03 — Typography

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone writing headings, body copy, or code blocks

---

## 1. Font stack (three fonts, three distinct jobs — never mixed within one job)

| Font | Package | Job | Where it appears |
|------|---------|-----|-------------------|
| **Inter** (Variable) | `next/font/google` | Primary UI font — all headings, body, labels, buttons, nav | Everywhere by default |
| **Geist** | `geist` npm package (`geist/font/sans`) | Display font, reserved for a small number of large marketing moments | Hero headline only (`11-homepage.md`), and large stat numbers in `StatBar` |
| **JetBrains Mono** | `next/font/google` | Monospace — code, formulas, structured data | JWT/JSON/Base64 `wide` result blocks, inline `<code>`, the formula line in a tool's "Formula" tab |

**Rule:** if you're not sure which font a piece of text should use, it's Inter. Geist is earned by exactly two use cases above — don't expand its usage without updating this file first, or the two-font system degrades into visual noise (the exact drift this folder exists to prevent).

---

## 2. Type scale

| Element | Classes | Font |
|---------|---------|------|
| Hero H1 | `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight` | Geist |
| Hero stat number (StatBar) | `text-2xl sm:text-3xl font-bold` | Geist |
| Section H2 | `text-2xl sm:text-3xl font-bold` | Inter |
| Card title | `font-semibold` | Inter |
| Body | `text-base text-gray-600 dark:text-gray-300` | Inter |
| Muted / labels | `text-sm text-gray-500` | Inter |
| Eyebrow / category | `text-xs uppercase tracking-wide text-gray-400` | Inter |
| Code / formula / JSON blocks | `text-xs sm:text-sm leading-relaxed` | JetBrains Mono |

Line-height: `leading-tight` for headings ≥ text-2xl, `leading-relaxed` for body copy and code blocks.

---

## 3. Weight usage

- **Extrabold (800):** hero H1 only.
- **Bold (700):** section H2, stat numbers.
- **Semibold (600):** card titles, button labels, table headers.
- **Medium (500):** nav links, secondary buttons.
- **Regular (400):** body copy, descriptions.

Never use more than 3 weights on a single screen — pick from the table above per element, don't introduce a one-off weight.

---

## 4. Vertical rhythm

Headings carry `mt-*` spacing from the scale in `04-spacing.md`, never arbitrary values. A section always follows: eyebrow (optional) → H2 → 1–2 line intro (optional) → content, with `mt-2`/`mt-3` between each, and `mt-16` before the section itself.

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Added Geist (hero/stats only) and JetBrains Mono (code contexts); Inter remains the default everywhere else | User-directed stack addition; scoped narrowly to avoid font sprawl |
