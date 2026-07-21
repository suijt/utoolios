# 45 — Secrets Management

> **Status:** Draft v1 · **Owner:** CTO / Infrastructure & Security Lead · **Audience:** Everyone who writes code, config, or a CI job — human or AI
> **Governed by:** `00-ENGINEERING-PRINCIPLES.md` and the relevant prior chapters (`07-DEVELOPMENT-WORKFLOW`, `12-DATABASE-ARCHITECTURE`, `25-SECURITY`, `28-OBSERVABILITY`, `29-LOGGING`, `40-CI-CD`, `41-DOCKER`).

---

## 1. The One Rule: No Secret Ever Enters Git History

`25` (§9) already stated the conclusion; this chapter is the mechanism that makes it true in practice. Every API key, database password, signing key, webhook secret, and third-party token used by UToolios follows one absolute rule: **it is never committed to git, in any form, at any point** — not in a config file, not in a code comment, not in a "temporary" test fixture, not in a commit that gets reverted two minutes later.

That last clause matters more than it sounds. Git history is permanent by design: a revert does not erase the earlier commit, it adds a new one. A secret typed into a file and committed, then deleted in the next commit, is still sitting in `git log -p` forever, retrievable by anyone with clone access — a future public fork, a leaked backup, or an AI coding agent that greps history looking for "how did we configure the Stripe key before."

With a solo founder shipping tools daily and increasingly generating code with AI (`35`), this risk is structural, not hypothetical: an AI assistant asked to "add the Mailgun integration" will happily paste a real key into a file if one is visible in its context window, because nothing stops it. The defense cannot be "remember not to" — it has to be a wall the key can't get past even if someone tries.

**Simple explanation:** git history is not a whiteboard you can wipe — it's a notarized paper trail where every page ever written stays in the folder, even the ones you later crossed out. Writing a real API key into a commit is mailing a copy of your house key to everyone who will ever clone the repo, past, present, or future.

> **CTO note:** the most common real-world leak isn't a developer typing a key into `page.tsx` — it's a `.env` file `git add`-ed once, in a hurry, before `.gitignore` caught up. The scanning in `§9` exists precisely because "I'll remember to `.gitignore` it" fails silently and only needs to fail once.

---

## 2. `.env.example` — Documenting the Shape, Never the Substance

Every deployable unit (the Next.js app today; the NestJS API from Phase 3) ships a `.env.example` file committed to git, listing **every environment variable the app reads, by name, with a placeholder value and a one-line comment** — and nothing real.

```
# .env.example — committed. No real values ever live here.

# Public, safe to expose to the browser (Next.js NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SITE_URL=https://utoolios.com
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx   # (19)

# Deploy-time only, never exposed to the browser
CLOUDFLARE_API_TOKEN=changeme                            # used by CI deploy step (40)

# Phase 2+ — present in the file now so the shape is documented before it's needed
DATABASE_URL=postgresql://user:pass@host:5432/db          # (12)
REDIS_URL=redis://host:6379                                # (21)
MEILISEARCH_API_KEY=changeme                                # (32)

# Phase 3+
JWT_SIGNING_SECRET=changeme                                 # (23)
STRIPE_SECRET_KEY=changeme                                  # billing (03)
```

`.env.example` is the **contract**: any variable a developer or AI agent needs to run the app locally is discoverable by reading one committed file, never by asking the founder or hunting through a password manager. A CI check (`40`) fails the build if `process.env` (or its NestJS equivalent, Phase 3) references a variable not present in `.env.example` — the documented shape and the real code can never silently drift apart.

The real `.env` file — actual values — is `.gitignore`d from commit zero and never exists anywhere git can see it.

| File | Committed to git? | Contains |
|---|---|---|
| `.env.example` | Yes | Variable names, placeholders, comments, phase markers |
| `.env` / `.env.local` | Never | Real local-dev values, ignored by `.gitignore` |
| Secrets manager (§4) | N/A — lives outside git entirely | Real staging/production values |

**Simple explanation:** `.env.example` is the packing list for a suitcase, not the suitcase itself — it tells you exactly what needs to be packed ("passport, charger, adapter") without anyone needing to see your actual passport number. A new contributor, or an AI agent bootstrapping the `bmi-calculator` locally, reads the list and knows precisely what to fill in — never what the real values are.

---

## 3. Per-Environment Separation — a Leak in One Box Stays in That Box

Every secret is scoped to exactly one environment: **local dev, preview/staging, and production are separate secret universes with zero overlap.** A staging database password, a staging Stripe test key, a preview deployment's Cloudflare token — none of them work against production, by construction, not by convention.

