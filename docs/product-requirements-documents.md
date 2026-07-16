---
# COVER PAGE

**Project Name:** Gridless Africa (formerly SolarHub NG)
**Document Title:** Product Requirements Document (PRD)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Approved for Engineering & Design
**Author:** Head of Product / Founding Team
**Approval Status:** Approved by Co-Founder

---

## Change Log (v1.0)

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Head of Product | Initial Baseline Draft. Aligned with Strategy v1.1. |

---

## Executive Summary
This PRD outlines the requirements for **Gridless Africa** (Phase 1 MVP), a managed digital ecosystem connecting Nigerian households and SMEs with vetted solar installers and verified hardware vendors. By standardizing quote comparisons, offering a flagship Solar Savings Calculator, and providing a foundational product catalogue, the MVP will establish trust and transparency in a highly fragmented renewable energy market.

---

## Table of Contents
1. Product Overview, Vision, and Goals
2. Success Metrics
3. Assumptions and Constraints
4. User Types, Personas, Roles, and Permissions
5. Functional & Non-Functional Requirements
6. Complete Feature Catalogue & Prioritization
7. Detailed User Stories & Acceptance Criteria
8. Business Rules, Edge Cases, & Error States
9. Notifications & Analytics
10. Portal & Core Feature Requirements
11. Future Scope & Roadmap Alignment

---

## 1. Product Overview, Vision, and Goals
**1.1. Product Overview**
Gridless Africa is a B2B2C Progressive Web App (PWA) facilitating the end-to-end discovery, sizing, and procurement of solar energy solutions. The MVP focuses strictly on user onboarding, accurate system sizing via our calculator, standardized quote matching, and basic project tracking.

**1.2. Vision**
To democratize access to reliable renewable energy across Africa through trust and transparency.

**1.3. Product Goal (MVP)**
Deploy a stable, high-converting platform in the Lagos/Oyo corridor that successfully captures high-intent leads via the Solar Savings Calculator and routes them to vetted installers.

## 2. Success Metrics (Year 1)

| Metric Category | Target |
| :--- | :--- |
| **Acquisition** | 10,000 completed Solar Savings Calculator sessions |
| **Liquidity** | 80% of quote requests receive 3 bids within 24 hours |
| **Supply Quality** | 50 fully verified Tier-1/Tier-2 installers; 10 verified OEM vendors |
| **Financials** | Process ₦500M in localized GMV (Installations + Hardware) |

## 3. Assumptions and Constraints
* **Assumptions:** Target users have smartphones and basic internet access; installers are willing to adopt a new digital workflow for qualified leads.
* **Constraints:** Launching exclusively in Lagos and Oyo States; Escrow payments for MVP will be tracked on-platform but manually reconciled via third-party gateways; Web-only (PWA), no native mobile apps.

## 4. User Types, Personas, Roles, and Permissions
**4.1. User Types & Personas**
1.  **Guest:** Unregistered visitor, utilizes the calculator for estimates.
2.  **Customer (B2C/B2B):** Homeowner or SME seeking solar installation or hardware.
3.  **Installer:** Vetted solar technician/engineering firm providing quotes and services.
4.  **Vendor (OEM/Distributor):** Verified supplier listing hardware in the catalogue.
5.  **Admin:** Gridless Africa internal staff managing KYC, disputes, and marketplace liquidity.

**4.2. User Roles and Permissions**

| Role | Permissions |
| :--- | :--- |
| **Guest** | Access calculator, view public catalogue, read reviews. |
| **Customer** | Submit quote requests, view/accept bids, leave reviews, manage profile. |
| **Installer** | Access lead dashboard, submit quotes, update project milestones, manage profile. |
| **Vendor** | Upload products to catalogue, update pricing/specs. |
| **Admin** | Approve/reject users (KYC), suspend accounts, manage escrow statuses, view global analytics. |

