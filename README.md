# UToolios

> Thousands of free online tools. One trusted platform.

A universal online utility platform — thousands of tiny, fast, free single-purpose tools
(mortgage calculator, JWT decoder, BMI, and more), built as **plugins** on a thin platform
**engine** that auto-generates routing, SEO, structured data, sitemaps, search, ads, layout,
and accessibility for every tool.

## Engineering constitution

All architecture, principles, and decisions live in [`docs/`](./docs) (chapters `00`–`52`).
Start with [`docs/00-ENGINEERING-PRINCIPLES.md`](./docs/00-ENGINEERING-PRINCIPLES.md).
**Every engineering decision must trace back to these documents.**

## Repository layout (see `docs/05`, `docs/06`)

```
apps/
  web/                # The Next.js website (the product) — added in Stage 2
packages/
  core/               # The ToolPlugin contract + shared types (depends on nothing)
  engine/             # Tool discovery, SEO generation, registry — Stage 2
  tools/              # All tool plugins, one folder each — Stage 4
  ui/                 # Shared accessible design system — Stage 2
  config/             # Shared Tailwind tokens, TS base, lint presets
docs/                 # The engineering constitution (00–52)
```

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc)
corepack enable    # pin pnpm
pnpm install
pnpm dev           # run the site locally (once apps/web exists)
pnpm verify        # lint + typecheck + test — the same checks CI runs
```

## Status

**Phase 1 — Foundation.** Building the tool factory (engine + plugin contract + first
reference tool) toward milestone **M1**: *adding one folder yields a fully-optimized,
indexed tool with zero platform code changes.*

See [`docs/52-FUTURE-ROADMAP.md`](./docs/52-FUTURE-ROADMAP.md) for the full plan.
