---
# COVER PAGE

**Document ID:** SHNG-SEC-001
**Title:** Security Architecture
**Project Name:** Gridless Africa
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Chief Information Security Officer (CISO) / Security Architecture Team
**Intended Audience:** Engineering, DevOps, Compliance Officers, Executive Stakeholders
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | CISO | Initial Baseline. Aligned with Constitution v1.0. |

## Related Documents & Dependencies
* **Project Constitution v1.0** (SH-NG-CONST-001)
* **Technical Architecture v1.0** (SHNG-ARCH-001)
* **Database Design v1.0** (SHNG-DB-001)
* **API Specification v1.0** (SHNG-API-001)

## Approval Workflow
1.  **Draft Review:** Lead Engineers (Pending)
2.  **Compliance Audit:** Compliance Consultant (Pending)
3.  **Final Sign-off:** CTO / Co-Founder (Pending)

---

## 1. Executive Summary
Security is our primary product feature. For Gridless Africa, trust is the currency; if users cannot trust us with their financial identity or energy infrastructure, the marketplace fails. This document outlines a "Security-by-Design" posture, utilizing a Zero Trust approach to infrastructure and application security. We focus on protecting the three pillars of our platform: **Financial Integrity** (Payments/Escrow), **User Privacy** (KYC/Identity), and **Operational Resilience** (System Availability).

## 2. Security Principles
* **Zero Trust:** Never trust, always verify. Every request, internal or external, must be authenticated and authorized.
* **Least Privilege:** Access rights are granted only for the duration and scope required.
* **Defense in Depth:** Multiple, overlapping security controls to protect critical data.
* **Secure by Default:** Features are secure before they are functional.
* **Privacy by Design:** Minimize data collection (PII) to only what is strictly necessary for regulatory and operational goals.
* **Separation of Duties:** Administrative access to production databases and payment configurations is split across multiple authorized roles.

## 3. Threat Model

| Actor | Intent | Attack Surface |
| :--- | :--- | :--- |
| **Attacker** | Financial theft, data exfiltration | APIs, Auth tokens, Payment webhooks |
| **Malicious Installer** | Fraudulent quoting, fund diversion | Quote bidding, Escrow payouts |
| **Insider/Admin** | Unauthorized data access | DB queries, Infrastructure config |
| **Third-Party** | Data leakage, supply chain exploit | API keys, OAuth tokens |

* **Attack Surfaces:** API endpoints, Webhook listeners, Admin portals, File upload streams.

## 4. Identity & Access Management (IAM)
* **Authentication:** Supabase Auth (JWT). 
* **MFA:** Mandatory for all Admin and Installer company-owner accounts (TOTP).
* **RBAC:** Roles defined as `customer`, `installer`, `vendor`, `admin`. Middleware checks JWT claims before routing.
* **Session Strategy:** Short-lived tokens. Refresh token rotation implemented via secure, HTTP-only cookies.
* **Future Web3:** Phase 3 will use EIP-4361 (Sign-In with Ethereum) to authenticate Binance Wallet users without password storage.

## 5. Data Security
* **At Rest:** PostgreSQL storage (Supabase default) uses AES-256 transparent data encryption.
* **In Transit:** Mandatory TLS 1.3 for all internal and external communication. 
* **PII Handling:** Highly sensitive PII (NIN, CAC docs) is tagged in the database. 
* **Backups:** Encrypted at source; stored in an isolated, restricted-access vault (S3 with IAM-locked buckets).

## 6. API Security
* **JWT Validation:** Every request validated against the Supabase JWT secret.
* **Rate Limiting:** Implemented at Vercel/Edge level; specific thresholds for Auth and Quote-request endpoints.
* **Input/Output:** Strict Zod schema validation on ingress; output filtering to prevent PII leakage.
* **Replay Protection:** Nonces required for critical mutations (e.g., payment initialization).

