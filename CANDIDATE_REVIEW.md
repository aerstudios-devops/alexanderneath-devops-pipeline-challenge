# Candidate Submission Review

## Scope
This review compares:
- Candidate submission: `alexanderneath-devops-pipeline-challenge` (branch: `feat/ci-quality-and-aws-design`)
- Reference baseline: `devops-pipeline-challenge`
- Interview rubric: `INTERVIEWER_GUIDELINES.md`

## Correction to Prior Assessment
A pipeline file **does exist** in the candidate submission:
- `.github/ci.yml`

## Critical Nuance: Pipeline Location
GitHub Actions only auto-discovers workflow files under:
- `.github/workflows/*.yml`
- `.github/workflows/*.yaml`

The candidate file is currently at:
- `.github/ci.yml`

Result:
- The workflow is well-formed but is likely **not executed automatically** by GitHub Actions in this location.
- Challenge requirement asked for adding workflow in `.github/workflows/`.
- It also will not appear until on main

## What Improved vs Reference

### 1) CI pipeline implementation (partially delivered)
Candidate added a concrete workflow definition with:
- PR + push on main triggers
- Node 20 setup
- Corepack + Yarn 4.6.0
- Yarn cache
- Immutable install (`yarn install --immutable`)
- Validation command (`yarn check`)

Strength: The actual workflow content is sensible for a time-boxed challenge.
Gap: Placement prevents it from providing real CI protection until moved into `.github/workflows/`.

### 2) Better local quality gates
Compared to reference, candidate upgraded scripts:
- Root `lint` now runs backend + lib static checks
- Root `check` command added (`yarn build && yarn lint`)
- Backend and lib lint scripts changed from echo placeholders to `tsc --noEmit`

Strength: measurable improvement to baseline validation quality.
Gap: frontend lint/tests still not enforced.

### 3) Infrastructure design write-up is strong
`infrastructure/README.md` now includes:
- AWS architecture proposal (S3/CloudFront + API Gateway/Lambda)
- environment strategy (`dev/stage/prod`)
- secrets/config approach (OIDC + SSM/Secrets Manager)
- deployment and rollback model
- observability starter plan
- explicit trade-offs and assumptions

Strength: good practical architecture reasoning under a timebox.
Gap: no executable IaC files (`.tf`, CDK, CloudFormation), so implementation depth is not demonstrated.

## Findings (Ordered by Severity)

1. **High:** Workflow file is not in the GitHub Actions discovery directory.
   - Risk: no CI actually runs on PR/push despite having a pipeline definition.
   - Suggested fix: move `.github/ci.yml` -> `.github/workflows/ci.yml`.

2. **Medium:** Pipeline is single-job validation only.
   - Missing stronger staged quality gates (tests/security/deploy controls).
   - For a 2-hour challenge this is acceptable baseline, but not "strong" pipeline maturity yet.

3. **Medium:** Infra is design-only, no runnable IaC.
   - Good discussion quality, but low proof of delivery.

4. **Low:** Frontend quality gates are still weak.
   - Validation now focuses mostly on backend/lib type safety and builds.

## Rubric-Oriented Scoring (Evidence-Based Estimate)

Scored from repository artifacts only (interview answers can raise/lower):

- Q1 (Challenge experience/time): **3/5**
- Q2 (AI usage/accountability): **N/A from artifacts**
- Q3 (CORS in infra): **2/5**
- Q4 (SSR/ISR understanding): **1/5**
- Q5 (CI/CD for speed/stability): **3/5**
- Q6 (pipeline failure modes/mitigation): **2/5**
- Q7 (developer experience): **4/5**
- Q8 (frontend/backend contract maturity): **1/5**
- Q9 (implementation risks): **3/5**
- Q10 (debugging/observability): **2/5**

Subtotal excluding Q2: **21/45 equivalent**.

## Interviewer Take
This submission is **materially better than baseline** and shows practical judgment in CI/IaC documentation. The biggest issue is execution detail: the CI file location likely means no real workflow enforcement, and there is no concrete IaC implementation.

Most likely recommendation from artifacts alone: **Borderline / Lean Hire if interview depth is strong**.

## Interview Question Bank
All follow-up interview prompts and expected responses have been moved to `CANDIDATE_INTERVIEW_QUESTION_BANK.md` to keep this file focused on assessment findings.
