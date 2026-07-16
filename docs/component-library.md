---
# COVER PAGE

**Document ID:** SHNG-CL-001
**Title:** Component Library Specification
**Project Name:** Gridless Africa (formerly SolarHub NG)
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal Design Systems Engineer / Frontend Architecture Team
**Intended Audience:** Frontend Engineers, Product Designers, QA Engineers, AI-Assisted Dev Agents
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal Design Systems Engineer | Initial Baseline. Aligned with Design System v1.0 and UX Strategy v1.0. |

## Related Documents & Dependencies
* **SHNG-CON-001** Project Constitution v1.0
* **SHNG-PRD-001** Product Requirements Document v1.0
* **SHNG-ARCH-001** Technical Architecture v1.0
* **SHNG-UX-001** UX Strategy v1.0
* **SHNG-DS-001** Design System v1.0

## Approval Workflow
1.  **Draft Review:** Lead UI Designer & Frontend Lead (Pending)
2.  **Accessibility Audit:** Accessibility Specialist (Pending)
3.  **Final Sign-off:** CTO / Co-Founders (Pending)

---

## 1. Executive Summary
The Component Library Specification (SHNG-CL-001) serves as the definitive translation of the Gridless Africa Design System into constructible, reusable UI building blocks. This document outlines the expected behavior, states, accessibility standards, and composition rules for every component. By strictly adhering to this specification, our engineering teams and AI-assisted development pipelines will achieve total consistency, maintainability, and rapid time-to-market without sacrificing accessibility or performance.

---

## 2. Component Design Principles
*   **Reusability:** Build components to be context-agnostic. A `Card` component should function equally well in the Marketplace as it does in the Admin dashboard.
*   **Composability:** Construct complex interfaces by assembling smaller, independent primitive components (e.g., a `QuoteCard` is composed of `Badge`, `Typography`, `Button`, and `Icon` primitives).
*   **Consistency:** Strict adherence to design tokens (spacing, typography, color) established in SHNG-DS-001. No hardcoded values.
*   **Accessibility:** Every component must natively support WCAG 2.2 AA standards out-of-the-box (keyboard navigation, ARIA roles, contrast).
*   **Responsiveness:** Components must handle layout reflows intrinsically (e.g., stacking horizontally on desktop, vertically on mobile).
*   **Performance:** Components must minimize DOM depth and avoid unnecessary re-renders. 
*   **Predictability:** Interaction patterns must feel familiar. A primary button behaves exactly the same everywhere.
*   **Simplicity:** Avoid "prop drilling" and component bloat. If a component requires 20+ props, it should be broken down into smaller composable parts.

---

## 3. Component Classification

### Foundations
*   **Colours, Typography, Icons, Spacing, Elevation, Motion** (Mapped to CSS variables/Tailwind configuration).

### Inputs
*   **Text Input:** Standard single-line text capture.
*   **Number Input:** Numeric capture with +/- steppers.
*   **Textarea:** Multi-line text capture (auto-expanding).
*   **Select:** Native/Custom dropdowns for single options.
*   **Multi-select:** Dropdowns supporting multiple checkbox selections.
*   **Checkbox:** Boolean selection (independent).
*   **Radio Button:** Mutually exclusive selection group.
*   **Toggle Switch:** Instant boolean state activation (e.g., Notifications).
*   **Date Picker:** Calendar selection (optimized for mobile touch).
*   **Search Box:** Input with leading search icon and trailing clear button.
*   **File Upload:** Drag-and-drop zone with visual upload progress for KYC/Docs.

### Buttons
*   **Primary:** Main call to action (Solid background).
*   **Secondary:** Alternative action (Outlined or tinted background).
*   **Tertiary:** Low-emphasis action (Ghost/Text only).
*   **Destructive:** High-risk actions (Red background/text).
*   **Icon Button:** Button containing only an icon (requires `aria-label`).
*   **Floating Action Button (FAB):** Persistent contextual action (e.g., AI Chat).