## 5. Functional & Non-Functional Requirements
**5.1. Functional Requirements**
* **Authentication:** Email/Password and Google OAuth.
* **Routing Logic (Smart Triage):** The system must categorize leads by budget (<₦500k, ₦1M-4M, >₦5M) and route them to appropriate installer tiers or product vendors.
* **Calculator Engine:** Algorithm to compute load, battery capacity, and ROI based on user inputs.
* **Bidding System:** Limit quotes to 3 per customer request to prevent overwhelming the user.

**5.2. Non-Functional Requirements**
* **Performance:** Page load time under 2.5 seconds on 3G networks.
* **Responsiveness:** Mobile-first Progressive Web App (PWA) layout.
* **Security:** Data encryption at rest and in transit (TLS 1.2+); secure password hashing (bcrypt).
* **Availability:** 99.9% uptime SLA.

## 6. Complete Feature Catalogue & Prioritization
**6.1. Feature Catalogue**
* Auth & Onboarding (Customers, Installers, Vendors)
* Admin KYC & Verification Workflow
* Solar Savings Calculator
* Basic Product Catalogue
* Standardized Quote Request Engine
* Installer Bidding Dashboard
* Customer Quote Comparison View
* Project Tracking & Milestone Status
* Review & Rating System

**6.2. Feature Prioritization (MoSCoW)**

| Feature | Priority | Phase |
| :--- | :--- | :--- |
| Auth & KYC Verification | **Must Have** | MVP (Phase 1) |
| Solar Savings Calculator | **Must Have** | MVP (Phase 1) |
| Quote Bidding / Comparison | **Must Have** | MVP (Phase 1) |
| Product Catalogue (Browsing) | **Must Have** | MVP (Phase 1) |
| Escrow Payment Gateway | **Should Have** | MVP (Phase 1) |
| Hardware Purchasing / Checkout | **Could Have** | Growth (Phase 2) |
| AI Energy Consultant | **Won't Have** | Growth (Phase 2) |
| Financing Application Portal | **Won't Have** | Growth (Phase 2) |
| Binance Wallet Integration | **Won't Have** | Scale (Phase 3) |

## 7. Detailed User Stories & Acceptance Criteria

| User Story | Acceptance Criteria (AC) |
| :--- | :--- |
| **As a Guest**, I want to calculate my energy needs, **so that** I know what size system I need. | 1. Calculator accepts appliances, usage, fuel spend. <br> 2. Outputs required kVa and ROI. |
| **As a Customer**, I want to compare 3 quotes, **so that** I get the best market rate. | 1. Dashboard displays max 3 bids side-by-side. <br> 2. Specs and labor are separated. |
| **As an Installer**, I want to upload my CAC and past work, **so that** I can be verified. | 1. Secure document upload portal. <br> 2. Status shows "Pending" until Admin action. |
| **As an Admin**, I want to approve/reject installers, **so that** only vetted pros quote users. | 1. Admin dashboard lists pending KYC. <br> 2. Approve button triggers status change and email. |

## 8. Business Rules, Edge Cases, & Error States
**8.1. Business Rules**
* **Three-Bid Rule:** A customer request can receive a maximum of 3 installer bids.
* **Vetting Mandate:** Installers cannot submit bids until their KYC status is "Verified" by an Admin.
* **Review Gate:** Customers can only leave a review if a project's status is marked "Completed."
* **Geo-Fencing:** During MVP, service requests outside Lagos and Oyo states will be waitlisted.

**8.2. Edge Cases**
* **Installer Abandons Bid:** If an installer fails to quote within 24 hours of accepting a lead, the lead is reopened to the marketplace.
* **Product Out of Stock:** If a vendor updates an item to "Out of Stock," active quotes containing that item trigger a warning to the installer.
* **Currency Fluctuation:** Quotes are valid for a maximum of 7 days due to FX volatility.

**8.3. Error States**
* **Calculator Input Error:** Highlight missing fields in red (e.g., "Please enter your current fuel spend.").
* **Failed Document Upload:** Display "File exceeds 5MB or invalid format (PDF, JPG, PNG only)."
* **No Match Found:** Display "We are currently expanding our installer network in your area. You have been waitlisted."

