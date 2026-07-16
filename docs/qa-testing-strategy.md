---
# COVER PAGE

**Document ID:** SHNG-QA-001
**Title:** QA & Testing Strategy
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal QA Architect / Test Engineering Team
**Intended Audience:** QA Engineers, Frontend/Backend Engineers, DevOps, Product Managers
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal QA Architect | Initial Baseline. Aligned with all SHNG-001 architecture and design specifications. |

## Related Documents & Dependencies
* **SHNG-CON-001** Project Constitution v1.0
* **SHNG-PRD-001** Product Requirements Document v1.0
* **SHNG-ARCH-001** Technical Architecture v1.0
* **SHNG-DB-001** Database Design v1.0
* **SHNG-API-001** API Specification v1.0
* **SHNG-SEC-001** Security Architecture v1.0
* **SHNG-UX-001** UX Strategy v1.0
* **SHNG-IA-001** Information Architecture v1.0
* **SHNG-UF-001** User Flows v1.0
* **SHNG-WF-001** Wireframe Specification v1.0
* **SHNG-DS-001** Design System v1.0
* **SHNG-CL-001** Component Library v1.0
* **SHNG-FE-001** Frontend Technical Specification v1.0
* **SHNG-BE-001** Backend Technical Specification v1.0
* **SHNG-DEVOPS-001** DevOps & Infrastructure Specification v1.0

## Approval Workflow
1.  **Draft Review:** Test Automation Lead & Product Quality Manager (Pending)
2.  **Security Alignment:** Security Test Engineer (Pending)
3.  **Final Sign-off:** CTO (Pending)

---

## 1. Executive Summary
The QA & Testing Strategy (SHNG-QA-001) establishes the quality engineering blueprint for Gridless Africa. Because our core value proposition is **trust** in a fragmented market, our testing philosophy prioritizes the absolute reliability of financial transactions (Escrow), the accuracy of our Solar Savings Calculator, and the rigorous protection of user data (KYC). This document outlines a "Shift-Left" and "Automation-First" approach, ensuring defects are caught during development rather than in production, maintaining a frictionless, secure experience for all users.

---

## 2. Quality Objectives
* **Reliability:** 99.9% uptime for core user journeys (Calculator -> Quote -> Payment). Zero data loss during escrow state transitions.
* **Performance:** First Contentful Paint (FCP) < 2.5s on 3G networks. API response times < 200ms at the 95th percentile.
* **Security:** Zero critical or high-severity vulnerabilities escaping to production. Strict validation of all inputs and JWT boundaries.
* **Accessibility:** 100% compliance with WCAG 2.2 AA standards for all critical conversion paths.
* **Usability:** Zero dead-ends or unhandled error states. Consistent cross-device responsive behavior.
* **Maintainability:** Minimum 80% automated unit test coverage for business logic and components.
* **Defect Prevention:** Implement static analysis, type checking (TypeScript), and schema validation (Zod) in CI/CD to catch 60% of potential bugs before testing begins.

---

## 3. Testing Principles
* **Shift-Left Testing:** Integrate QA early in the SDLC. Test PRDs, UX designs, and API contracts before code is written.
* **Risk-Based Testing:** Allocate the highest testing effort to high-impact areas (Escrow payouts, Quote selection, Auth).
* **Test Pyramid:** Heavy reliance on fast, deterministic Unit tests; moderate API/Integration tests; and a focused, strategic suite of E2E UI tests to prevent test fragility.
* **Automation-First:** Any test executed more than twice must be automated. Manual testing is reserved for exploratory testing, usability, and complex edge cases.
* **Regression Prevention:** Automated test suites run on every Pull Request via GitHub Actions. Merging is blocked if coverage drops or tests fail.
* **Continuous Testing:** QA is not a phase; it is continuous throughout the CI/CD pipeline from local dev to production monitoring.

---

## 4. Testing Levels

| Level | Scope / Tooling | Entry Criteria | Exit Criteria |
| :--- | :--- | :--- | :--- |
| **Unit** | Individual functions, hooks, UI components. (Jest, React Testing Library, Vitest) | Code complete on local branch. | Tests pass, >80% line coverage. |
| **Integration** | DB queries, API endpoints, component interactions. (Supertest, Testing Library) | Unit tests passed. | Contracts validated, DB state accurate. |
| **End-to-End (E2E)** | Full user journeys across UI, API, DB, and 3rd parties. (Playwright / Cypress) | Deployed to Preview environment. | Core business flows complete without errors. |
| **System** | Infrastructure, security, and load constraints. (k6, OWASP ZAP) | Staging environment stable. | SLA and load targets met. |
| **UAT** | Validation against business requirements by stakeholders. | E2E and System tests passed. | Sign-off by Product Owner. |
| **Smoke** | Quick verification of critical paths (Login, Calculator, Load Home). | Post-deployment (Staging/Prod). | Critical paths functional. |
| **Regression**| Full automated suite to catch unintended side effects. | Pre-release. | 100% pass rate on automated suite. |