| Environment | Secrets live in | Blast radius if leaked |
|---|---|---|
| Local dev | Developer's own `.env` (real but low-value: test API keys, local DB) | That developer's machine only; no production access possible |
| CI (per PR / preview) | GitHub Actions encrypted secrets, scoped to a "preview" environment (§7) | The preview deploy only — no production credential is ever present |
| Staging (Phase 2+) | Secrets manager, staging-scoped IAM role | Staging data only; staging DB is never a copy of production with real user data |
| Production | Secrets manager, production-scoped IAM role, tightest access | Real impact — but isolated from every other environment by IAM boundary, not just by naming convention |

This is the same principle `24` applies to authorization roles, applied to credentials: **no single leaked value should ever cross an environment boundary.** A compromised preview-deploy token that can only deploy a preview build is an annoyance; a compromised token that happens to also be the production deploy token is an incident.

**Simple explanation:** hotel key cards are cut per-room, not one master key handed to every guest. Losing the key to room 204 (a staging secret) is a minor, contained problem. Per-environment separation is choosing to cut per-room keys from day one, rather than issuing a master key because "we only have one guest right now" and having to re-key the whole building the day that stops being true.

> **CTO note:** it's tempting, as a solo founder with one production environment and one staging environment, to reuse the same third-party API key across both "because it's simpler." Resist this specifically for anything with write access or cost exposure (ad network APIs, payment provider keys, Phase 3+). The five minutes saved provisioning a second key is not worth a staging bug that silently mutates production data or spends real money because the two environments were never actually separate.

---

## 4. From `.env` Files to a Managed Secrets Store — Built as a Seam

Phase 1 has genuinely few secrets: a Cloudflare API token for deploys, an AdSense client ID (public, `19`), an analytics write key (`31`). At this size, the platform's own encrypted environment-variable store (the hosting provider's dashboard, backing CI and runtime env injection) is a perfectly adequate secrets store — standing up AWS Secrets Manager for four values is the kind of premature infrastructure `00`'s YAGNI principle exists to prevent.

What we build now, regardless of size, is the **seam**: a single config-access abstraction that every part of the codebase goes through, never `process.env` accessed ad hoc from a dozen call sites.

```mermaid
flowchart LR
    Code["App code<br/>(e.g. adslot loader, DB client)"] --> Loader["getSecret(key)<br/>config abstraction"]
    Loader -->|Phase 1| Env["process.env<br/>(platform env vars)"]
    Loader -->|Phase 2+| Mgr["AWS Secrets Manager /<br/>SSM Parameter Store"]
    style Loader fill:#1e40af,color:#fff
    style Mgr fill:#065f46,color:#fff
```

At the point Phase 2 introduces Postgres, Redis, and Meilisearch (`12`, `21`, `32`) — real per-service credentials, some needing rotation, some fetched by multiple services — the loader's backing implementation switches to a real secrets manager, and **no call site anywhere in the codebase changes.** That is the entire payoff of building the seam early: the migration from four env vars to fifty rotating credentials is a swap behind an interface, not a rewrite.

| | AWS Secrets Manager | SSM Parameter Store |
|---|---|---|
| Best for | High-value, dynamic secrets needing rotation (DB creds, `12`) | Static config and lower-sensitivity values (feature flags, non-rotating API keys) |
| Native rotation | Yes, built-in rotation Lambdas for RDS/Postgres | No — rotation is manual/scripted |
| Cost | Per-secret, per-API-call | Cheaper; standard tier is free |
| Chosen when | The secret changes on a schedule and something must update automatically | The value is stable and read infrequently |

UToolios uses both, by value: Secrets Manager for anything that rotates (§6), Parameter Store for everything else — a deliberate cost decision, not "use one tool for everything."

**Simple explanation:** Phase 1 is a small business keeping its few keys in a locked drawer in the office — adequate for four keys. Phase 2 is that business growing to fifty employees needing fifty different door and safe combinations, some of which must change automatically every month — at that point you install a proper keyed-card system with an audit log. Building the config-loader seam now means the *card readers* (call sites in code) never need replacing when the *back-office system* behind them upgrades.

---

## 5. How Secrets Reach Running Code

A secret is only ever **injected at runtime**, never baked into a build artifact. This distinction matters most for Docker images (`41`): a secret passed as a build `ARG` becomes a permanent, extractable layer in the image; a secret passed as a runtime environment variable at container start never touches the image at all.

