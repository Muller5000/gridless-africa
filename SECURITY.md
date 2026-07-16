# Security Policy

Gridless Africa is committed to the highest standards of platform security. We recognize that trust is the foundation of our mission to digitize the solar market in Nigeria. Protecting our users' PII (Personally Identifiable Information), financial transactions, and escrowed funds is our primary operational priority. We utilize a **Security-by-Design** philosophy, embedding defensive controls into our architectural blueprint rather than treating security as an afterthought.

---

## 1. Supported Versions

We currently support the following versioning for security updates:

| Version | Supported |
| :--- | :--- |
| **1.x** | ✅ Yes |
| **< 1.0** | ❌ No |

*Note: As we progress toward our public release (v2.0.0), this policy will evolve to provide security patching for the current and previous major versions.*

---

## 2. Reporting a Vulnerability

If you believe you have discovered a security vulnerability in Gridless Africa, please report it to our security team immediately. **Do not report security issues in public GitHub issues or discussions.**

Please email **security@gridless.africa** with the following information:

* **Steps to Reproduce:** A clear, concise summary of how to trigger the vulnerability.
* **Affected Component:** Which part of the system is impacted (e.g., API, Dashboard, Auth).
* **Potential Impact:** Why this vulnerability is significant to our users or platform.
* **Evidence:** Screenshots, logs, or request/response payloads if available.

---

## 3. Response Process

We strive to handle security reports with urgency and transparency:

1. **Acknowledgment:** We aim to acknowledge receipt of your report within 72 hours.
2. **Validation:** Our team will verify the findings within our staging environment.
3. **Severity Assessment:** We will categorize the impact according to our defined severity levels.
4. **Remediation:** Development of a secure fix by our engineering team.
5. **Testing:** Rigorous regression and security testing of the fix.
6. **Disclosure:** Coordination of a patch release and CVE issuance if appropriate.
7. **Release:** Deployment of the update to production.

---

## 4. Severity Levels

| Severity | Definition | Expected Priority |
| :--- | :--- | :--- |
| **Critical** | RCE, direct data exfiltration, bypass of payment escrow. | Immediate |
| **High** | Auth bypass, privilege escalation, PII exposure. | < 24 Hours |
| **Medium** | CSRF, non-critical information disclosure. | Next Sprint |
| **Low** | Cosmetic security issues, missing best practices. | Backlog |

---

## 5. Secure Development Principles

All development, including AI-assisted contributions, must adhere to:

* **Least Privilege:** Roles (Customer, Installer, Admin) must only access data necessary for their function.
* **Defense in Depth:** Multiple layers of protection (WAF, RLS, Input Validation).
* **Secure Defaults:** Features are built in their most secure configuration by default.
* **Input Validation:** All user data is validated against strict Zod schemas on both client and server.
* **Encryption:** Mandatory TLS 1.3 in transit and AES-256 transparent encryption at rest.
* **Audit Logging:** Every administrative action or data mutation is logged with an immutable audit trail.

*Reference: For detailed technical requirements, see `docs/SHNG-SEC-001-SECURITY-ARCHITECTURE.md`.*

---

## 6. AI-Assisted Development Security

Given our AI-assisted workflow, all generated code must:
* **Follow Approved Architecture:** AI must strictly adhere to the `SHNG-ARCH-001` blueprint.
* **Zero Hard-coded Secrets:** AI is strictly forbidden from generating or suggesting hard-coded API keys or credentials.
* **Human-in-the-Loop:** No AI-generated code is permitted to merge without a mandatory human code review focusing on security constraints.
* **Standard Compliance:** All code must conform to the defined coding standards in our frontend/backend engineering specifications.

---

## 7. Third-Party Dependencies

* **Review:** New dependencies undergo a security review before addition.
* **Updates:** Automated scanning (e.g., Snyk/Dependabot) flags vulnerabilities for immediate patching.
* **Housekeeping:** Unused packages are removed during every sprint to reduce the attack surface.

---

## 8. Infrastructure Security

* **Configuration:** All environment variables are managed via encrypted CI/CD pipeline secrets.
* **Access Control:** Production infrastructure access is restricted to the DevOps/SRE lead via multi-factor authentication.
* **Audit Trails:** All system access and deployment logs are centrally stored for forensic analysis.

---

## 9. Future Security Enhancements

As Gridless Africa matures, we will implement:
* Quarterly third-party penetration testing.
* Automated dynamic security scanning (DAST) in the CI/CD pipeline.
* Comprehensive infrastructure-as-code security reviews.
* Formalized Bug Bounty program evaluation.

---

## 10. Contact

* **Security Email:** security@gridless.africa
* **Project Website:** [gridless.africa](https://gridless.africa)
* **Responsible Disclosure:** [gridless.africa/security](https://gridless.africa/security)