---

## 5. Functional Testing

### Test Coverage Matrix

| Feature | Positive Scenarios | Negative Scenarios | Edge Cases |
| :--- | :--- | :--- | :--- |
| **Auth & User Mgmt** | Successful login/signup, profile updates, RBAC enforcement. | Invalid credentials, expired JWTs, unauthorized route access. | Concurrent logins, token refresh during active requests. |
| **Solar Calculator** | Accurate ROI/kVa generation, correct appliance tally. | Negative fuel spend, missing required fields. | Maximum allowed appliances, calculating exactly 0 grid usage. |
| **Quote Requests** | Customer creates lead, lead appears in Installer inbox. | Non-verified installer attempts to view leads. | Lead expires while customer is viewing it. |
| **Quote Comparison** | 3 bids display correctly, stats match DB. | Exceeding 3 bids per request (enforced rejection). | Two installers submit the 3rd bid at the exact same millisecond. |
| **Installer Portal** | Submit KYC, submit quote, move job to 'Completed'. | Submit quote with missing hardware line items. | Uploading a 50MB PDF for KYC (should reject). |
| **Payments (Escrow)**| Successful Paystack initialization, webhook updates DB to `SUCCESS`. | Customer cancels Paystack modal. Webhook signature invalid. | Webhook fires twice for the same transaction (Idempotency check). |
| **Admin Portal** | Approve KYC, view users, access audit logs. | Non-admin user attempts to reach `/admin`. | Suspending an installer while they have active Escrow projects. |

---

## 6. Non-Functional Testing
* **Performance:** Validating component render times, API response latency, and database query efficiency.
* **Load:** Simulating expected peak traffic (e.g., SEO spike on Calculator) to ensure system stability.
* **Stress:** Pushing the system beyond anticipated limits to observe failure modes and recovery capability.
* **Scalability:** Verifying the Supabase connection pooler (Supavisor) scales gracefully under concurrent load.
* **Security:** Dynamic and static analysis to identify vulnerabilities.
* **Accessibility:** Ensuring the platform is usable by individuals with visual, motor, or cognitive disabilities.
* **Compatibility:** Cross-browser and cross-device testing.
* **Reliability:** Testing system recovery after injected failures (e.g., database simulated downtime).

---

## 7. Security Testing
* **Authentication & Session:** Verify JWT expiration, secure HTTP-only cookies, and refresh token rotation. Test for session fixation.
* **Authorization (RLS):** Attempt horizontal and vertical privilege escalation. Verify a Customer cannot read another Customer's quotes, and Installers cannot view Admin logs.
* **Input Validation:** Fuzz testing on Calculator and Quote inputs. Verify Zod schemas block SQL Injection (SQLi) and NoSQL injection attempts.
* **OWASP Top 10:** Automated scanning via OWASP ZAP integrated into the CI pipeline.
* **API Security:** Verify rate limiting works (e.g., blocking excessive `/api/v1/auth/login` attempts).
* **File Uploads:** Verify KYC uploads are strictly validated for MIME type (images/PDFs only) and size (<5MB). Attempt to upload malicious scripts (`.sh`, `.exe`, polyglot files).

---

## 8. Accessibility (A11y) Testing
* **Keyboard Navigation:** Manually tab through the entire Solar Calculator and Quote Acceptance flows. Ensure no focus traps exist (except intentional ones in Modals).
* **Screen Readers:** Test primary flows using NVDA (Windows), VoiceOver (iOS/Mac), and TalkBack (Android). Ensure `aria-live` regions announce calculator updates.
* **Focus Management:** Ensure focus returns to the triggering button after closing a modal.
* **Colour Contrast:** Automated axe-core checks to guarantee 4.5:1 contrast for text and 3:1 for UI boundaries (buttons, inputs).
* **Forms & Errors:** Verify all form fields have explicit `<label>` elements and error messages are programmatically tied to inputs via `aria-describedby`.

---

## 9. Performance Testing
| Metric / Scenario | Target | Testing Tool |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 2.5s (3G Mobile) | Lighthouse / WebPageTest |
| **API Response Time** | < 200ms (95th Percentile)| k6 |
| **Concurrent Users (MVP)** | 10,000 sustained | k6 / Artillery |
| **Database Performance** | No queries > 500ms | Supabase Dashboard / pg_stat_statements |
| **File Uploads** | < 3s for 5MB file | Playwright Network Emulation |

---

## 10. Browser & Device Testing

**Support Strategy (Mobile-First for Nigerian Market):**
* **Tier 1 (Critical - Must be pixel-perfect):** Chrome (Android), Safari (iOS), Chrome (Desktop).
* **Tier 2 (Supported - Functional but minor visual degradation allowed):** Edge (Desktop), Firefox (Desktop/Android).
* **Tier 3 (Unsupported - Graceful degradation):** IE11, Opera Mini (Inform users that advanced features like interactive quoting require a modern browser).