```mermaid
flowchart TD
    Store["Secrets store<br/>(env-vars Phase 1 / Secrets Mgr Phase 2+)"] -->|1: local dev| Dev["Developer .env.local<br/>(real, low-value test creds)"]
    Store -->|2: CI run| CI["GitHub Actions<br/>encrypted secret, env-scoped"]
    Store -->|3: container start| Runtime["Container process env<br/>(41) — never baked into image layers"]
    Store -->|4: deploy platform| Deploy["Deployment platform<br/>fetches at boot (42)"]
    style Store fill:#7c2d12,color:#fff
```

| Injection point | Mechanism | Rule |
|---|---|---|
| Local development | `.env.local`, never committed | Real values, but always low-value (test/sandbox API keys) |
| CI pipeline (`40`) | GitHub Actions encrypted secrets, scoped per environment | Masked in logs automatically; fork PRs never receive production-tier secrets |
| Docker build (`41`) | Never — build args carry no secrets | A secret in a Dockerfile `ARG`/`ENV` is a leaked secret, full stop |
| Container runtime (`41`) | Injected as process env at `docker run` / task start | Read once at boot, held in memory only |
| Deployment platform (`42`) | Fetched from the secrets store at deploy/boot time | The deploy tool has read access; the built artifact never does |

**Simple explanation:** think of the difference between printing your Wi-Fi password on a poster taped inside the router's box (baked into the image — anyone who ever gets the box gets the password forever) versus typing it into the router fresh each time it boots (runtime injection — nothing physical carries it). A Docker image is a box that gets copied, scanned, and stored in a registry; nothing should be printed on the inside of it.

> **CTO note:** the single most common secrets-management mistake in containerized apps is treating a build `ARG` as "private enough because the image isn't public." It isn't private — anyone with registry pull access, or anyone who later scans the image for a vulnerability report (`41`), can extract every layer's contents trivially. If a value must reach the container, it goes in at `docker run`/task-start time, never at `docker build` time. No exceptions, no "just this once for a quick test."

---

## 6. Least Privilege and Scoping

`25` (§10) established least privilege as a platform-wide rule; here is how it applies specifically to secrets. Every credential is scoped to **exactly** the service and the action it needs — never a broad, reusable "app" credential shared across unrelated systems.

| Secret | Scoped to | Not allowed to do |
|---|---|---|
| Cloudflare deploy token | Deploy action for one project | Cannot modify DNS, WAF rules, or other Cloudflare zones |
| Server-side tool's storage credential (e.g. OCR's temp-file bucket, `13`) | Read/write to that one bucket prefix | Cannot touch any other bucket or the wider AWS account |
| Database role (Phase 2, `12`) | CRUD on the schemas that service actually queries | Cannot `DROP TABLE`, alter schema, or read unrelated tables |
| CI deploy credential (`40`) | Deploy to the specific target environment the workflow runs against | Preview-workflow credential cannot deploy to production |
| Third-party ad/analytics keys | Read/write scope the vendor's dashboard actually requires | No admin-level API access granted "just in case" |

This scoping is what keeps a single leaked credential from becoming a full-account compromise. A stolen OCR-bucket credential lets an attacker read or write files in one prefix — expensive to clean up, but bounded. A stolen "AWS account admin" key used everywhere "for convenience" is an unbounded incident.

**Simple explanation:** it's the difference between a valet key that only starts the engine and drives, and the owner's key that also opens the glovebox and the trunk. Every integration in UToolios gets a valet key scoped to exactly what it needs to do its one job — losing it is inconvenient, not catastrophic.

---

## 7. Rotation — Scheduled and Low-Friction by Design

A secret that has never rotated in two years is a secret whose actual exposure is unknown — anyone who ever had legitimate or illegitimate access to it in that window still has a working credential today. Rotation converts "was this ever leaked?" from an unanswerable question into "how long ago was the last rotation" — bounding the damage window by policy instead of by luck.

```mermaid
sequenceDiagram
    participant Sched as Scheduled trigger
    participant Mgr as Secrets Manager
    participant Svc as Dependent service
    participant Old as Old credential
    Sched->>Mgr: Rotation window reached
    Mgr->>Svc: Provision new credential
    Mgr->>Svc: Verify new credential works
    Svc-->>Mgr: Health check passes
    Mgr->>Old: Revoke old credential
    Note over Mgr,Old: Old credential kept briefly as fallback,<br/>then revoked once new one is confirmed live
```

