# DevOps Pipeline Challenge

This repository is an interview coding challenge designed to explore practical DevOps and delivery engineering decisions.

## Goal

Use this monorepo as a baseline and evolve it into a delivery setup that is fast, stable, and easy for developers to work with.

---

## Repository Setup (Fork + Clone)

1. Fork this repository into your own GitHub account.
2. Clone your fork locally.
3. Create a feature branch from `main`.
4. Install dependencies and run the apps.
5. Commit in meaningful increments and open a Pull Request back to your fork.

### Quick Start

Prerequisites:

- Node.js 20+
- Corepack enabled (`corepack enable`)
- Yarn 4 via Corepack (repo uses `packageManager: yarn@4.6.0`)

Commands:

- `yarn install`
- `yarn dev:backend`
- `yarn dev:frontend`

Frontend default URL: `http://localhost:4321`  
Backend default URL: `http://localhost:3000`

---

## Monorepo Structure

- `infrastructure/` IaC placeholder and guidance.
- `.github/workflows/README.md` CI/CD workflow challenge brief (workflow file intentionally not pre-created).
- `packages/frontend/` Astro static contact form app.
- `packages/backend/` Express API receiving payload and validating with Zod.
- `packages/lib/` Shared package (validation schema + mock email sender).

---

## Functional Requirements

1. A user can submit a contact form from the frontend.
2. The backend receives the payload at `POST /api/contact`.
3. The backend validates the payload with `zod` using the shared schema from `packages/lib`.
4. On success, the backend uses the shared email library to mock sending an email by writing a file.
5. The backend returns useful status codes and JSON responses for success/failure.

---

## Non-Functional Requirements

1. **Developer Experience**
	- Clear setup docs.
	- Reproducible local development.
	- Fast feedback loops.
2. **Build & Delivery Quality**
	- Automated checks for lint/build/test (where implemented).
	- CI pipeline that is understandable and maintainable.
3. **Operational Readiness**
	- Infrastructure approach suitable for AWS deployment.
	- Documentation of trade-offs, assumptions, and risks.

---

## Acceptance Criteria

### 1) Developers Can Easily Setup and Work

- A new developer can clone and run locally within minutes.
- Instructions are complete and accurate.
- Workspace scripts are simple and discoverable.

### 2) Changes Can Be Deployed with Speed and Stability

- CI design supports quick validation.
- Pipeline stages and quality gates are clear.
- Rollback/recovery thinking is documented.

### 3) Version Control Represents Current State of Development

- Commit history is meaningful.
- PR describes intent and impact.
- Branching/versioning approach is reasonable for team scale.

### 4) Infrastructure Can Be Deployed to AWS Effectively

- IaC structure supports AWS deployment patterns.
- Networking/runtime/secrets decisions are discussed.
- **Important caveat:** candidates are **not** expected to deploy at personal expense. A practical design and partial implementation is acceptable, and known gaps should be documented.

---

## Expected Time to Complete

Suggested effort: **2 hours**.

This is intentionally time-boxed. Prioritize clear decisions, delivery flow, and communication over production-complete implementation.

---

## Discussion Checklist (For Interview Follow-Up)

- [ ] Why this CI/CD design?
- [ ] How does your approach improve lead time?
- [ ] What are the main reliability risks?
- [ ] What quality gates did you add (and why)?
- [ ] How would you promote changes across environments?
- [ ] How would you handle secrets and config in AWS?
- [ ] What observability would you add first?
- [ ] How would you scale this monorepo with more services?
- [ ] What would you do next with another half day?

---

## Notes

- Keep assumptions explicit.
- Prefer small, well-documented increments.
- If you skip something, explain what and why.