## 9. Notifications & Analytics
**9.1. Notifications and Communication Requirements**
* **Email (Transactional):** Welcome emails, KYC approval, New Bid received, Quote Accepted, Project Completed.
* **In-App Alerts:** Red badge counters on dashboards for pending actions.

**9.2. Reporting and Analytics Requirements**
* **Admin Analytics:** Total active users, GMV pipeline, average time-to-bid, geographic heatmaps.
* **Calculator Drop-off:** Event tracking (Google Analytics/Mixpanel) to identify where users abandon the flow.

## 10. Portal & Core Feature Requirements
**10.1. Admin Portal Requirements**
* **User Management:** Table view of all users with filtering by role and verification status.
* **KYC Review:** Interface to view uploaded documents (CAC, certifications) and toggle status.
* **System Overrides:** Ability to manually match a lead to an installer.

**10.2. Installer Portal Requirements**
* **Lead Inbox:** List of available, budget-matched leads in their operational area.
* **Quoting Engine:** Form to input hardware costs, labor, and warranty duration, outputting standard format.
* **Project Pipeline:** Kanban board view (Lead -> Quoted -> Accepted -> In Progress -> Completed).

**10.3. Customer Portal Requirements**
* **My Projects:** Dashboard showing active quote requests and status.
* **Quote Compare View:** Side-by-side table comparing equipment brands, total cost, and installer ratings.
* **Project Milestones:** Status tracker for active installations.

**10.4. Equipment Marketplace Requirements (MVP Catalogue)**
* **Product Listing:** Grid view of verified hardware categorized by Panels, Inverters, Batteries, etc.
* **Product Detail Page:** Display specifications (Wattage, Voltage, Cycle Life), manufacturer, and verified vendor name.
* **"Quote with this" Button:** Allows users to select hardware and require installers to use it in their bids.

**10.5. Solar Savings Calculator Requirements**
* **Inputs:** Appliances, run-time hours, monthly electricity bill (₦), weekly petrol/diesel spend (₦).
* **Outputs:** Recommended Inverter Size (kVa), Battery Capacity (kWh), Number of Panels.
* **Financials:** Estimated total cost range, monthly savings, and payback period in months.
* **Lead Capture:** Requires email and phone number to view final detailed ROI breakdown.

**10.6. Quote Comparison Workflow**
1. Customer submits calculator output.
2. Matched installers receive notification.
3. Installers submit standardized bids.
4. Customer views a standardized side-by-side matrix of up to 3 bids.
5. Customer clicks "Accept Quote."

**10.7. Review and Rating System**
* **Post-Install Trigger:** Activated only when project status is "Completed."
* **Criteria:** 5-star rating on Punctuality, Quality of Work, and Professionalism, plus a text review.
* **Visibility:** Displayed on the Installer's public profile and during the Quote Comparison step.

## 11. Future Scope & Roadmap Alignment
**11.1. Future AI Energy Consultant Requirements (Phase 2)**
Integration of Google Gemini API to parse customer text inputs, explain solar concepts, and summarize quotes in plain English.

**11.2. Future Financing Integration Requirements (Phase 2)**
A "Request Financing" module linking customer data (with consent) via API to approved third-party lenders for credit underwriting.

**11.3. Future Binance Wallet Integration Requirements (Phase 3)**
Optional Web3 login, digital warranty minting, and loyalty token distribution via Binance APIs.

**11.4. Out-of-Scope Features (For Phase 1 MVP)**
* In-app direct checkout/payment for hardware (transactions happen via the project quote).
* Maintenance booking engine.
* Solar Health Score computation.
* Automated Escrow API disbursement.

**11.5. MVP Scope & Roadmap Alignment**
The strict boundary of the MVP is the **Lead-to-Quote Pipeline**. This PRD fulfills Phase 1 of the Gridless Africa Strategy v1.1. Upon successful deployment and stabilization, PRD Version 2.0 will be drafted to initiate Phase 2 (Growth).

---
**References:** * *Project Constitution v1.0*
* *Gridless Africa Product Discovery & Startup Strategy v1.1*

*Document Footer: Gridless Africa - Product Requirements Document v1.0*