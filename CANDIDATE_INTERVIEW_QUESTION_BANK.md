# Candidate Interview Question Bank

Use this as the live interview guide. It consolidates the high-value probes plus the full README discussion checklist, each with follow-up prompts and expected responses.

## Interview Flow (Open First)

Start each topic with one open prompt and let the candidate lead for 60 to 90 seconds before narrowing.

Suggested pattern per topic:
1. Ask open starter question. e.g - How did you find the task? Would you like to talk through it?
2. Listen without interruption and note assumptions, trade-offs, and failure modes.
3. Use follow-up prompts only to probe missing depth.
4. Score using expected responses after discussion, not during the first answer.

## README Checklist Questions (Primary First Pass)

1. Why this CI/CD design?
   Open starter:
   - Explain your CI/CD design choices and what you optimized for.
   Expected responses:
   - Clear reasoning for stage choices and order.
   - Trade-off discussion (speed versus confidence) tied to repo size and timebox.
   - Evidence of deterministic installs, caching, and fail-fast validation.

2. How does your approach improve lead time?
   Open starter:
   - How does your approach change delivery speed in day-to-day development?
   Expected responses:
   - Mentions faster feedback loops (parallelization, scoped checks, cache use).
   - Explains how developers get earlier failure signals.
   - Identifies bottlenecks and how they would be measured and reduced.

3. What are the main reliability risks?
   Open starter:
   - What do you think is most likely to fail first in this setup, and why?
   Expected responses:
   - Identifies workflow discoverability/config risks, drift, flaky checks, and secret/config mistakes.
   - Calls out operational risks (rollback gaps, limited observability).
   - Prioritizes risks by impact and likelihood.

4. What quality gates did you add, and why?
   Open starter:
   - Walk me through the quality gates you implemented and your rationale for each.
   Expected responses:
   - Explains current gates (build and type validation) and rationale.
   - Distinguishes what is implemented now versus planned next.
   - Justifies blocking versus non-blocking checks.

5. How would you promote changes across environments?
   Open starter:
   - Describe your release promotion path from change creation to production.
   Expected responses:
   - Build once, promote immutable artifact.
   - Environment-specific config and secrets are separated from artifacts.
   - Clear approval and rollback strategy for stage and prod.

6. How would you handle secrets and config in AWS?
   Open starter:
   - Explain your secrets and configuration strategy across environments.
   Expected responses:
   - OIDC for CI auth; avoids long-lived static credentials.
   - Sensitive data in Secrets Manager, non-sensitive config in Parameter Store.
   - Access controls and auditability considerations.

7. What observability would you add first?
   Open starter:
   - If we needed better production visibility tomorrow, what would you add first?
   Expected responses:
   - Structured logs with correlation IDs.
   - Basic SLI/SLO-aligned metrics and alerts (errors, latency, saturation).
   - Incremental path to tracing and dashboards.

8. How would you scale this monorepo with more services?
   Open starter:
   - How would your approach evolve as this monorepo grows to many services?
   Expected responses:
   - Affected/scoped builds and tests to keep pipelines fast.
   - Shared standards for scripts/contracts and ownership boundaries.
   - Versioning/release strategy and dependency boundary management.

9. What would you do next with another half day?
   Open starter:
   - If you had another half day, what would you do first, second, and third?
   Expected responses:
   - Prioritized, concrete next steps with impact-first ordering.
   - Includes at least one CI-hardening task and one operability task.
   - Shows pragmatic scope control (what is intentionally deferred and why).

## Submission-Specific Deep Dives

1. Why did you choose Corepack for this challenge, and what would change in your approach as Node and tooling evolve?
   Open starter:
   - Talk me through your package-manager strategy and why you chose it for this challenge.
   Follow-up prompts:
   - Why Corepack over global Yarn install?
   - What role does packageManager in package.json play, and what does it not guarantee by itself?
   - What would you do on CI images where Corepack is not pre-bundled?
   - If your team used Volta/asdf/mise, would you keep or replace Corepack?
   Expected responses:
   - Explains deterministic package-manager versioning and reduced local/CI drift.
   - Distinguishes declaration (packageManager) from enforcement/bootstrap (Corepack or equivalent).
   - Notes fallback strategy when Corepack is unavailable by default (explicit install/bootstrap).
   - Discusses trade-offs versus alternatives with pragmatic team-context reasoning.

2. Why place workflow at .github/ci.yml rather than .github/workflows/ci.yml, and was this tested in GitHub Actions UI?
   Open starter:
   - Walk me through how you designed, validated, and expected this workflow to run in GitHub Actions.
   Follow-up prompts:
   - What mechanism does GitHub use to discover workflow files?
   - What checks would you run after pushing a new workflow?
   - How would you prevent this class of issue in future repos?
   Expected responses:
   - Correctly identifies workflow discovery path requirements.
   - Describes verification steps in Actions UI/logs and branch PR checks.
   - Proposes safeguards (template repo, linting, checklist, CODEOWNERS/review gate).

3. What two additional CI gates would you add first for stability, and why those first?
   Open starter:
   - If you had a little more time, what would you add next to make CI both faster and safer?
   Follow-up prompts:
   - Which gates run on PR versus post-merge?
   - Which are blocking versus informative?
   - How would you keep feedback fast while increasing safety?
   Expected responses:
   - Prioritizes high-signal gates (tests, security/dependency scan, smoke checks).
   - Explains stage ordering and parallelization for lead-time control.
   - Distinguishes hard gates from advisory checks with rationale.

4. How would you convert the infrastructure doc into a minimal runnable Terraform skeleton in 30 minutes?
   Open starter:
   - Walk me through the first 30 minutes of turning your infrastructure design into runnable IaC.
   Follow-up prompts:
   - What modules/resources come first?
   - How would state, environments, and secrets be handled initially?
   - How can you quickly validate changes without full AWS deployment?
   - What would be explicitly out of scope for the first cut?
   Expected responses:
   - Proposes a thin vertical slice with clear sequencing.
   - Covers backend state strategy and environment isolation approach.
   - Uses secure defaults for secret handling and calls out deferred complexity explicitly.

5. What is your plan to avoid environment drift while promoting one artifact across dev/stage/prod?
   Open starter:
   - Explain how you would safely promote a change from dev to prod without introducing drift.
   Follow-up prompts:
   - How do you ensure build-once/promote-many in practice?
   - How do config differences vary by environment without rebuilding?
   - What promotion controls and rollback checks are required?
   Expected responses:
   - Describes immutable artifact strategy with versioned promotion.
   - Separates artifact from environment config and secrets.
   - Includes approval gates, health checks, and rollback trigger criteria.

6. What logging fields and correlation strategy would you implement first for production debugging?
   Open starter:
   - Describe your first-pass observability and debugging design for this system.
   Follow-up prompts:
   - Which structured fields are mandatory?
   - How is request or trace context propagated end-to-end?
   - What redaction and retention rules would you enforce first?
   Expected responses:
   - Defines a consistent structured logging schema (timestamp, level, service, env, requestId, traceId).
   - Explains correlation/context propagation across ingress, app, and downstream calls.
   - Mentions PII redaction, error normalization, and actionable alerting/metrics.

## Quick Scoring Use

Score each answer 1 to 5:
- 1 to 2: Generic, low depth, weak trade-off awareness.
- 3: Solid baseline with practical implementation sense.
- 4: Strong depth, identifies failure modes and mitigations.
- 5: Excellent pragmatism, sequencing, and production awareness.
