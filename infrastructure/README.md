# Infrastructure (AWS IaC)

This directory is intentionally lightweight for the challenge.

## Objective

Define how this system would be deployed to AWS using Infrastructure as Code.

## Expectations

We expect this to take no more than 60 minutes to complete and therefore expect a very small amount of the following.

- Propose a practical AWS architecture using a clear diagram of your choice.
- Show via a diagram how environments could be managed (for example: dev/stage/prod).
- Explain secrets/config strategy.
- Explain deployment strategy and rollback approach.
- Explain developer experience.
- You may wish to add IaC files being mindful of your time (We use terraform with other IaC frameworks being excellent for discussion)

**Please do not work beyond 60 minutes at expense of your time. The discussion and your ideas are our focus**

## Caveat

Candidates are **not expected** to deploy resources using a personal AWS account.

Design quality, documentation clarity, and understanding of trade-offs are more important than completing a full live deployment.

## Options

- You may wish to place terraform (or other) IaaC files here to serve as discussion

---

## Proposed AWS Architecture

The application consists of a static frontend and a lightweight backend API. A serverless AWS architecture is proposed to align with the current scale of the application and a Lambda-centric operating model.

- **Frontend**
  - Hosted as static assets in S3
  - Delivered via CloudFront CDN
  - DNS managed via Route 53
  - TLS via AWS Certificate Manager (ACM)

- **Backend**
  - Express API adapted for AWS Lambda
  - Exposed via API Gateway
  - Request handling remains simple and well suited to an event-driven/serverless model

- **Shared concerns**
  - CloudWatch Logs for application logging
  - AWS Systems Manager Parameter Store and/or Secrets Manager for configuration and secrets

This approach keeps the platform lightweight, reduces operational overhead, and aligns with a serverless-first delivery model.

---

## Environment Strategy

A multi-environment approach is recommended:

- `dev`
- `stage`
- `prod`

Environments can be managed via:

- Separate AWS accounts (preferred for stronger isolation), or
- Separate Terraform workspaces/stacks/state within a shared account where appropriate

Promotion strategy:

- Build artefacts once and promote them between environments
- Avoid rebuilding differently per environment to reduce configuration drift

This supports consistent releases and clearer rollback paths.

---

## Secrets and Configuration

- CI/CD (GitHub Actions) authenticates to AWS using OIDC, avoiding long-lived static credentials
- Runtime configuration stored in:
  - AWS Systems Manager Parameter Store, or
  - AWS Secrets Manager for sensitive values

Examples:
- API configuration
- Environment-specific variables
- Third-party credentials if introduced later

Non-sensitive environment settings should be separated from secrets to keep configuration manageable and easier to audit.

---

## Deployment Strategy

- Pull Requests:
  - Run CI validation only (`yarn check`)
- Merge to `main`:
  - Produce deployable artefacts
  - Deploy automatically to `dev`
- Promotion:
  - Manual approval or gated promotion to `stage` and `prod`

Frontend:
- Build static assets
- Deploy to S3
- Invalidate CloudFront cache as needed

Backend:
- Package Lambda function artefact
- Deploy via infrastructure pipeline or Terraform-driven release process
- Update API Gateway integration where required through IaC-managed deployment

This keeps validation fast while supporting controlled promotion across environments.

---

## Rollback Strategy

Frontend:
- Re-deploy the previous static artefact version to S3
- Refresh CloudFront cache if required

Backend:
- Roll back to the previous Lambda version or alias
- Restore the previously known-good API deployment

Using Lambda versions and aliases provides a simple and low-risk rollback path.

---

## Observability (Initial Approach)

Given the time-boxed nature of the challenge, a minimal initial approach is defined:

- CloudWatch Logs for backend logging
- API Gateway access/error logging
- Basic CloudWatch metrics and alarms for:
  - Lambda errors
  - Lambda duration
  - API Gateway 4xx/5xx responses

Future enhancements:
- Structured logging
- Distributed tracing with AWS X-Ray
- Dashboards for request volume, latency, and failure trends

---

## Developer Experience

- Single validation command:
  - `yarn check`
- Reproducible local development via Node 20 + Corepack + Yarn 4
- Lightweight CI pipeline for fast feedback
- Clear separation of frontend, backend, and shared library
- Serverless deployment model reduces operational burden for small services and supports rapid iteration

This supports fast onboarding and keeps the delivery flow simple.

---

## Trade-offs and Assumptions

- Lambda chosen over container orchestration:
  - Better aligned to a serverless-first operating model
  - Lower operational overhead for a lightweight API
  - Faster to reason about for small services

- This assumes the Express backend would either:
  - be wrapped for Lambda compatibility, or
  - be minimally adapted to run cleanly behind API Gateway

- No full IaC implementation provided:
  - The time-box prioritises design clarity and deployment thinking over production-complete infrastructure

- Limited automated testing:
  - Validation is currently focused on static checks and build success

---