### Navigation
*   **Navbar:** Top application header.
*   **Sidebar:** Desktop vertical navigation.
*   **Breadcrumb:** Trail indicating nested page location.
*   **Tabs:** Horizontal context switching within a page.
*   **Pagination:** Multi-page list navigation.
*   **Stepper:** Wizard progression tracker (e.g., Solar Calculator).
*   **Menu:** Dropdown contextual action lists.
*   **Mobile Navigation Drawer:** Slide-out hamburger menu / Bottom tab bar.

### Data Display
*   **Card:** Standard surface for content grouping.
*   **Product Card:** Specialized card for Marketplace items (Image, Specs, Price).
*   **Installer Card:** Specialized card for directory (Avatar, Rating, Region).
*   **Quote Card:** Specialized card for 3-bid comparison (Breakdown, Warranty).
*   **Table:** High-density data grid (horizontal scrolling on mobile).
*   **List:** Vertical stacked data items.
*   **Badge:** Small status indicator (e.g., "Verified").
*   **Tag:** Filterable attribute indicator.
*   **Tooltip:** Hover/Focus contextual hint.
*   **Avatar:** User/Installer profile image placeholder.
*   **Timeline:** Vertical tracking of active projects/milestones.
*   **Progress Bar:** Linear completion tracking.
*   **Stat Card:** Dashboard KPI visualizer.

### Feedback
*   **Alert:** Page-level static warning/info banner.
*   **Toast:** Transient, auto-dismissing screen-edge notification.
*   **Modal:** Focus-trapping overlay for critical tasks.
*   **Confirmation Dialog:** Strict Yes/No interrupt modal.
*   **Loading Spinner:** Circular progress indicator (branded).
*   **Skeleton Loader:** Pulsing wireframe block indicating incoming data.
*   **Empty State:** Illustrated block when no data exists.
*   **Error State:** Inline or block-level failure notice with retry CTA.
*   **Success Banner:** High-visibility completion acknowledgement.

### Marketplace Components
*   **Quote Comparison Table:** Standardized matrix mapping 3 installer bids.
*   **Installer Rating Widget:** Interactive 5-star aggregate view.
*   **Product Specification Panel:** Accordion for deep-dive hardware data.
*   **Solar Savings Summary:** The core ROI visualization output.
*   **Financing Offer Card (Future):** Bank-partner loan terms display.
*   **Maintenance Schedule Card:** Next-service countdown block.

### Dashboard Components
*   **KPI Cards:** High-level metrics (e.g., "Total Earned", "Health Score").
*   **Charts:** Bar/Line graphs for energy output or earnings.
*   **Activity Feed:** Chronological list of system events.
*   **Calendar Widget:** Visual scheduling tool for Installers.
*   **Notifications Panel:** Dropdown list of unread alerts.
*   **Recent Activity List:** Truncated summary of recent table rows.

---

## 4. Component Specification Template
*All components in the library must be documented using the following strict schema prior to development.*

**Example Specification: `PrimaryButton`**

*   **Purpose:** To trigger the single most important action on a screen or within a context.
*   **Description:** A highly visible, solid-fill interactive element.
*   **Variants:** `default` (Navy Blue), `destructive` (Crimson Red).
*   **Sizes:** `sm` (32px height), `md` (44px height - default), `lg` (56px height).
*   **States:**
    *   *Default:* Solid fill (`Brand Primary`). Text is White.
    *   *Hover:* 10% darker fill. Cursor changes to pointer.
    *   *Focus:* 2px offset outline matching fill color.
    *   *Active (Pressed):* 95% scale reduction, 20% darker fill.
    *   *Disabled:* 50% opacity, greyed out, pointer-events none.
    *   *Loading:* Text replaced/shifted by branded loading spinner. Pointer-events none.
