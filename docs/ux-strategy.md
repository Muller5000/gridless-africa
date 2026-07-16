---
# COVER PAGE

**Document ID:** SHNG-UX-001
**Title:** UX Strategy & Design Documentation
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal UX Designer / Human-Centered Design Team
**Intended Audience:** Product Designers, Frontend Engineers, Product Managers, Executive Stakeholders
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal UX Designer | Initial Baseline. Aligned with Constitution v1.0, PRD v1.0, and Strategy v1.1. |

## Related Documents & Dependencies
* **Project Constitution v1.0** (SH-NG-CONST-001)
* **Product Requirements Document v1.0** (SH-NG-PRD-001)
* **Technical Architecture v1.0** (SHNG-ARCH-001)

## Approval Workflow
1.  **Draft Review:** Frontend Lead & Head of Product (Pending)
2.  **Accessibility Audit:** Accessibility Specialist (Pending)
3.  **Final Sign-off:** Co-Founders (Pending)

---

## 1. Executive Summary
The UX Strategy for Gridless Africa is built to solve the highest barrier to renewable energy adoption in Nigeria: **Trust**. Moving away from fragmented social media interactions and opaque pricing, our user experience is designed to feel like a premium, secure, and highly transparent digital ecosystem. This document outlines how we will use progressive disclosure, trust signals, and human-centered design to guide users from initial curiosity (Solar Savings Calculator) to confident investment (Escrow & Quote Acceptance).

## 2. UX Vision
To transform the high-anxiety, complex process of purchasing solar infrastructure into a frictionless, transparent, and aesthetically premium journey that empowers Nigerians to achieve energy independence with absolute confidence.

## 3. Design Principles
*   **Clarity over Cleverness:** Complex solar metrics (kVa, kWh, DoD) must be translated into human benefits (e.g., "Hours of AC backup").
*   **Progressive Disclosure:** Do not overwhelm the user. Ask for information only when it is needed to move to the next step.
*   **Trust as a Visual Language:** Utilize clean whitespace, rigorous typography, verified badges, and transparent pricing breakdowns.
*   **Optimized for the Environment:** Design for bright sunlight (high contrast) and intermittent data connections (optimistic UI).

## 4. Accessibility Strategy
*   **WCAG 2.1 AA Compliance:** Minimum standard for all text, colors, and interactions.
*   **Color Contrast:** Text and interactive elements must maintain a minimum contrast ratio of 4.5:1.
*   **Typography:** Minimum readable font size of 16px for body copy.
*   **Screen Readers:** All images, icons, and state changes must utilize semantic HTML and ARIA labels.
*   **Keyboard Navigation:** Fully navigable without a mouse (critical for B2B/Admin desktop users).

## 5. Mobile-First Strategy
*   **Primary Viewport:** 85%+ of Nigerian consumers will access the platform via mobile. The PWA is designed for 375px - 430px screens first.
*   **Touch Targets:** Minimum 44x44px for all buttons and tappable areas to prevent misclicks.
*   **Bottom-Heavy Navigation:** Core actions (Next, Quote, Confirm) anchored to the bottom of the screen for thumb reachability.
*   **Gestures:** Swipe-to-dismiss for notifications and horizontal scrolling for comparison cards.

## 6. Responsive Strategy
*   **Fluid Layouts:** Grids that gracefully reflow from 1-column (mobile) to 2-column (tablet) to 3/4-column (desktop).
*   **Admin & Installer Portals:** While mobile-friendly, dashboards containing complex tabular data (quote management, analytics) will be optimized for desktop/tablet breakpoints.

## 7. Trust-Building Strategy
*   **Vetting Badges:** Prominent "Gridless Verified" ticks next to installer names and OEM hardware.
*   **Escrow Guarantee:** Visual shields and tooltip explanations of how funds are held securely until project sign-off.
*   **Transparency:** Quotes must clearly separate Hardware costs, Labor/Installation costs, and Gridless Africa platform fees (if applicable).
*   **Social Proof:** Authentic, uneditable customer reviews displaying photos of completed installations.

## 8. Navigation Principles
*   **Flat Hierarchy:** Users should never be more than three taps away from their active project or the calculator.
*   **Contextual Menus:** Use a bottom tab bar for mobile consumers and a persistent left-hand sidebar for B2B users (Installers/Admins).
*   **Breadcrumbs:** Essential for deep hardware marketplace browsing and nested admin settings.

## 9. Information Density Strategy
*   **Consumer Portal:** Low density. High use of whitespace, large typography, and iconography to reduce cognitive load.
*   **Installer Portal:** Medium density. Focus on pipeline management and actionable tasks (leads awaiting quotes).
*   **Admin Portal:** High density. Data-rich tables, dense analytics, and dense logs for operational efficiency.

