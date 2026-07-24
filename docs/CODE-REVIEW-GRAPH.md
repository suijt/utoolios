# CODE-REVIEW-GRAPH — UToolios

> **Status:** v1 (generated from the actual codebase, not from memory) · **Owner:** CTO
> **Purpose:** A reviewer's map — what depends on what, how data flows, and where to focus review effort. Use it to review the code (human or AI) and to onboard. Regenerate when structure changes.
> **Verified facts (2026-07-22):** `packages/core` imports nothing internal ✓ · no circular/upward deps ✓ · no `@/` app-alias leaking into packages ✓ · dependency direction is acyclic and points inward to `core`.

---

## 1. Package dependency graph (verified edges)

Every arrow was extracted from real `@utoolios/*` imports. Direction points **inward to `core`** (Clean Architecture, `04`/`05`). No cycles.

```mermaid
flowchart TD
    subgraph deploy["Deployable"]
        web["apps/web<br/>Next.js · 10 files"]
    end
    subgraph libs["Shared libraries"]
        engine["packages/engine<br/>routing·metadata·jsonld·sitemap"]
        ui["packages/ui<br/>ResultCard·Container"]
        tools["packages/tools<br/>3 tools + registry"]
    end
    subgraph center["Stable center (depends on NOTHING)"]
        core["packages/core<br/>ToolPlugin contract · format"]
        config["packages/config<br/>tokens · tailwind preset"]
    end

    web --> engine
    web --> tools
    web --> ui
    web --> core
    web -. tailwind .-> config
    engine --> core
    ui --> core
    tools --> core

    core -. type only .-> zod[("zod")]
    tools --> zod
    ui -. peer .-> react[("react")]
    web --> react
    web --> next[("next")]

    style core fill:#065f46,color:#fff
    style config fill:#065f46,color:#fff
    style web fill:#334155,color:#fff
    style engine fill:#1e40af,color:#fff
    style ui fill:#1e40af,color:#fff
    style tools fill:#1e40af,color:#fff
```

**Review check per edge:** no library depends on `apps/web`; `core` stays framework-free (only a *type-only* `zod` import); `engine` never imports `tools` (it operates on `ToolPlugin` passed in). All hold. ✓

---

## 2. Registration data-flow (how a folder becomes a live tool)

```mermaid
flowchart LR
    A["tools/&lt;cat&gt;/&lt;slug&gt;/index.ts<br/>defineTool(...)"] --> G["scripts/generate-tools-registry.mjs"]
    G --> R["tools/src/registry.generated.ts<br/>(imports all tools)"]
    R --> I["tools/src/index.ts<br/>getAllTools / getToolById / byCategory"]
    I --> W["apps/web (pages)"]
    A --> S["schema.ts (Zod)"]
    A --> C["calculator.ts (pure)"]
    style A fill:#065f46,color:#fff
    style G fill:#7c2d12,color:#fff
```

**Review focus:** the generator (`G`) is build-critical — if it breaks, nothing registers (it recently had a stray-token bug). `registry.generated.ts` is committed and must never be hand-edited.

---

## 3. Render data-flow (one tool page request)

```mermaid
flowchart TD
    Req["GET /finance/mortgage-calculator"] --> Page["app/[category]/[tool]/page.tsx<br/>(server · 162 LOC)"]
    Page --> Reg["getToolById() from tools registry"]
    Page --> Meta["engine: buildMetadata()"]
    Page --> Ld["engine: buildJsonLd()"]
    Page --> Bc["engine: breadcrumbs()"]
    Page --> Runner["ToolRunner (client · 113 LOC)"]
    Runner --> Parse["inputSchema.safeParse()"]
    Parse -->|valid| Calc["tool.calculate()"]
    Calc --> Present["tool.present()"]
    Present --> Card["ResultCard (ui)"]
    Parse -->|invalid| Err["error message"]
    style Page fill:#334155,color:#fff
    style Runner fill:#1e40af,color:#fff
    style Calc fill:#065f46,color:#fff
```

**Review focus:** `page.tsx` emits SEO (canonical, JSON-LD) — silent-catastrophic if wrong (`14`). `ToolRunner` is the generic renderer + the client boundary — review validation and edge cases here.