| Secret class | Rotation cadence | Mechanism |
|---|---|---|
| Database credentials (Phase 2, `12`) | Every 30-90 days, automatic | AWS Secrets Manager native rotation Lambda |
| Internal service-to-service tokens | Every 30-90 days, automatic | Secrets Manager rotation |
| Third-party API keys without native rotation support (ad networks, analytics) | Every 90-180 days, manual/scripted | Documented runbook, calendar reminder as a stopgap until scripted |
| JWT signing keys (Phase 3, `23`) | Key rotation with overlap window (old key still verifies during transition) | Scheduled, never abrupt — avoids invalidating live sessions instantly |
| CI/CD deploy tokens | Every 90 days, or immediately on any suspected exposure | Manual regeneration, updated in GitHub environment secrets |

**Simple explanation:** rotation is changing the locks on a schedule, not just when you suspect a key was stolen. A landlord who re-keys apartments every year, on a calendar, never has to guess whether a departed tenant from three years ago still has a working key — the answer is always "no, because the lock changed since." Waiting to rotate only after a suspected leak means every un-rotated year is exposure you can't rule out.

> **CTO note:** the honest trade-off here is engineering time versus risk reduction, and for a solo founder that time is genuinely scarce. The pragmatic order of investment is: automate rotation first for anything a breach would be expensive to recover from (database credentials, payment provider keys), and accept a manual, calendar-driven process for low-blast-radius third-party keys until volume justifies scripting it. Don't let "rotation isn't fully automated yet" become an excuse to rotate nothing — a documented manual runbook run quarterly beats a perfect automated system that never gets built.

---

## 8. CI/CD Secrets — Environment-Scoped, Never Logged

`40` established that CI runs the exact checks a human would run locally, automatically. Secrets are the one input CI needs that must never appear in that automation's own output.

| Rule | Enforcement |
|---|---|
| Secrets are stored as GitHub Actions **encrypted environment secrets**, scoped per environment (preview / staging / production) | A workflow targeting "preview" cannot read "production"-scoped secrets even if the workflow file tries |
| Secret values are automatically masked in workflow logs | GitHub Actions masks any string matching a registered secret value, even if printed accidentally |
| Fork-originated PRs never receive protected secrets | Prevents an external contributor's PR from exfiltrating a production credential via a modified workflow file |
| No secret is ever passed as a CLI argument | Command-line arguments are visible in process lists and shell history; secrets go in via env var only |
| `pull_request_target` and similarly privileged trigger types are used sparingly and reviewed, never as a default | These trigger types can run with elevated secret access against untrusted code — a known GitHub Actions supply-chain risk |

This is the CI-side mirror of §3's per-environment separation: a preview deploy for PR #431 that renders a new `tile-calculator` variant gets exactly the credentials needed to deploy a preview, and nothing that would let it touch production, even if the PR's own code were malicious.

**Simple explanation:** it's the same valet-key idea from §6, applied to robots instead of people — the CI robot building a preview of PR #431 gets a key that only opens the preview garage, even though it's the same robot that, on a different day, deploys to the production garage with a different, more privileged key.

---

## 9. Detecting Committed Secrets — Scanning as a Safety Net, Not the First Line

§1 establishes the rule; this section is what catches the moment the rule gets broken anyway — because it will, eventually, from a rushed commit or an AI agent copying a real value from a visible `.env.local` into example code.

| Layer | Tool class | Catches |
|---|---|---|
| Pre-commit hook | Gitleaks-class secret-pattern scanner | Blocks the commit locally, before it ever reaches a remote — fastest, cheapest catch |
| CI secret scan (`25`, §9) | Same class of scanner, run again in the pipeline | Catches anything a bypassed or missing local hook let through |
| Platform-native scanning | GitHub secret scanning + push protection | Vendor-partnered patterns (recognizable AWS, Stripe, etc. key formats) blocked at push time, even for secrets our own patterns miss |
| Scheduled full-history scan | Same scanner run against entire git history, not just the diff | Catches a secret that entered history before any scanner existed, or through a path the diff-based checks didn't cover |

**If a scan ever confirms a real secret reached git history, the response order is fixed and non-negotiable:**

1. **Revoke/rotate the credential immediately** — treat it as already compromised, because a clone, a CI log cache, or a fork may already have it. This step happens within minutes, not after investigation.
2. **Only then** clean history (`git filter-repo` or equivalent) and force-push, understanding this does not undo any exposure that already happened — it only prevents *future* clones from finding it.
3. **Audit for actual misuse** — check the credential's own access logs for the exposure window.
4. **Write a one-paragraph postmortem**: how it got in, which layer in the table above should have caught it and didn't, and what changes as a result.

**Simple explanation:** finding a spare house key taped under the doormat in a photo you already posted online means the fix is changing the locks today, not carefully editing the old photo. The photo might still be cached somewhere you can't reach — the only response that actually restores safety is a new lock, immediately, with history cleanup as a secondary, non-substituting step.

