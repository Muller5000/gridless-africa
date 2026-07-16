---
# COVER PAGE

**Project Name:** Gridless Africa
**Document Title:** Project Constitution
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Approved / Active Baseline
**Author:** Founding Team (Engineering & Product Leadership)
**Approval Status:** Approved by Co-Founder

---

## Executive Summary
### Purpose of this Constitution
This Constitution is the highest-level governance document for the Gridless Africa project. It establishes the immutable laws governing product strategy, engineering standards, design philosophy, and operational execution.

### Project Objectives
To build, launch, and scale a digital marketplace that accelerates the adoption of solar energy in Nigeria (starting in Lagos and Oyo States) by removing barriers of trust, technical complexity, and upfront capital.

### Scope
This Constitution applies to all internal employees, contractors, automated agents, AI assistants, and future stakeholders contributing to the design, development, and deployment of Gridless Africa.

### Decision Hierarchy
1.  **Project Constitution (This Document)**
2.  Product Discovery & Startup Strategy
3.  Product Requirements Document (PRD)
4.  Technical Architecture & Database Design
5.  UX/UI Design System

### Document Precedence
In the event of a conflict between project documents, the higher document in the Decision Hierarchy overrides the lower. Any deviation from this Constitution requires a formally approved version upgrade (v1.1).

---

## 2. Vision
*   **Product Vision:** To democratize access to reliable renewable energy across Africa by building the definitive, trust-brokering ecosystem for verified solar solutions.
*   **Engineering Vision:** To construct a highly resilient, cloud-native, and modular platform capable of scaling seamlessly from handling early MVPs in Akobo to managing millions of nodes across the continent.
*   **User Experience Vision:** To transform the complex, high-anxiety process of buying solar into a frictionless, transparent, and aesthetically premium consumer journey.
*   **Business Vision:** To become the default digital infrastructure powering Africa’s transition off the fossil-fuel grid, capturing immense market value through facilitated GMV and lifecycle maintenance.

---

## 3. Core Principles
1.  **Customer-first:** Every technical and product decision must measurably improve the user experience.
2.  **Security-first:** Financial and infrastructure data are sacred. Security is not an afterthought; it is built into the foundation.
3.  **Mobile-first:** The majority of our Nigerian user base will access the platform via mobile devices. The Progressive Web App (PWA) experience must be flawless.
4.  **Accessibility-first:** The platform must be navigable by users of varying digital literacy and visual capabilities.
5.  **Performance-first:** Latency kills conversion. We optimize for low-bandwidth environments (sub-2.5s load times on 3G).
6.  **API-first:** All functionality must be exposed via well-documented APIs to enable future mobile apps and B2B integrations.
7.  **Cloud-native:** Infrastructure will be designed for scalability, elasticity, and high availability from Day 1.
8.  **AI-assisted development:** We leverage AI to accelerate coding, testing, and strategy, but humans hold ultimate accountability.
9.  **Scalable by default:** We design for 1,000,000 users even when building for the first 1,000.
10. **Maintainability over shortcuts:** "Quick and dirty" is forbidden. Technical debt must be logged, justified, and rapidly paid down.

---

## 4. Product Principles
*   **Every feature must solve a real problem:** No vanity features. If it does not address a documented pain point, it is cut.
*   **Never build unnecessary complexity:** Do not build custom tooling if an off-the-shelf integration serves the MVP effectively.
*   **Every feature must have measurable value:** Success metrics must be defined before a feature enters development.
*   **Every feature must support the Product Vision:** Features must align with democratizing energy and building trust.
*   **Trust is our biggest product feature:** The Solar Health Score, Escrow, and strict KYC vetting are the core of our competitive moat.

---