*   **Behaviour:** Triggers an event, form submission, or navigation.
*   **Accessibility Requirements:** Must use native `<button>` or `<a href>` tags. Minimum contrast ratio of 4.5:1. 
*   **Keyboard Interactions:** Must trigger on `Enter` and `Space` keys.
*   **Responsive Behaviour:** On mobile, often spans 100% of container width (w-full). On desktop, hugs content or has fixed minimum width (e.g., 120px).
*   **Composition Rules:** Can contain a leading or trailing `Icon` component. Never contains multiple icons.
*   **Usage Guidelines:** Limit to one `PrimaryButton` per viewport/form to avoid decision paralysis.
*   **Anti-patterns:** Do not use for secondary actions like "Cancel". Do not truncate text (wrap or ensure short copy).

---

## 5. Forms & Validation Components
Forms are critical conversion bottlenecks. Standardization is mandatory.
*   **Structure:** Every input must be wrapped in a `FormControl` component that handles the Label, Input, and Helper/Error Text alignment.
*   **Validation Patterns:** Validation occurs on `blur` (when the user leaves the field). Real-time formatting (e.g., adding spaces to phone numbers) occurs on `change`.
*   **Inline Errors:** Error messages must be displayed directly below the input in `Semantic Error` color, accompanied by an alert icon. The input border must also turn red.
*   **Helper Text:** Displayed below the input in `Neutral Gray`. Transitions out if an Error state is triggered.
*   **Success Feedback:** A green checkmark icon inside the trailing edge of the input field to reinforce valid formatting (critical for Escrow details).

---

## 6. Accessibility Requirements
Every interactive component is bound by these baseline rules:
*   **Keyboard Support:** All interactions must be achievable without a mouse.
*   **Focus Management:** Modals, Dialogs, and Drawers must "trap" focus while open, preventing the user from tabbing into hidden background elements. Focus must return to the trigger element when closed.
*   **Screen Reader Behaviour:** Dynamic UI updates (e.g., Toast notifications, Calculator total updates) must be wrapped in `aria-live="polite"` regions.
*   **ARIA Guidance:** Use `aria-expanded` on accordions, `aria-invalid` on errored form fields, and `aria-hidden` on decorative SVGs.
*   **Touch Target Recommendations:** Absolute minimum of 44x44 CSS pixels for all interactive targets.
*   **Colour Contrast:** 4.5:1 for normal text (14px-16px). 3:1 for large text (18px+) or UI boundaries (input borders).

---

## 7. Responsive Behaviour
*   **Mobile (375px+):** Components prioritize vertical stacking. Tables convert to "Card Lists". Global navigation collapses into a Bottom Tab Bar or Hamburger Drawer. Touch targets expand to 100% width where applicable.
*   **Tablet (768px+):** Grids expand to 2-columns. Sidebar navigation becomes visible (collapsed state). Forms split into multi-column layouts.
*   **Desktop (1024px+):** Components utilize maximum horizontal real estate (capped at 1200px max-width). Persistent full-width sidebar. Hover states become primary interaction cues.

---

## 8. Component Composition
Components are engineered to snap together cleanly.

*   **Product Listing Page Composition:**
    *   `PageLayout` > `Sidebar` (Filters) + `Grid` (Content).
    *   `Grid` > Multiple `ProductCard` components.
    *   `ProductCard` > `Image`, `Typography` (Title), `Badge` (Stock status), `Typography` (Price), `SecondaryButton` (View Details).
*   **Quote Comparison Page Composition:**
    *   `PageLayout` > `Typography` (Header).
    *   `HorizontalScrollContainer` > 3x `QuoteCard` components.
    *   `QuoteCard` > `InstallerAvatar`, `RatingWidget`, `Table` (Specs), `PrimaryButton` (Accept Quote).

---

## 9. Design Consistency Rules
*   **Spacing:** Margins and padding must strictly use multipliers of 8px (`spacing-2` = 8px, `spacing-4` = 16px).
*   **Alignment:** Text is left-aligned by default. Numeric data in tables (prices, kVa) must be right-aligned for easy scanning.
*   **Icon Usage:** Only use icons from the approved vector library (2px stroke, unfilled). Do not mix stroke and solid icon styles.
*   **Interaction:** All buttons and interactive cards must implement standard hover, focus, and active state styles as defined in the global tokens.