> **CTO note:** rewriting git history to "remove" a leaked secret without rotating it first is a false sense of security that costs more than it buys. The secret was already readable the moment it was pushed — a fork, a CI runner's cache, or even GitHub's own diff-view cache may retain it regardless of what the history looks like afterward. Rotation is the only step that actually neutralizes the leak; history cleanup is housekeeping, not remediation.

---

## 10. Redaction in Logs and Error Reporting

Secrets management doesn't end at storage and injection — a perfectly stored secret that gets printed into an application log or a Sentry stack trace (`28`, `29`, `30`) is exposed all over again, just through a different door.

- Structured logging middleware (`29`) redacts any field named (or matching a pattern like) `token`, `secret`, `password`, `key`, `authorization` by default — an opt-out for a specific known-safe field, never an opt-in per log line that a developer has to remember to add.
- Error-reporting integrations (`28`) scrub request headers and environment dumps before an event is sent, so an unhandled exception that happens to include a request's `Authorization` header never lands in Sentry as plaintext.
- Server-side tool logs (`13`, `19`'s danger zone) never log full user-submitted payloads for tools handling anything sensitive — logging metadata (size, duration, status) is enough for observability without logging content that could itself be sensitive.

**Simple explanation:** a well-run pharmacy redacts a patient's other prescriptions on a printout given to a courier — the courier needs to know "deliver to this address," not the patient's full medical history. Application logs need to know "this request failed, here's the timing and status," not the literal secret token that happened to be in the request that failed.

---

## 11. What Activates When — Phase Summary

| Aspect | Phase 1 (today) | Phase 2 (`12`, `21`, `32` land) | Phase 3 (`22`, `23` land) |
|---|---|---|---|
| Secret volume | A handful: deploy token, public ad/analytics IDs | Dozens: DB, Redis, Meilisearch, per-server-tool storage creds | Many more: JWT signing keys, OAuth secrets, billing provider keys |
| Storage backend | Platform env-var store (Vercel/Cloudflare-class) | AWS Secrets Manager + SSM Parameter Store | Same, expanded scope for auth/billing secrets |
| Rotation | Manual, low-frequency (few secrets, low blast radius) | Automatic for DB creds; scripted for the rest | Automatic + overlap-window rotation for signing keys |
| CI scoping | Single environment (preview/production) | Add staging environment | Add auth-flow and billing sandbox scoping |
| Config-loader seam | `getSecret()` backed by `process.env` | Same interface, backed by Secrets Manager — no call-site change | Same interface, unchanged |

The config-loader seam from §4 is the mechanism that makes this table honest: nothing described as "Phase 2" or "Phase 3" here requires touching application code when that phase arrives — only the loader's backing implementation and the provisioning around it change, exactly the `00` philosophy of building the seam now and the heavy feature only when it's needed.

---

## Summary

- **No secret ever enters git history**, in any form, at any point — reverts don't erase, they add. This is enforced structurally (§9), not left to memory.
- **`.env.example` documents every variable's shape** with placeholders only; a CI check keeps it in sync with what the code actually reads, so the contract can never silently drift from reality.
- **Environments are fully separated**: local dev, preview/staging, and production each hold their own secrets with zero overlap — a leak in one never grants access to another.
- **Phase 1 uses the platform's own env-var store**; Phase 2+ upgrades to AWS Secrets Manager (for rotating, high-value secrets) and SSM Parameter Store (for static config) — behind a single `getSecret()` seam so call sites never change.
- **Secrets are injected at runtime, never baked into build artifacts** — a Docker build `ARG` is a leaked secret; a runtime env var at container start is not (`41`).
- **Least privilege scopes every credential** to exactly the service and action it needs — no shared "god" credential anywhere (`25`).
- **Rotation is scheduled and low-friction by design**: automatic where the secrets manager supports it, a documented manual runbook where it doesn't — because an un-rotated secret's exposure window is unknowable.
- **CI secrets are environment-scoped and masked**; fork PRs never receive protected production-tier secrets (`40`).
- **Scanning is the safety net, not the first line**: pre-commit, CI, and platform-native scanning catch what the rule in §1 was supposed to prevent — and the response to a real leak is always rotate first, clean history second.
- **Redaction in logs and error reporting (`28`, `29`)** closes the second door a stored-correctly secret can still leak through.

> Next: `46-DISASTER-RECOVERY.md` — backups, restore drills, and the RTO/RPO targets that keep an outage from becoming data loss.

---

### Changelog
| Version | Date | Change | Reason |
|---|---|---|---|
| v1 | (draft) | Initial secrets management architecture | Project inception |