## 10. Error Prevention Strategy
*   **Smart Defaults:** Pre-fill the Solar Calculator with common Nigerian household appliances based on selected property type.
*   **Inline Validation:** Validate forms (e.g., email, phone number formats) instantly on `blur`, rather than waiting for `submit`.
*   **Destructive Actions:** Require a confirmation modal or typed confirmation (e.g., "Type DELETE") for irreversible actions like canceling an accepted quote.

## 11. Feedback Strategy
*   **Micro-interactions:** Haptic feedback (on supported devices) and subtle color shifts when buttons are pressed.
*   **Toast Notifications:** Non-intrusive alerts for transient successes (e.g., "Profile updated").
*   **Persistent Banners:** For critical system states (e.g., "Your KYC is under review").

## 12. Loading Experience
*   **Skeleton Screens:** Used instead of generic spinners for complex pages (dashboards, quote comparisons) to reduce perceived load time.
*   **Progressive Loading:** Load text and structure first, deferring heavy images (product catalog) and map elements.
*   **Branded Spinners:** For quick, blocking actions (e.g., verifying payment), use a custom animated Gridless Africa logo.

## 13. Empty States
*   **Never a Dead End:** Empty states must explain *why* it is empty and provide a clear Call to Action (CTA).
    *   *Example:* (Empty Quotes) "You haven't requested any quotes yet. Run the Solar Savings Calculator to get started." + [Button: Open Calculator].

## 14. Success States
*   **Celebratory & Assuring:** Large green indicators, clear next steps.
    *   *Example:* Upon Escrow funding, show a "Funds Secured" shield and an illustration outlining the next step: "The installer has been notified to begin procurement."

## 15. Error States
*   **Human & Actionable:** Avoid technical jargon. Do not say "500 Internal Server Error." Say, "We're having trouble connecting to the marketplace. Please try again."
*   **Preserve Data:** If a form submission fails due to a network error, preserve the user's input so they don't have to start over.

## 16. Onboarding Strategy
*   **Triage-Based Onboarding:** Users are triaged immediately via the Solar Calculator. The final step of the calculator requires an account creation to view the detailed quote. This ensures high-intent signups.
*   **Installer Onboarding:** A clear, step-by-step wizard (1. Basic Info -> 2. Business Reg (CAC) -> 3. Certifications -> 4. Portfolio). Includes a progress bar.

## 17. Customer Journey
1.  **Awareness:** Lands on Solar Savings Calculator via SEO.
2.  **Discovery:** Inputs appliances, sees immediate potential savings, creates an account to save results.
3.  **Action:** Submits lead request. Receives push/email notification when bids arrive.
4.  **Decision:** Compares up to 3 quotes side-by-side. Selects best fit.
5.  **Commitment:** Funds Escrow. Tracks installation milestones.
6.  **Advocacy:** Leaves review, views Solar Health Score, books future maintenance.

## 18. Installer Journey
1.  **Acquisition:** Signs up, completes rigorous KYC wizard.
2.  **Waiting:** Dashboard clearly indicates "Pending Admin Verification."
3.  **Lead Reception:** Receives notification of a budget-matched lead.
4.  **Bidding:** Uses structured quoting tool to submit bid quickly.
5.  **Execution:** Moves project cards across a Kanban-style pipeline (Quoted -> Accepted -> In Progress -> Completed).

## 19. Admin Journey
*   **Command Center:** Dashboard prioritizing immediate operational bottlenecks (e.g., KYC applications pending > 24 hours, active disputes, failed webhook payments).
*   **God-Mode View:** Ability to seamlessly view the platform from the perspective of a specific user to troubleshoot issues.

## 20. Quote Comparison Experience
*   **The "Apple vs. Apple" UX:** (Per PRD, max 3 quotes). Presented in a horizontal scrolling matrix on mobile, or side-by-side columns on desktop.
*   **Standardized Rows:** Total Cost, Hardware Brand (Panels), Hardware Brand (Battery), Warranty Length, Labor Cost, Installer Rating.
*   **Highlighting:** The system subtly highlights the "Best Value" and "Highest Rated" options to reduce decision fatigue.

## 21. Solar Savings Calculator Experience
*   **Conversational UI:** One question per screen on mobile (Typeform style) to maintain momentum.
*   **Visual Inputs:** Icon-based selection for appliances (AC unit icon, TV icon, Fridge icon) with +/- counters.
*   **The "Aha!" Moment:** The final results page uses large typography for "Estimated Monthly Savings" and "Payback Period," transforming a heavy CapEx into a logical ROI investment.

## 22. Marketplace Browsing Experience (Phase 2 Foundation)
*   **Card-Based UI:** High-quality imagery of inverters and batteries.
*   **Spec Sheets:** Complex specs (voltage, discharge rates) hidden behind an "Advanced Specs" accordion.
*   **Actionable:** "Add to Project" button allowing users to lock in specific hardware before requesting installer bids.