---

## 4. Review-priority heat map (where to look, and why)

Ranked by blast-radius × correctness-sensitivity. Grounded in real LOC.

```mermaid
flowchart TD
    P1["🔴 tool-plugin.ts (144)<br/>THE contract — change ripples to ALL tools"]
    P2["🔴 calculator.ts ×3 (23-36)<br/>correctness-critical — verify formulas (C2)"]
    P3["🟠 tool-runner.tsx (113)<br/>generic renderer + client boundary + validation"]
    P4["🟠 page.tsx (162)<br/>SEO output: canonical, JSON-LD, static params"]
    P5["🟠 engine/jsonld.ts (58) + metadata.ts (48)<br/>SEO correctness (silent bugs)"]
    P6["🟡 generate-tools-registry.mjs<br/>build integrity"]
    P7["🟢 ui, tokens, routing, sitemap<br/>low risk, presentational/derivable"]
    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
    style P1 fill:#7f1d1d,color:#fff
    style P2 fill:#7f1d1d,color:#fff
    style P3 fill:#9a3412,color:#fff
    style P4 fill:#9a3412,color:#fff
    style P5 fill:#9a3412,color:#fff
    style P6 fill:#a16207,color:#fff
    style P7 fill:#065f46,color:#fff
```

| Priority | Module | What to scrutinize |
|----------|--------|--------------------|
| 🔴 P1 | `core/tool-plugin.ts` | Contract changes; every field is a promise to 1000+ tools. Additive-only unless codemod (`49`). |
| 🔴 P2 | `tools/*/calculator.ts` | **Formula correctness** vs known values. Tests exist (6) — confirm they assert real-world-correct numbers, not just self-consistent ones (`35` caveat). |
| 🟠 P3 | `web/components/tool-runner.tsx` | Input coercion, `safeParse` handling, empty/NaN edge cases, `'use client'` bundle scope. |
| 🟠 P4 | `web/app/[category]/[tool]/page.tsx` | Canonical URL, JSON-LD shape, `generateStaticParams`, `notFound()` path. |
| 🟠 P5 | `engine/jsonld.ts`, `metadata.ts` | Only markup for on-page content; title/description limits; no fabricated data. |
| 🟡 P6 | `scripts/generate-tools-registry.mjs` | Runs before build; scans folders; committed output. |
| 🟢 P7 | `ui/*`, `config/*`, `engine/routing.ts`, `sitemap.ts` | Derivable/presentational — lowest risk. |

---

## 5. Code-review process graph (the gates)

```mermaid
flowchart LR
    Dev["change on a branch"] --> Local["pnpm verify<br/>(lint·typecheck·test)"]
    Local --> PR["Pull Request"]
    PR --> CI["GitHub Actions: install → gen → verify → build"]
    CI -->|green| Human["human review<br/>(correctness + assumptions, §4 P1/P2)"]
    Human --> Merge["merge → main"]
    Merge --> Deploy["Vercel auto-deploy"]
    CI -->|red| Fix["fix"]
    style CI fill:#1e40af,color:#fff
    style Merge fill:#065f46,color:#fff
```

**Note:** branch protection is not enforced (GitHub free + private repo). CI still runs and reports; the human gate at §4 (P1/P2) is the real quality backstop — automation can't verify a formula is *conceptually* right (`35`).

---

## 6. Review checklist (per PR)

- [ ] Dependency direction preserved — no new edge points away from `core`; `core` stays framework-free (§1).
- [ ] New tool = one folder + `pnpm gen`; no platform file hand-edited (M1 invariant, `13`).
- [ ] Formula correctness verified against a **known real-world value**, not just a passing self-referential test (§4 P2, `35`).
- [ ] SEO output intact: canonical, JSON-LD, metadata (§4 P4/P5, `14`).
- [ ] No fabricated data (ratings/usage/counts) — real registry data only (`DESIGN-SPEC` §0).
- [ ] `pnpm verify` + `pnpm --filter @utoolios/web build` green (evidence pasted).
- [ ] Accessibility: labels, focus, `aria-live` on results (`37`).

---

### Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v1 | (draft) | Initial code review graph generated from the live codebase | Requested; aids review + Sonnet handoff |