*Testing will utilize BrowserStack or LambdaTest for cross-device coverage, focusing heavily on mid-range Android devices common in the target demographic.*

---

## 11. Test Data Management
* **Test Accounts:** Dedicated pre-seeded accounts in Staging (e.g., `admin@test.com`, `installer_verified@test.com`, `customer_active@test.com`).
* **Sample Datasets:** A deterministic database seed script (`seed.sql`) containing 50 hardware products, 20 installers, and realistic Nigerian geographic data.
* **Anonymised Data:** Production data must never be copied to lower environments without full PII obfuscation (hashing names, scrambling emails, replacing phone numbers).
* **Data Reset Strategy:** Integration tests must utilize transactional rollbacks or tear-down scripts to ensure isolated test execution. The Staging database is wiped and re-seeded weekly.

---

## 12. Defect Management

**Severity Levels:**
1.  **Critical (P0):** Data loss, Escrow/Payment failure, Security breach, Platform down. *Fix immediately. Stops release.*
2.  **High (P1):** Core feature broken with no workaround (e.g., Calculator crashes). *Fix within 24h. Stops release.*
3.  **Medium (P2):** Feature impaired but workaround exists (e.g., non-critical UI glitch). *Fix in next sprint.*
4.  **Low (P3):** Cosmetic issue, typo. *Added to backlog.*

**Bug Lifecycle:** `New` -> `Triaged` -> `In Progress` -> `In QA` -> `Resolved` -> `Closed`.

---

## 13. Release Readiness Checklist
Before merging to the `main` production branch, the following MUST be satisfied:
- [ ] **Functional:** 100% of Acceptance Criteria met and verified.
- [ ] **Regression:** E2E and Integration CI pipelines pass with 100% success.
- [ ] **Security:** No high/critical SAST/DAST vulnerabilities reported.
- [ ] **Accessibility:** Axe-core automated tests pass on all new components.
- [ ] **Performance:** Lighthouse CI scores remain above baseline targets.
- [ ] **Documentation:** API Specs and DB Schema docs updated (if applicable).
- [ ] **Approval:** PR approved by minimum 1 Lead Engineer and 1 QA Engineer.

---

## 14. Test Metrics
* **Defect Density:** Number of bugs found per feature deployment.
* **Test Coverage:** Percentage of codebase executed by automated tests (Target: >80% logic, >90% components).
* **Escaped Defects:** Bugs found in Production that bypassed QA (Target: 0 High/Critical).
* **Pass Rate:** Percentage of automated tests passing in CI (Target: 100% - flaky tests must be quarantined).
* **Automation Rate:** Percentage of test cases automated vs. manual (Target: 85%).
* **Mean Time to Resolution (MTTR):** Average time to fix and deploy a patch for a production defect.

---

## 15. QA Risks & Mitigation

| Risk | Description | Mitigation Strategy |
| :--- | :--- | :--- |
| **Paystack Dependency** | Unable to run E2E payment tests reliably due to 3rd party staging instability. | Mock the Paystack API layer for E2E tests, verifying only our system's webhook ingestion logic. |
| **Test Flakiness** | E2E tests failing randomly due to network timing or DB state bleeding. | Enforce strict DB teardowns per test. Use Playwright's auto-waiting features over hard `sleep()` commands. |
| **Inadequate Coverage** | Fast MVP timelines leading to skipped tests. | Enforce CI/CD coverage thresholds. A PR cannot merge if coverage drops below the 80% baseline. |
| **Data Privacy** | Exposing real user KYC data in staging environments. | Strict access controls on production DB. Implement anonymization scripts for any data cloning operations. |

---

## 16. Future Testing Roadmap
* **AI Energy Consultant:** Implement LLM evaluation frameworks to test the accuracy, hallucination rate, and security (prompt injection) of the Gemini integration.
* **Binance Wallet:** E2E testing using headless Web3 wallet simulators (e.g., Synpress) to automate signing transactions.
* **Mobile Applications:** Introduction of Appium or Detox for automated UI testing on native iOS and Android builds.
* **IoT Integrations:** Contract testing for high-throughput MQTT payloads from hardware inverters.

---

## 17. QA Decision Recommendations (QDRs)

### QDR 001: Implement Consumer-Driven Contract Testing (Pact)
* **Context:** As the frontend and backend teams iterate rapidly, there is a risk of API payload shapes changing and breaking the UI unexpectedly.
* **Recommendation:** Implement Contract Testing (e.g., using Pact) between the Next.js frontend (Consumer) and the API layer (Provider). This acts as an automated safety net, ensuring that the backend never deploys an API change that violates the exact JSON structure the frontend expects, significantly reducing the need for slow, brittle E2E tests.

---

**Approval Checklist**
- [ ] Test Pyramid strategy is clearly defined.
- [ ] Security and Accessibility are integrated as non-negotiable QA gates.
- [ ] Defect severity definitions are aligned with business priorities.
- [ ] Release Readiness checklist enforces continuous quality.

*Document Footer: Gridless Africa - QA & Testing Strategy v1.0*