## 5. Engineering Principles
*   **Modular architecture:** Systems must be broken into independent, interchangeable modules.
*   **Reusable components:** Build UI elements and utility functions once; use them everywhere.
*   **Loose coupling:** Changes in one microservice or module should not break another.
*   **High cohesion:** Code that changes together should live together.
*   **Clean Architecture:** Separation of concerns (Presentation, Domain/Business Logic, Data Access).
*   **SOLID principles:** Adhere strictly to Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Abstract repetitive logic.
*   **KISS (Keep It Simple, Stupid):** The simplest solution that meets the requirements is the correct solution.
*   **YAGNI (You Aren't Gonna Need It):** Do not build features or infrastructure for hypothetical future use cases.
*   **Convention over configuration:** Standardize defaults to decrease the number of decisions developers need to make.
*   **Feature-first folder organization:** Group files by feature (e.g., `/auth`, `/marketplace`) rather than by type (e.g., `/components`, `/hooks`).

---

## 6. Design Principles
*   **Simple interfaces:** Remove visual clutter. Let the data breathe.
*   **Professional visual hierarchy:** Guide the user's eye naturally from primary action to secondary information.
*   **Consistency:** Use a rigid Design System for typography, colors, and spacing.
*   **Accessibility:** High contrast ratios, aria-labels, and keyboard navigability are mandatory.
*   **Fast interactions:** Instant UI feedback (optimistic UI updates, skeleton loaders) to mask network latency.
*   **Minimal clicks:** Optimize user flows to achieve the goal in the fewest steps possible.
*   **Responsive design:** Fluid layouts that adapt gracefully from desktop to mobile screens.
*   **Micro-interactions:** Delight the user during state changes (e.g., subtle success animations).
*   **Progressive disclosure:** Reveal advanced complexity only when the user asks for it (e.g., Solar Savings Calculator).
*   **Beautiful but functional:** Aesthetics must serve usability, never hinder it.

---

## 7. Security Principles
*   **Least privilege:** Users and services only have the access rights necessary to perform their required tasks.
*   **Secure by default:** Systems must be secure out-of-the-box, without requiring manual configuration by the user.
*   **Encryption:** AES-256 for data at rest; TLS 1.2+ for data in transit.
*   **Authentication:** Robust JWT-based sessions, mandatory MFA for Admin accounts.
*   **Authorization:** Strict Role-Based Access Control (RBAC).
*   **Input validation:** Never trust client data. Validate and sanitize all inputs on the server side.
*   **Rate limiting:** Protect APIs against brute force and DDoS attacks.
*   **Audit logging:** All sensitive actions (KYC approvals, escrow triggers) must be immutably logged with timestamps and user IDs.
*   **Data privacy:** Strict compliance with NDPR (Nigeria Data Protection Regulation) and global GDPR standards.
*   **OWASP compliance:** Regular scanning against the OWASP Top 10 vulnerabilities.
*   **Zero trust:** Verify every request, regardless of whether it originates inside or outside the network perimeter.

---

## 8. Documentation Standards
Every official project document (Strategy, PRD, Architecture, API spec) must include the following header block:
*   **Version:** Semantic version number (e.g., v1.0).
*   **Author:** Individual or team responsible.
*   **Status:** Draft, Under Review, Approved, or Archived.
*   **Date:** ISO format (YYYY-MM-DD) or standardized long-form date.
*   **Change Log:** Summary of modifications from the previous version.
*   **References:** Links to prerequisite documents.
*   **Approval Status:** Name/Role of the approver.
*   **Document Owner:** The role responsible for maintaining the document.
*   **Review History:** Log of peer reviews.
*   **Dependencies:** Other systems or documents impacted.
*   **Related Documents:** Relevant contextual reading.

---

## 9. Version Control Standards
*   **Version Numbering:** Strict adherence to Semantic Versioning (SemVer).
*   **Major Versions (X.0.0):** Incompatible API changes, massive architectural overhauls, or brand new business verticals.
*   **Minor Versions (0.X.0):** Backward-compatible new features.
*   **Patch Versions (0.0.X):** Backward-compatible bug fixes.
*   **Approval Workflow:** All code must be submitted via Pull Request (PR). Requires at least one human peer review, passing CI/CD checks, and zero critical security vulnerabilities.
*   **Deprecation Policy:** Deprecated APIs must be supported for a minimum of 6 months, with clear console warnings and documentation updates.
*   **Archive Policy:** Abandoned branches must be pruned every 30 days. Deprecated services must be spun down and their repositories marked as read-only.

---

## 10. Naming Conventions

| Asset Category | Naming Convention | Example |
| :--- | :--- | :--- |
| **Database** | lowercase_snake_case | `gridless_africa_prod` |
| **Tables** | lowercase_snake_case (plural) | `users`, `installer_profiles` |
| **Columns** | lowercase_snake_case | `first_name`, `created_at` |
| **APIs** | lowercase-kebab-case (RESTful) | `/api/v1/quote-requests` |
| **Files/Folders** | lowercase-kebab-case | `user-dashboard.tsx`, `/components` |
| **Components** | PascalCase | `SolarCalculator`, `QuoteCard` |
| **Variables/Functions**| camelCase | `calculateRoi()`, `totalSpend` |
| **Environment Vars** | UPPER_SNAKE_CASE | `SUPABASE_PUBLIC_KEY` |
| **Branches** | type/issue-number-description | `feat/SH-42-installer-kyc` |
| **Git Commits** | Conventional Commits | `feat(auth): add google oauth login` |

---

## 11. Coding Standards
*   **TypeScript:** Strict mode enabled. `any` types are strictly forbidden. Interfaces/Types must be defined for all data structures.
*   **React:** Functional components only. Hooks for state management. Avoid deeply nested prop drilling (use Context or global state where appropriate).
*   **Next.js:** Leverage Server Components by default for performance; use Client Components only when interactivity requires it.
*   **Supabase:** Leverage Row Level Security (RLS) directly in the database. Use generated TypeScript types from the database schema.
*   **Tailwind:** Use utility classes for all styling. Avoid custom CSS files unless absolutely necessary for complex animations.
*   **Linting:** ESLint with strict rules configured. Must pass in CI.
*   **Formatting:** Prettier must be run on pre-commit hooks.
*   **Error Handling:** Try/Catch blocks for all async operations. Custom error classes for clear API responses. Never expose raw stack traces to the client.
*   **Logging:** Structured JSON logging. Use info, warn, error, and debug levels appropriately.
*   **Testing:** Jest/Vitest for Unit tests. Playwright/Cypress for End-to-End (E2E) flows. Minimum 80% code coverage on business logic.
*   **Documentation:** JSDoc blocks for all complex functions, interfaces, and API endpoints.

---

## 12. Definition of Done
A feature is **not complete** until the following are true:
*   **Code:** Written, linted, formatted, and strictly typed.
*   **Testing:** Unit tests and E2E tests written and passing.
*   **Documentation:** API specs, inline comments, and PR descriptions are updated.
*   **Accessibility:** Passes Lighthouse accessibility audit (score > 95) and keyboard navigation tests.
*   **Performance:** Does not degrade baseline Lighthouse performance scores.
*   **Security:** Passes static application security testing (SAST). Validates all inputs and enforces RBAC.
*   **Review:** Code reviewed and approved by at least one senior engineer.
*   **Approval:** Product Manager has verified the Acceptance Criteria (from the PRD) are met in a staging environment.

---

## 13. AI Development Guidelines
*   **How Gemini should assist:** Used for architectural brainstorming, PRD drafting, code generation, refactoring suggestions, and writing initial test suites.
*   **How Antigravity should assist:** Utilized for rapid scaffolding of the overarching Next.js/Supabase architecture and boilerplates, adhering strictly to our folder structures.
*   **How AI-generated code must be reviewed:** AI output is treated as a Junior Developer submission. It must be manually audited for edge cases, security flaws, and compliance with our strict TypeScript standards.
*   **Prompt management:** Complex structural prompts must be saved and version-controlled in the project repository to ensure reproducible AI outputs.
*   **Version management:** AI agents must explicitly be fed the latest version of the Constitution and PRD before generating new artifacts.
*   **Human review requirements:** No AI-generated code may be pushed directly to the `main` branch without human review and CI/CD validation.

---

## 14. Quality Gates
No phase may begin until the previous gate has been approved and locked.
1.  **Discovery Gate:** Startup Strategy & Market validation approved.
2.  **PRD Gate:** Features, Personas, and Acceptance Criteria approved.
3.  **Architecture Gate:** Tech Stack and System Diagrams approved.
4.  **Database Gate:** Schema and RLS policies approved.
5.  **API Gate:** Endpoints and payload contracts approved.
6.  **UX Gate:** Wireframes and user flows approved.
7.  **UI Gate:** High-fidelity mocks and Design System approved.
8.  **Development Gate:** Code merged to staging, Definition of Done met.
9.  **Testing Gate:** QA sign-off, UAT (User Acceptance Testing) complete.
10. **Deployment Gate:** Infrastructure provisioned, staging validated.
11. **Launch Gate:** Go/No-Go executive decision finalized.

---

## 15. Risk Management

| Risk Category | Identified Risk | Mitigation Strategy |
| :--- | :--- | :--- |
| **Technical Risks** | System downtime during power grid fluctuations. | Host all core infrastructure on AWS/GCP regions decoupled from local Nigerian grid failures. |
| **Business Risks** | Installer fraud or poor installation quality. | Enforce strict KYC, mandate Escrow payments, and implement the Solar Health Score to weed out bad actors. |
| **Operational Risks** | Manual Escrow reconciliation becomes a bottleneck. | Automate via API (Paystack/Flutterwave) as soon as Phase 1 GMV validates the model. |
| **Security Risks** | Data breach exposing user financial info or CAC docs. | Implement Row Level Security (RLS) in Supabase; utilize encrypted storage buckets for KYC documents. |
| **Vendor Lock-in** | Over-reliance on Supabase or specific cloud tools. | Abstract database interactions via Clean Architecture repositories so the ORM/DB can be swapped if needed. |

---

## 16. Success Principles
*   **How success is measured:** Success is defined by active usage, marketplace liquidity, and platform stability, not by lines of code written.
*   **Engineering KPIs:** Uptime (99.9%), API Response Time (<200ms), Zero Critical Security Incidents, Defect Escape Rate (<5%).
*   **Product KPIs:** Feature Adoption Rate, Time-to-Value (how fast a user gets a quote), Calculator Completion Rate.
*   **Business KPIs:** Gross Merchandise Value (GMV) processed, Customer Acquisition Cost (CAC), Lifetime Value (LTV) through maintenance.
*   **Customer KPIs:** Net Promoter Score (NPS), Trust ratings, Support ticket resolution time.

---

## 17. Future Governance
*   **Referencing:** Every future PRD, Tech Spec, or Design document must include the line: *"Complies with Project Constitution v[X.X]"*.
*   **Amendments:** Any team member can propose an amendment to the Constitution via a formal Pull Request to the documentation repository, accompanied by a business or technical justification.
*   **Approvals:** Future versions of this Constitution require unanimous approval from the Founding Team (Engineering Leadership & Product Leadership).

---
**References:** * *Gridless Africa Product Discovery & Startup Strategy v1.1*
* *Gridless Africa Product Requirements Document v1.0*

*Document Footer: Gridless Africa - Project Constitution v1.0*