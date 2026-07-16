# Contributing to Gridless Africa

Welcome! We are excited that you are interested in contributing to Gridless Africa. We are building the most trusted digital ecosystem for renewable energy in Nigeria, and we believe that collaboration—between humans and AI—is the key to our success.

Our development culture is grounded in a **Documentation-First** and **AI-Assisted** philosophy. Whether you are a human developer or an AI coding agent, your contributions are expected to be high-quality, secure, and perfectly aligned with our established architectural baseline.

---

## 1. Before You Start
**Stop!** Before opening your editor or prompting an AI assistant, you must familiarize yourself with the project’s source of truth. Please read:

1.  **`README.md`**: For the high-level project vision.
2.  **`docs/SHNG-IDX-001-PROJECT-INDEX.md`**: The master directory for all approved project documentation.
3.  **`docs/SHNG-AI-001-AI-DEVELOPMENT-GUIDE.md`**: The operational manual if you are using AI coding tools.
4.  **Relevant `/docs` files:** Ensure you have read the PRD, Architecture, and API specifications pertinent to your task.

*If you do not understand the documentation, do not attempt to write code.*

---

## 2. Development Workflow
We follow a structured, incremental workflow to ensure stability and quality:

1.  **Understand:** Review the feature request or bug report.
2.  **Study:** Read all relevant documents in `/docs`.
3.  **Branch:** Create a new feature branch.
4.  **Implement:** Focus on **one feature only**.
5.  **Test:** Run unit and integration tests; verify against PRD requirements.
6.  **Document:** Update specs if the implementation deviates from the initial plan.
7.  **Submit:** Open a Pull Request using our standard template.
8.  **Review:** Participate in code reviews (human or AI-led).
9.  **Merge:** Merge only after approval.

---

## 3. Branch Naming & Commit Conventions
We follow **Conventional Commits** to maintain a clean, navigable history.

### Branch Naming
| Type | Naming Example | Purpose |
| :--- | :--- | :--- |
| **feature** | `feat/solar-calculator-ui` | New functionality. |
| **fix** | `fix/payment-webhook-retry` | Resolving a bug. |
| **docs** | `docs/update-api-spec` | Documentation changes. |
| **refactor**| `refactor/api-layer-abstraction`| Improving code without changing behavior. |
| **chore** | `chore/update-deps` | Maintenance tasks. |
| **hotfix** | `hotfix/security-patch-001` | Critical production issues. |

### Commit Messages
Use the format: `<type>(<scope>): <description>`
* `feat(quotes): add bid comparison matrix`
* `fix(auth): resolve session expiry loop`
* `docs(ia): update site map structure`

---

## 4. Coding & AI Contribution Guidelines

### For Human Contributors
* Adhere to the standards defined in `SHNG-FE-001` (Frontend) and `SHNG-BE-001` (Backend).
* Prioritize **Accessibility (WCAG 2.2 AA)** and **Security (RLS)** in every PR.

### For AI Coding Assistants
* **Read Before Coding:** Always check the documentation files (`/docs`) before generating code.
* **Never Contradict:** If your proposed code conflicts with an approved spec, generate an **ADR (Architectural Decision Recommendation)** instead of ignoring the spec.
* **Single Responsibility:** Build one feature at a time. No "extra" refactoring unless authorized.
* **Transparency:** Explain your assumptions. If an API endpoint is missing, report the ambiguity rather than guessing.

---

## 5. Documentation Updates
We maintain a "Documentation-First" policy. If your implementation requires a change to how our API functions, our database schema, or a user flow:
1. Propose the change in the PR.
2. Update the corresponding markdown file in `/docs`.
3. Increment the document version number.

---

## 6. Pull Request Checklist
Before submitting a PR, ensure you have addressed the following:
- [ ] **Documentation:** Have you verified alignment with the relevant `/docs` files?
- [ ] **Tests:** Have all relevant unit/integration tests passed?
- [ ] **Scope:** Is this limited to one feature/fix only?
- [ ] **Standards:** Are TypeScript, Tailwind, and React standards followed?
- [ ] **Accessibility:** Is WCAG 2.2 AA support maintained?
- [ ] **Security:** Have you validated inputs and ensured RLS is active?
- [ ] **Readiness:** Is the PR summary complete and ready for human review?

---

## 7. Code Review Expectations
Reviewers (human or AI) will evaluate your contribution based on:
* **Correctness:** Does it fulfill the PRD requirements?
* **Maintainability:** Is the code clean, modular, and well-typed?
* **Performance:** Are there unnecessary re-renders or heavy blocking calls?
* **Security:** Are data ingress/egress points properly guarded?
* **Documentation Alignment:** Does this change require an update to the specs?

---

## 8. Development Principles
* **Documentation First:** If it isn't documented, it isn't built.
* **Simplicity:** Prefer simple code over clever code.
* **Security by Design:** Security is the foundation, not an afterthought.
* **Test Early:** Tests are not a "post-dev" activity; they are part of the implementation.
* **Build Incrementally:** We ship small, high-quality units of value.

---

## 9. Issue Reporting
To report a bug, request a feature, or suggest documentation improvements, please use the templates provided in the `.github/ISSUE_TEMPLATE` folder:
* **Bug Report:** Include reproduction steps and expected vs. actual behavior.
* **Feature Request:** Describe the user story and benefit.
* **Documentation Improvement:** Link the specific document and suggest the change.

---

## 10. Communication
We value respectful collaboration, constructive feedback, and evidence-based discussions. All communication should be focused on the project's success and alignment with our approved architectural foundations.

---

## 11. Getting Help
If you are blocked, do not guess. Consult:
1. The project `README.md`.
2. The `PROJECT-INDEX.md` to find the right spec.
3. The `AI-DEVELOPMENT-GUIDE.md` (`SHNG-AI-001`).
4. If you still have questions, open an Issue or start a discussion in our communication channels.

---

*Thank you for helping us build a more sustainable energy future for Nigeria!*