---
# COVER PAGE

**Document ID:** SHNG-API-001
**Title:** API Specification
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal API Architect
**Intended Audience:** Backend Engineers, Frontend Engineers, QA Engineers, Security Architects
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal API Architect | Initial Draft. Aligned with Technical Architecture v1.0 and Database Design v1.0. |

## Related Documents & Dependencies
* **Project Constitution v1.0** (SH-NG-CONST-001)
* **Product Requirements Document (PRD) v1.0** (SH-NG-PRD-001)
* **Technical Architecture v1.0** (SHNG-ARCH-001)
* **Database Design v1.0** (SHNG-DB-001)

## Approval Workflow
1.  **Draft Review:** Lead Backend & Frontend Engineers (Pending)
2.  **Security Review:** Security Architect (Pending)
3.  **Final Sign-off:** CTO (Pending)

---

## 1. Executive Summary
This document establishes the API contract for Gridless Africa. It defines the RESTful interfaces that power the platform's core functionalities, including the Solar Savings Calculator, quote generation, marketplace matching, and payment orchestration. Adhering to the "API-First" mandate established in the Project Constitution, these endpoints are designed to be consumed by our Next.js frontend and establish a robust foundation for future B2B integrations, IoT telemetry, and native mobile applications.

## 2. API Design Principles
* **RESTful Architecture:** Strict adherence to standard HTTP methods (GET, POST, PUT, PATCH, DELETE) and resource-oriented URIs.
* **Stateless Communication:** No session state is stored on the API servers. All requests must contain complete authentication context (JWT).
* **Consistent Naming:** `lowercase-kebab-case` for endpoint URLs. `camelCase` for JSON request/response payloads.
* **Idempotency:** All `PUT`, `PATCH`, and `DELETE` requests must be idempotent to handle network retries safely.
* **Backward Compatibility:** Additive changes only. Destructive changes require a major version increment.
* **Error Consistency:** Every error across the entire API utilizes the exact same JSON schema.

## 3. Authentication & Authorization
* **Mechanism:** Handled via Supabase Auth. The API expects a Bearer Token (JWT) in the `Authorization` header.
* **Session Handling:** Short-lived access tokens (1 hour) with long-lived refresh tokens (handled securely via HTTP-only cookies).
* **Role-Based Access Control (RBAC):** Roles (`customer`, `installer`, `admin`) are embedded in the JWT custom claims and validated by middleware before reaching business logic.
* **Future Web3 Auth (Phase 3):** Will introduce `/api/v1/auth/web3` endpoints to issue standard JWTs based on cryptographic wallet signatures (EIP-4361).

## 4. API Versioning
* **Strategy:** URI Versioning. All endpoints are prefixed with `/api/v1/`.
* **Deprecation Policy:** Deprecated endpoints will return a `Warning` HTTP header 6 months prior to removal.
* **Backward Compatibility:** Adding new JSON properties to responses or optional parameters to requests does not require a version bump.

## 5. Global Request & Response Standards

**Content-Type:** `application/json` (except for `/api/v1/uploads` which uses `multipart/form-data`).

**Standard Success Response (2xx):**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "pagination": {
      "total": 150,
      "limit": 20,
      "cursor": "uuid-string-here",
      "hasNextPage": true
    }
  }
}
```

**Standard Error Response (4xx, 5xx):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters.",
    "details": [
      { "field": "budget_tier", "message": "Must be a valid tier." }
    ]
  }
}
```

**Standard Query Parameters (Collections):**
* `limit` (default 20, max 100)
* `cursor` (for infinite scrolling)
* `page` / `offset` (for admin dashboards)
* `sort_by` / `sort_order`
* `search` (Trigram text search)

## 6. Endpoint Catalogue