---

## 10. Performance Considerations
*   **Lazy Loading:** Heavy UI components (e.g., Interactive Charts, Maps, Modal contents) must be dynamically imported and lazy-loaded.
*   **Virtualisation:** `Table` and `List` components displaying more than 50 items (e.g., Admin User Logs) must utilize DOM virtualization (rendering only what is in the viewport).
*   **Image Optimisation:** `Avatar`, `ProductCard`, and `Hero` images must use the Next.js `<Image>` component for auto-webp conversion and layout shift prevention.
*   **Efficient Rendering:** Memoize complex interactive components (e.g., the Solar Calculator form steps) to prevent entire page re-renders on every keystroke.

---

## 11. Future Components (Reserved Architecture)
The library structure reserves namespaces for upcoming roadmap features:
*   **AI Energy Assistant Panel:** `AIChatWidget`, `AIPromptInput`, `AIMessageBubble`.
*   **Binance Wallet Connect Widget:** `Web3AuthButton`, `CryptoBalanceBadge`.
*   **Financing Application Wizard:** `LoanTermsCard`, `BankPartnerSelect`, `AmortizationChart`.
*   **IoT Device Status Card:** `TelemetryGauge`, `InverterStatusIndicator`.
*   **Energy Consumption Dashboard:** `RealTimePowerGraph`, `CarbonOffsetStat`.

---

## 12. Component Governance
*   **Proposal:** Any engineer or designer can propose a new component if an existing one cannot solve the UX requirement.
*   **Review:** The component must be reviewed by Design (for visual/UX adherence) and Frontend Architecture (for prop structure and a11y).
*   **Approval:** Once approved, it is added to the component library repository.
*   **Versioning:** Breaking changes to component props require a major version bump of the internal library and a documented migration path.
*   **Deprecation:** Deprecated components will log console warnings in development environments for 3 months before removal.

---

## 13. Component Library Risks & Mitigation

| Risk | Description | Mitigation Strategy |
| :--- | :--- | :--- |
| **Divergence** | Developers manually overriding CSS styles rather than using component props, leading to UI inconsistency. | **Mitigation:** Strict linting rules. Components must lock down `className` injection, allowing only predefined variant props (e.g., `variant="primary"`). |
| **Accessibility Regression** | Complex custom components (e.g., Select dropdowns) failing keyboard/screen-reader tests. | **Mitigation:** Utilize a "Headless" accessible UI library for base primitives, styling them with Tailwind, rather than building complex ARIA logic from scratch. |
| **Bundle Bloat** | Loading the entire component library resulting in slow initial load times for the client. | **Mitigation:** Enforce tree-shaking and utilize Next.js React Server Components (RSC) to render non-interactive library components on the server. |

---

## 14. Component Library Recommendations (CLRs)

### CLR 001: Adopt Radix UI Primitives (Headless)
*   **Context:** Building custom, fully accessible interactive components (Dropdowns, Modals, Tabs, Selects) from scratch is highly error-prone and time-consuming.
*   **Recommendation:** Use Radix UI Primitives (or an equivalent headless library like React Aria) as the unstyled foundation for our complex components. We will wrap them and apply our Tailwind CSS design tokens. This guarantees WCAG 2.2 AA compliance and perfect keyboard navigation out-of-the-box, saving weeks of engineering time for the MVP.

---

**Approval Checklist**
- [ ] Component classification covers all PRD/Wireframe requirements.
- [ ] Accessibility standards (keyboard, focus, ARIA) are mandated.
- [ ] Responsive behaviors are explicitly defined.
- [ ] Form and validation patterns enforce consistency.

*Document Footer: Gridless Africa - Component Library Specification v1.0*