## 23. Maintenance Booking Experience (Phase 2 Foundation)
*   **Calendar Integration:** Simple date/time picker for scheduling panel cleaning or battery checks.
*   **One-Click Rebook:** Quick action buttons on the user dashboard when the system predicts maintenance is due based on installation date.

## 24. AI Assistant Experience (Future Phase 2)
*   **Floating FAB:** A persistent, non-intrusive floating action button.
*   **Context-Aware:** If opened on the Quote Comparison page, the AI pre-fills suggested prompts like, "Explain the difference between these two batteries."

## 25. Future Binance Wallet Experience (Phase 3)
*   **Web3 Connect:** A standard "Connect Wallet" button replacing email/password for crypto-native users.
*   **Token Visualization:** Gamified display of loyalty tokens or carbon offset credits earned via solar generation.

## 26. Trust Signals Throughout the Platform
*   **Lock Icons:** Placed near all payment and data-entry fields.
*   **Tooltip Explanations:** Dotted underlines on complex terms (e.g., *Pure Sine Wave*) that reveal plain-English definitions on tap/hover.
*   **Consistent Branding:** Deep, reliable colors (e.g., Navy Blue, Forest Green) to psychologically reinforce stability and finance.

## 27. Notification Strategy
*   **Batched Notifications:** Avoid spamming. If an installer updates 3 milestones in 5 minutes, send 1 consolidated notification to the customer.
*   **Urgency Routing:** 
    *   *Email:* Receipts, formal quote PDFs.
    *   *In-App:* Milestone updates, review requests.
    *   *SMS:* Critical actions only (e.g., "Your Escrow payment was successful," "Installer is en route").

## 28. Content Strategy
*   **Tone of Voice:** Authoritative but empathetic. Professional, clear, and reassuring.
*   **Jargon Reduction:** Say "Battery Backup Time" instead of "Depth of Discharge Limits" on consumer-facing screens.

## 29. Search Strategy
*   **Predictive Search:** In the equipment catalog, auto-suggest brands and categories as the user types.
*   **Tolerance:** Typo-tolerant search (e.g., searching "batery" returns "Battery").

## 30. Filtering Strategy
*   **Drawer Filters:** On mobile, filters (Price, Brand, Capacity) open in a bottom drawer to save screen real estate.
*   **Pill Tags:** Display active filters as removable "pills" at the top of the results list.

## 31. Performance Perception Strategy
*   **Optimistic UI:** When a user "Accepts" a quote, immediately transition the UI to the "Accepted" state while the server processes the request in the background.

## 32. Retention Strategy
*   **The Solar Health Score:** A dynamic gauge on the user's dashboard. Stays in the "Green" through regular maintenance (booked via the platform), encouraging users to return long after installation.
*   **Post-Install Dashboard:** Transforms from a procurement tool into a monitoring and asset-management tool.

## 33. Gamification Opportunities
*   **Carbon Offset Badges:** "You've saved 50 trees this year!" highly shareable graphics for social media.
*   **Installer Leaderboards:** B2B gamification. Highlighting "Top Rated Installers of the Month" to encourage exceptional service quality.

## 34. Accessibility Checklist
- [ ] Contrast ratios meet WCAG AA (4.5:1).
- [ ] All forms have visible `<label>` elements.
- [ ] Touch targets are at least 44x44 CSS pixels.
- [ ] Focus states are highly visible for keyboard navigation.
- [ ] Screen reader testing passed on core flows (Calculator, Checkout).

## 35. UX Risks & Mitigation
*   **Risk:** Users abandon the Calculator due to the number of questions.
    *   **Mitigation:** Group questions logically and include a prominent progress bar. Allow skipping of non-essential inputs (like specific lightbulb counts).
*   **Risk:** Choice paralysis during Quote Comparison.
    *   **Mitigation:** Enforce the strict 3-bid limit (per PRD) and visually highlight the "Lowest Price" and "Highest Rated" options.
*   **Risk:** Mistrust of the digital Escrow process in a low-trust economy.
    *   **Mitigation:** Include explicit logos of partnered financial institutions (Paystack, CBN regulations) directly on the payment screen.

## 36. UX Recommendations (ADRs for UX)
*   *None at this time. The strategy adheres tightly to the approved PRD and Constitution.*

---
**Review & Approval Checklist**
- [ ] Strategy aligns with the "Mobile-First" Constitution mandate.
- [ ] Progressive disclosure principles are applied to the Calculator.
- [ ] Quote comparison strictly adheres to the 3-bid maximum rule.
- [ ] Trust signals are integrated into the core user journeys.

*Document Footer: Gridless Africa - UX Strategy v1.0*