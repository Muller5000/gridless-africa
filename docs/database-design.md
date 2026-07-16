---
# COVER PAGE

**Document ID:** SHNG-DB-001
**Title:** Database Design
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal Database Architect
**Intended Audience:** Backend Engineers, Data Engineers, Security Architects, CTO

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal DB Architect | Initial Draft. Aligned with Technical Architecture v1.0 and PRD v1.0. |

## Related Documents & Dependencies
* **Project Constitution v1.0** (SH-NG-CONST-001)
* **Product Requirements Document (PRD) v1.0** (SH-NG-PRD-001)
* **Technical Architecture v1.0** (SHNG-ARCH-001)

## Approval Workflow
1.  **Draft Review:** Data Engineering & Backend Leads (Pending)
2.  **Security Review:** Security Architect (Pending)
3.  **Final Sign-off:** CTO (Pending)

---

## 1. Executive Summary
This document establishes the relational database blueprint for Gridless Africa. Built on PostgreSQL via Supabase, the schema is strictly normalized to ensure data integrity while providing the agility necessary for a fast-scaling startup. The design embraces Supabase’s Row-Level Security (RLS) to enforce strict access controls directly at the data layer, ensuring that escrow, KYC, and bidding data remain impenetrable to bad actors. It forms the foundation for the Phase 1 MVP lead-to-quote pipeline and prepares the architecture for future marketplace and IoT integrations.

## 2. Database Design Principles
*   **Normalization Strategy:** Target Third Normal Form (3NF) to eliminate data redundancy (e.g., separating `products` from `product_brands`).
*   **Denormalization:** Used selectively (e.g., storing a snapshot of `price` in `quote_line_items` to prevent historical quotes from changing if the catalog price updates).
*   **Data Integrity:** Enforced via strict Foreign Keys, Check Constraints (e.g., ensuring numeric values are positive), and Enum types.
*   **Scalability:** Designed with UUIDs for primary keys to support future database sharding or merging without key collisions.
*   **Security:** Zero Trust model. All tables in the `public` schema have RLS enabled.
*   **Auditability:** Immutable audit logging for financial and KYC state changes via PostgreSQL triggers.

## 3. Database Technology
**PostgreSQL 15+ (Managed by Supabase)**
*   **Advantages:** Instant Backend-as-a-Service integration, auto-generated PostgREST APIs, deep integration with `auth.users` for seamless RLS, and native JSONB support for unstructured AI or external integration data.
*   **Limitations:** Connection exhaustion can occur with high concurrency.
*   **Future Scaling:** Supavisor connection pooling (implemented in MVP) and read replicas (Phase 3).

## 4. Schema Organization
*   **`public`:** The primary schema holding core business logic tables (profiles, quotes, projects, catalog). Exposed securely via PostgREST.
*   **`auth`:** Managed entirely by Supabase. Stores authentication credentials and JWT metadata. Never directly modified by our application.
*   **`storage`:** Managed by Supabase. Holds object metadata for user uploads (KYC docs, profile pictures, installation photos).
*   **`audit`:** A restricted schema housing the `audit_logs` table. Only accessible by triggers and admin roles.
*   **`analytics`:** A future schema for materialized views and aggregated reporting data.

## 5. Naming Conventions
*   **Tables:** Plural, `lowercase_snake_case` (e.g., `profiles`, `quote_requests`).
*   **Columns:** Singular, `lowercase_snake_case` (e.g., `first_name`, `created_at`).
*   **Primary Keys:** Named `id` (Type: UUID, generated via `uuid_generate_v4()`).
*   **Foreign Keys:** `[singular_table_name]_id` (e.g., `installer_id`, `product_id`).
*   **Indexes:** `idx_[table]_[column]` (e.g., `idx_profiles_email`).
*   **Enums:** `[entity]_[attribute]_enum` (e.g., `quote_status_enum`).
*   **Triggers:** `trg_[action]_[table]` (e.g., `trg_audit_quotes_update`).

## 6. Entity Catalogue

### Users & Access
*   **Users (`auth.users`):** Supabase core auth table.
*   **Profiles:** Public demographic data linked 1:1 with `auth.users`.
*   **User Roles:** Maps profiles to system roles (Customer, Installer, Vendor, Admin) for JWT syncing and RLS.
*   **Installer Profiles:** Extends profiles with business data, KYC status, and ratings.
*   **Installer Companies:** Groups individual installers under a corporate entity.

### Catalog & Hardware
*   **Product Categories:** Taxonomy (e.g., "Inverters", "Lithium Batteries").
*   **Product Brands:** Manufacturers (e.g., "Sunsynk", "Felicity").
*   **Products:** Verified hardware items with specifications and MSRP.

### Marketplace (Lead-to-Quote)
*   **Quote Requests:** Customer inquiries generated from the Solar Calculator.
*   **Quotes:** Bids submitted by installers against requests.
*   **Quote Line Items:** Specific hardware and labor costs attached to a quote.

### Project Execution
*   **Projects:** Accepted quotes that have entered the execution phase.
*   **Installations:** Successfully completed and signed-off projects.
*   **Payments:** Escrow transaction logs linked to Paystack references.
*   **Reviews:** Customer feedback for completed installations.

### Platform Operations
*   **Notifications:** In-app alerts for users.
*   **Audit Logs:** Immutable JSONB records of row changes.
*   **KYC Documents:** References to Supabase Storage files for vetting.

*(Future Phase Entities: Maintenance Requests, Warranties, AI Conversations, Financing Requests)*

## 7. Entity Relationship Model

```mermaid
erDiagram
    %% Core Users
    AUTH_USERS ||--o| PROFILES : "creates (via trigger)"
    PROFILES ||--o{ USER_ROLES : "possesses"
    PROFILES ||--o| INSTALLER_PROFILES : "extends (if installer)"
    INSTALLER_PROFILES }|--o| INSTALLER_COMPANIES : "belongs to"

    %% Catalog
    PRODUCT_CATEGORIES ||--o{ PRODUCTS : "categorizes"
    PRODUCT_BRANDS ||--o{ PRODUCTS : "manufactures"

    %% Marketplace
    PROFILES ||--o{ QUOTE_REQUESTS : "submits"
    QUOTE_REQUESTS ||--o{ QUOTES : "receives"
    INSTALLER_PROFILES ||--o{ QUOTES : "submits bid"
    QUOTES ||--o{ QUOTE_LINE_ITEMS : "contains"
    PRODUCTS ||--o{ QUOTE_LINE_ITEMS : "referenced in"

    %% Execution
    QUOTES ||--o| PROJECTS : "converted to"
    PROJECTS ||--o{ PAYMENTS : "funded by"
    PROJECTS ||--o| INSTALLATIONS : "results in"
    INSTALLATIONS ||--o| REVIEWS : "evaluated by"