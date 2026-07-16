---
# COVER PAGE

**Document ID:** SHNG-ARCH-001
**Title:** Technical Architecture
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Approved / Active Baseline
**Author:** Chief Technology Officer / Architecture Team
**Intended Audience:** Engineering Leadership, Product Managers, Backend/Frontend Engineers, DevOps, Security Teams.
**Approval Status:** Approved by Co-Founder

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | CTO | Initial Baseline. Integrated ADR 001 (Hybrid API), ADR 002 (Dropped Flutterwave for MVP), and ADR 003 (Dropped Redis for MVP). |

## Related Documents & Dependencies
* **Project Constitution v1.0** (SH-NG-CONST-001)
* **Product Requirements Document (PRD) v1.0** (SH-NG-PRD-001)
* **Product Discovery & Startup Strategy v1.1** (SH-NG-STRAT-001)
* **Master Project Index v1.0** (GA-INDEX-001)

---

## 1. Executive Summary
This Technical Architecture document defines the structural foundation for **Gridless Africa**. To achieve rapid time-to-market while guaranteeing enterprise-grade security and scalability, we are adopting a Serverless, Composable Architecture. The system leverages Next.js on Vercel for the frontend and server-side logic, integrated deeply with Supabase (managed PostgreSQL) as our Backend-as-a-Service (BaaS). This architecture supports our core business goals of establishing trust, facilitating secure escrow via Paystack, and delivering the flagship Solar Savings Calculator with high performance and reliability.

## 2. Architectural Goals
* **Scalability:** Must support rapid user acquisition driven by the Solar Savings Calculator SEO strategy without performance degradation.
* **Reliability & Availability:** 99.9% uptime SLA to maintain trust. Resilient to localized network fluctuations in Nigeria.
* **Performance:** Sub-2.5s initial load times on 3G networks (Mobile-First).
* **Security:** Uncompromising protection of PII, KYC documents, and financial data.
* **Maintainability:** Clean, modular codebases facilitating fast onboarding for new engineers.
* **Cost Optimization:** Serverless/pay-as-you-go infrastructure to minimize idle burn rates during the MVP phase.
* **Modularity:** Clear separation of concerns enabling future pivots.

## 3. Architecture Principles
Strictly aligning with **Project Constitution v1.0**:
* **API-First:** All core business logic will be exposed via APIs/Server Actions, enabling future B2B integrations and mobile apps.
* **Mobile-First:** Progressive Web App (PWA) rendering, optimized for mobile viewports and touch interactions.
* **Security-First:** Zero Trust model. Strict Role-Based Access Control (RBAC) and Row-Level Security (RLS).
* **Cloud-Native:** Fully managed serverless infrastructure; zero bare-metal management.
* **Event-Driven (Where Appropriate):** Using webhooks for asynchronous payment confirmations and KYC state changes.
* **Reusable Components:** Strict adherence to a central Design System.

## 4. Recommended Technology Stack

| Domain | Technology | Rationale | Trade-offs & Alternatives |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | Next.js (React) | Industry standard for SSR/SSG. Excellent SEO for the Calculator. | *Alt:* Remix. *Trade-off:* Vendor lock-in to Vercel features. |
| **Language** | TypeScript | Eliminates runtime type errors; mandatory per Constitution. | *Alt:* JavaScript (Rejected due to strict quality gates). |
| **Styling** | Tailwind CSS | Rapid UI development, highly maintainable utility classes. | *Alt:* Styled Components (Slower runtime). |
| **Backend / DB** | Supabase (PostgreSQL) | Instant BaaS, powerful Row Level Security (RLS), auto-generated APIs. | *Alt:* AWS RDS + Node.js (Higher dev/ops overhead for MVP). |
| **Authentication** | Supabase Auth | Seamless integration with Postgres RLS; supports OAuth & Email. | *Alt:* Auth0 (Expensive at scale). |
| **Maps & Routing** | Google Maps Platform | Most accurate geolocation data for Nigerian addresses. | *Alt:* Mapbox (Less localized accuracy in West Africa). |
| **Payments** | Paystack | Dominant, trusted gateway in Nigeria with robust Escrow/Transfer APIs. | *Alt:* Stripe (Not fully supported in target market). |
| **Hosting** | Vercel | Seamless Next.js deployment, Edge networking, built-in CI/CD. | *Alt:* AWS Amplify / EC2 (Higher devops maintenance). |
| **Storage** | Supabase Storage | S3-compatible, integrated securely with Auth/RLS for KYC docs. | *Alt:* AWS S3 (Requires separate credential management). |
| **Email** | Resend | Developer-friendly, React-email integration, excellent deliverability. | *Alt:* SendGrid (Slower to integrate modern React templates). |

## 5. High-Level System Architecture

```mermaid
graph TD
    %% Clients
    Browser[Web Browser / PWA]
    
    %% Delivery
    CDN[Vercel Edge CDN]
    
    %% Frontend / BFF Layer
    subgraph Vercel Environment
        NextApp[Next.js Application]
        ServerActions[Server Actions / API Routes]
    end
    
    %% Backend Layer
    subgraph Supabase Environment
        SupabaseAuth[Supabase Auth]
        SupabaseDB[(PostgreSQL Database)]
        SupabaseStorage[Storage Buckets]
        Supavisor[Connection Pooling]
    end
    
    %% Third-Party Services
    subgraph External Services
        Paystack[Paystack API]
        Resend[Resend Email]
        Maps[Google Maps API]
    end

    %% Flow
    Browser <-->|HTTPS| CDN
    CDN <--> NextApp
    NextApp <--> ServerActions
    
    ServerActions <-->|PostgREST API| Supavisor
    Supavisor <--> SupabaseDB
    ServerActions <--> SupabaseAuth
    ServerActions <--> SupabaseStorage
    
    ServerActions -.->|Webhooks/REST| Paystack
    ServerActions -.->|SMTP/API| Resend
    Browser -.->|Client-side| Maps