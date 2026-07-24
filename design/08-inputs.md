# 08 — Inputs

> **Status:** v2 (rebrand) · **Owner:** Lead Product Designer · **Audience:** Anyone building a form field; implements against `apps/web/components/tool-runner.tsx`

---

## 1. Radius and base style

- **Radius: 16px** (`rounded-[16px]` — new `rounded-input` token, up from v1's `rounded-md`/6px).
- Base: `border border-gray-300 bg-white px-4 py-2.5 dark:border-gray-600 dark:bg-gray-800`.
- **Focus:** `focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none` — always visible.
- **Min height:** 44px (touch target floor).

## 2. Field anatomy

Every field: `<label>` (required, `text-sm font-medium`) → optional unit suffix (`text-gray-400`) → input/select → optional helper/error text below.

```
Loan amount ($)
[________________]
```

## 3. Kinds

| Kind | Rendering |
|------|-----------|
| `number` | `<input type="number" inputMode="decimal">`, unit shown inline in the label |
| `text` | `<input type="text">` |
| `select` | Native `<select>` styled to match the input radius/border (no custom dropdown chrome needed at this scale) |

## 4. Validation state

- **Error:** border `border-error`, helper text below in `text-error text-sm`, `role="alert"` on the message (matches current `ToolRunner` error pattern).
- Never rely on color alone — the error message text is the primary signal, color reinforces it (`16-accessibility.md`).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v2 | 2026-07-24 | Radius 6px → 16px | Rebrand polish pass |