## 7. Database Security
* **RLS (Row-Level Security):** The primary defense. Policy: `(auth.uid() = user_id)` for personal data, `(is_admin())` for global management.
* **Database Roles:** The API key has limited `anon` and `authenticated` roles, strictly preventing the API from dropping tables or changing schemas.
* **Audit Logging:** Every `UPDATE/DELETE` on sensitive tables (payments, KYC) logs the actor, timestamp, and row delta to `audit.audit_logs`.

## 8. Infrastructure Security
* **Vercel:** Protection against DDoS via platform-native WAF.
* **Environment Variables:** Strictly managed in Vercel UI; never committed to code.
* **Supabase:** Database is configured to block direct public access, forcing all traffic through the Supabase API Gateway (PostgREST).

## 9. File & Media Security
* **Scan Strategy:** All uploads (KYC docs) must be scanned for malware before moving from a 'temporary' bucket to a 'processed' bucket.
* **Signed URLs:** Users never get direct access to storage. They receive time-limited (15-min) signed URLs to download docs.
* **Naming:** All filenames are sanitized/renamed to UUIDs on upload to prevent directory traversal attacks.

## 10. Payment Security
* **Webhook Verification:** Paystack signature hash must be validated against `PAYSTACK_SECRET_KEY` on every callback.
* **Transaction Integrity:** Payments are initialized by server-side code, never by the client directly.
* **Fraud:** Flagging of quotes where amounts exceed historical averages for that Installer category.

## 11. Third-Party Security
* **API Keys:** Rotated quarterly. Stored in Secret Manager.
* **Scoped Keys:** Usage of restricted API keys (e.g., Google Maps keys scoped only to our domains).
* **AI Sanitization:** Any prompt sent to Gemini is scrubbed of PII/User names before egress.

## 12. Logging & Monitoring
* **Sentry:** Capturing application-level errors and crashes.
* **Axiom/Datadog:** Aggregated logging for security alerts (e.g., multiple failed auth attempts).
* **Alerting:** PagerDuty for critical production failures.

## 13. Incident Response Plan
* **Level 1 (Low):** Non-sensitive data discrepancy. Fix within 48 hrs.
* **Level 2 (Med):** Misconfigured RLS, partial data exposure. Contain within 4 hrs.
* **Level 3 (High):** Payment breach, full PII exposure. Instant lockdown, breach notification as per NDPR.

## 14. Compliance Considerations
* **OWASP Top 10:** Monthly automated scans.
* **NDPR (Nigeria Data Protection Regulation):** Users have right to be forgotten (via soft-delete purge process).

## 15. Security Testing Strategy
* **SAST:** GitHub Actions pipeline runs automated security scanning (Semgrep) on every commit.
* **Dependency Scanning:** Snyk/Dependabot to catch vulnerable npm packages.
* **Pentesting:** Annual third-party penetration test scheduled before Phase 2 launch.

## 16. Business Continuity & Disaster Recovery
* **RPO (Recovery Point Objective):** 1 minute.
* **RTO (Recovery Time Objective):** 4 hours.
* **Restore Testing:** Quarterly "Game Day" exercise where we restore a DB backup to a test instance.

## 17. Security Risks & Mitigation

| Risk | Mitigation |
| :--- | :--- |
| **Credential Theft** | Mandate MFA for Admins; token revocation capability. |
| **SQL Injection** | Enforce Zod-validated parameterized queries via Supabase Client. |
| **Social Engineering** | Security awareness training for customer support staff. |

## 18. Future Security Roadmap
* **Mobile Apps:** Certificate pinning to prevent man-in-the-middle attacks.
* **IoT Monitoring:** Encryption of telemetry data at the inverter source using TLS tunnels.
* **Global Expansion:** Localized data residency compliance check (GDPR for EU, etc.).

## 19. Security Decision Recommendations (SDRs)
*None at this time.*

---

**Security Review Checklist**
- [ ] Are all PII fields encrypted/masked?
- [ ] Do RLS policies prevent ID enumeration?
- [ ] Is webhook validation enabled for Paystack?
- [ ] Is CI/CD scanning enabled?

*Document Footer: Gridless Africa - Security Architecture v1.0*