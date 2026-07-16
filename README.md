# Gridless Africa (formerly SolarHub NG)

**Nigeria's Trusted Solar Marketplace.**

Gridless Africa is the definitive digital ecosystem designed to bridge the gap between energy-hungry consumers and verified renewable energy solutions. We solve the fragmentation of the Nigerian solar market by providing a trust-brokered marketplace connecting residential and commercial users with certified installers, premium hardware, and secure financial infrastructure.

---

## 🚀 Project Overview
The energy deficit in Nigeria forces millions to rely on unreliable, carbon-intensive power solutions. Gridless Africa simplifies the transition to solar by tackling the industry’s greatest bottlenecks: **trust, hardware standardization, and upfront capital**. 

Our platform empowers users to accurately size their energy needs, receive competitive quotes from vetted installers, and secure their payments through transparent escrow.

---

## 🔑 Key Features
* **Solar Savings Calculator:** AI-assisted load sizing and ROI visualization.
* **Installer Marketplace:** Verified, geofenced access to tier-1 and tier-2 solar engineering firms.
* **Quote Comparison:** Standardized bid matrices to eliminate price-gouging and confusion.
* **Secure Escrow:** Payment safety via Paystack integration, ensuring project completion before funds release.
* **Portals:** Role-based dashboards for Customers, Installers, and Administrators.
* **Lifecycle Management:** Post-installation maintenance booking and asset health tracking.

---

## 🛠 Technology Stack
We leverage a modern, serverless stack designed for high performance and rapid iteration:

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Backend/DB** | Supabase (PostgreSQL) |
| **Infrastructure** | Vercel (Edge/Serverless) |
| **Payments** | Paystack |
| **Integrations** | Google Maps, Resend |

---

## 📂 Repository Structure
```text
gridless-africa/
├── app/              # Next.js App Router (Pages & Routing)
├── components/       # Design System & UI Components
├── docs/             # Authoritative Project Documentation
├── features/         # Feature-based logic & business domains
├── lib/              # Shared utilities & API abstractions
├── public/           # Static assets
├── supabase/         # Database migrations & RLS definitions
└── .github/          # CI/CD workflows & issue templates
```

---

## 📚 Documentation Guide
All architectural, design, and operational details are maintained in the `/docs` directory. **All contributors and AI agents must review these documents before initiating work.**

### Start Here:
1.  **`docs/SHNG-IDX-001-PROJECT-INDEX.md`**: The master directory for all approved documents.
2.  **`docs/SHNG-AI-001-AI-DEVELOPMENT-GUIDE.md`**: The operational manual for AI-assisted development.

### Document Categories:
* **Project:** Constitution, Index, Roadmap.
* **Strategy:** Discovery, PRD, UX Strategy.
* **Architecture:** Tech Specs, Database, API, Security.
* **Engineering:** Frontend, Backend, DevOps, Component Library.
* **Design:** Information Architecture, User Flows, Wireframes, Design System.

---

## ⚙️ Development Workflow
Our workflow is strictly ordered to maintain architectural integrity:
1. **Planning:** Review PRD & Roadmap.
2. **Documentation:** Update/Reference architectural specs.
3. **Review:** Human/AI validation of proposed changes.
4. **Implementation:** AI-assisted development adhering to `SHNG-AI-001`.
5. **Testing:** Automated execution of the QA suite.
6. **Deployment:** Continuous delivery via CI/CD.

---

## 🚀 Getting Started
1. **Clone:** `git clone [repository-url]`
2. **Install:** `npm install`
3. **Configure:** Copy `.env.example` to `.env.local` and populate keys.
4. **Run:** `npm run dev`

---

## 📊 Project Status
**Current Stage:** Documentation Complete — Preparing for MVP Development.

---

## 🤝 Contribution
This project follows a strict **Documentation-First** policy. Before proposing changes or opening a Pull Request, contributors must review the relevant documentation in `/docs`. Ensure all new code adheres to the principles defined in `SHNG-CON-001` (Project Constitution).

---

## ⚖️ License
[Placeholder: TBD - All rights reserved]

---

## 📧 Contact
* **Website:** [gridless.africa](https://gridless.africa)
* **Support:** [support@gridless.africa](mailto:support@gridless.africa)
* **GitHub:** [gridless-africa/gridless-africa](https://github.com/gridless-africa)