| Resource Group | Method | Endpoint | Purpose | Auth / Role |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/v1/auth/register` | Register new user | Public |
| **Auth** | POST | `/api/v1/auth/login` | Authenticate user | Public |
| **Users** | GET | `/api/v1/users/me` | Fetch current profile | Authenticated |
| **Calculator** | POST | `/api/v1/calculator/calculate` | Process solar sizing & ROI | Public |
| **Installers** | GET | `/api/v1/installers` | List verified installers | Public |
| **Installers** | POST | `/api/v1/installers/kyc` | Submit KYC documents | Installer |
| **Products** | GET | `/api/v1/products` | Browse hardware catalog | Public |
| **Quote Requests**| POST | `/api/v1/quote-requests` | Submit matched lead request| Customer |
| **Quote Requests**| GET | `/api/v1/quote-requests` | View available leads | Installer |
| **Quotes** | POST | `/api/v1/quotes` | Submit a bid for a lead | Installer |
| **Quotes** | PATCH | `/api/v1/quotes/{id}/accept` | Customer accepts a bid | Customer |
| **Projects** | GET | `/api/v1/projects/{id}` | View installation tracker | Customer, Installer |
| **Payments** | POST | `/api/v1/payments/initialize`| Generate Paystack checkout | Customer |
| **Webhooks** | POST | `/api/v1/webhooks/paystack` | Payment success callback | Public (Sig Check)|
| **Reviews** | POST | `/api/v1/reviews` | Review a completed project | Customer |
| **Admin** | PATCH | `/api/v1/admin/kyc/{id}` | Approve/Reject Installer | Admin |

## 7. Detailed Endpoint Specifications (Core Examples)

### 7.1. Solar Savings Calculator Engine
**Endpoint:** `POST /api/v1/calculator/calculate`
* **Description:** The primary acquisition engine. Calculates system size and ROI.
* **Auth Required:** No.
* **Request Body Schema:**
    * `appliances` (Array of Objects): `[{ "type": "AC", "quantity": 2, "hours": 8 }]`
    * `monthlyGridBill` (Number)
    * `weeklyFuelSpend` (Number)
    * `state` (String)
* **Response Schema (`data`):**
    * `recommendedKva` (Number)
    * `batteryCapacityKwh` (Number)
    * `estimatedCostRange` (Object): `{ "min": 2500000, "max": 3500000 }`
    * `paybackPeriodMonths` (Number)
* **Validation Rules:** Fuel spend and grid bill cannot be negative.

### 7.2. Submit Quote Request (Lead Generation)
**Endpoint:** `POST /api/v1/quote-requests`
* **Description:** Converts a calculator output into a live lead in the marketplace.
* **Auth Required:** Yes (Customer).
* **Request Body:**
    * `calculatorResultId` (UUID, optional)
    * `budgetTier` (Enum: `T1`, `T2`, `T3`)
    * `addressDetails` (Object)
* **Business Rules:** Triggers background matching algorithm to notify relevant verified installers in the geographic zone.

### 7.3. Submit Installer Bid
**Endpoint:** `POST /api/v1/quotes`
* **Description:** Installer submits a standardized quote against a lead request.
* **Auth Required:** Yes (Installer).
* **Request Body:**
    * `quoteRequestId` (UUID)
    * `laborCost` (Number)
    * `warrantyDurationMonths` (Integer)
    * `lineItems` (Array): `[{ "productId": UUID, "quantity": Number }]`
* **Validation Rules:** Installer must have `KYC_VERIFIED` status. Max 3 quotes per request.
* **Error Scenarios:** `403 Forbidden` if KYC is pending. `409 Conflict` if the 3-bid limit is already reached.

## 8. Error Handling Strategy
* **400 Bad Request:** Payload validation failures (Zod schema mismatches).
* **401 Unauthorized:** Missing, expired, or invalid JWT.
* **403 Forbidden:** Valid JWT, but lacking role permissions.
* **404 Not Found:** Resource UUID does not exist or RLS hides it from the user.
* **409 Conflict:** State transition violations (e.g., trying to accept an already expired quote).
* **429 Too Many Requests:** Rate limit exceeded.
* **500 Internal Server Error:** Uncaught backend exceptions. Stack traces are strictly stripped in production.

## 9. Rate Limiting
Enforced via Vercel Edge Middleware / Upstash.
* **Authentication:** 5 requests per 15 minutes per IP.
* **Calculator Usage:** 20 requests per hour per IP.
* **Quote Requests:** 5 per day per Customer.
* **File Uploads (KYC):** 5 requests per hour per user.
* **Standard API Routes:** 100 requests per minute per IP.

## 10. Security Requirements
* **HTTPS Only:** Strict Transport Security (HSTS) enforced.
* **Input Sanitization:** All request bodies validated strictly against Zod schemas.
* **File Uploads:** Must validate MIME types (PDF, JPG, PNG) and enforce a 5MB size limit before passing to Supabase Storage.
* **Audit Logging:** Admin state changes (KYC approvals) must be logged asynchronously.

## 11. Third-Party Integrations
* **Google Maps API:** Backend proxy endpoints (`/api/v1/geo/autocomplete`) to securely fetch location data without exposing the Maps API key to the client.
* **Paystack:** API interactions for `transaction/initialize` and webhook parsing.
* **Resend:** Orchestrated via background events to prevent blocking the main request-response cycle for transactional emails.

## 12. Webhooks
**Strategy (Paystack Example):**
* **Endpoint:** `POST /api/v1/webhooks/paystack`
* **Validation:** Payload signature validated using `crypto` and `PAYSTACK_SECRET_KEY`.
* **Action:** Look up transaction by `reference`, update DB payment status to `HELD_IN_ESCROW`, update project to `IN_PROGRESS`.
* **Response:** Return `200 OK` immediately upon saving to prevent provider timeouts.

## 13. API Performance
* **Caching:** Read-heavy endpoints (e.g., `/api/v1/products`) utilize Next.js Server Cache (stale-while-revalidate).
* **Pagination:** Cursor-based pagination used for feeds to ensure fast query times on large datasets.
* **Timeouts:** All external API calls (e.g., to Paystack) have a strict 5000ms timeout with 1 retry attempt.

## 14. Monitoring & Observability
* **Logging:** API errors logged with context (UserId, RequestId, Endpoint) to Vercel Axiom or Sentry.
* **Request Tracing:** `x-request-id` header passed through the stack.
* **Health Endpoints:** `GET /api/v1/health` returning DB connection status.

## 15. API Risks & Mitigation
* **Risk:** Paystack webhook delivery failure or timeout.
    * **Mitigation:** Implement a fallback cron job that polls Paystack every 30 minutes for pending transaction statuses.
* **Risk:** Scraping of the product catalog.
    * **Mitigation:** Aggressive rate limiting on unauthenticated catalog endpoints.

## 16. Future API Evolution
* **AI Services:** `/api/v1/ai/consult` will stream Server-Sent Events (SSE) connected to Google Gemini to provide a real-time chatbot experience.
* **Financing:** `/api/v1/financing/apply` will act as a secure proxy, mapping our standardized user payload to external Nigerian banking APIs.

## 17. API Design Recommendations (ADRs)

### ADR 004: Standardizing on REST over GraphQL for Phase 1
* **Context:** Supabase provides an auto-generated GraphQL endpoint alongside its REST API. 
* **Decision:** We will strictly enforce Next.js REST API routes acting as a proxy to the database, rather than exposing GraphQL directly to the client.
* **Justification:** REST provides much stricter control over rate-limiting, edge-caching (via Vercel), and simplifies the creation of deterministic SDKs for future B2B partners. It also ensures complex business logic is handled in Next.js rather than relying purely on Postgres RLS.

---
**Approval Checklist**
- [ ] Endpoints align with PRD v1.0 User Stories.
- [ ] RBAC permissions accurately reflect the Constitution's Zero Trust policy.
- [ ] Error formats are unified and documented.
- [ ] Webhook security (signature verification) is explicitly defined.

*Document Footer: Gridless Africa - API Specification v1.0*