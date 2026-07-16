---
# COVER PAGE

**Document ID:** SHNG-DS-001
**Title:** Design System
**Project Name:** Gridless Africa
**Version:** 1.0
**Date:** July 16, 2026
**Status:** Draft for Review
**Author:** Principal Design Systems Architect
**Intended Audience:** Product Designers, Frontend Engineers, Brand Strategists, QA Specialists
**Approval Status:** Pending

---

## Change Log

| Version | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | July 16, 2026 | Principal Design Systems Architect | Initial Baseline. Aligned with PRD v1.0, Technical Architecture v1.0, and UX Strategy v1.0. |

## Related Documents & Dependencies
* **SHNG-CON-001** Project Constitution v1.0
* **SHNG-PRD-001** Product Requirements Document v1.0
* **SHNG-ARCH-001** Technical Architecture v1.0
* **SHNG-UX-001** UX Strategy v1.0
* **SHNG-IA-001** Information Architecture v1.0

## Approval Workflow
1.  **Draft Review:** Lead UI Designer & Frontend Lead (Pending)
2.  **Accessibility Audit:** Accessibility Specialist (Pending)
3.  **Final Sign-off:** CTO / Co-Founders (Pending)

---

## 1. Executive Summary
The Gridless Africa Design System is the single source of truth for our visual language and user interface components. By establishing strict guidelines that map seamlessly to Next.js and Tailwind CSS, this system eliminates redundant design work, ensures cross-platform consistency, and enables rapid development. Crucially, it hardcodes accessibility (WCAG 2.2 AA) into the foundation, guaranteeing that our interface serves users across all devices and environmental conditions.

---

## 2. Design Philosophy
Every component and pixel must align with the following core principles:
* **Trustworthy:** The primary hurdle in the Nigerian solar market is fear of substandard hardware or financial loss. Our UI must project the stability of a tier-1 financial institution.
* **Mobile-First & Performance-Focused:** Design must prioritize thumb-reachability and fast rendering on 3G networks. Heavy graphical assets are minimized.
* **Clean & Minimal Cognitive Load:** Hide complexity. Users should see actionable insights (e.g., ROI, payback period), not raw engineering data unless requested.
* **Environmentally Resilient:** Designing for outdoor visibility in bright, sunlit environments (such as rooftops in Akobo or Lagos) requires strict adherence to high-contrast palettes and robust typography.
* **SME-Centric:** The visual language must signal robust economic performance and business growth to our commercial users adopting solar as infrastructure.

---

## 3. Brand Foundations
* **Brand Personality:** Authoritative yet accessible; a reliable partner in energy independence.
* **Tone:** Clear, professional, educational, and reassuring.
* **Visual Identity:** Anchored by geometric stability and high contrast. 
* **Logo Usage Guidelines:** The logo must maintain clear space equal to the height of its glyph. Never distort, recolor outside the approved palette, or place over busy backgrounds.
* **Icon Style:** Line icons (2px stroke), geometric, unfilled to maintain a clean aesthetic and reduce visual clutter.
* **Illustration Style:** Flat, vector-based illustrations featuring local context (e.g., recognizable Nigerian architecture, local small businesses) to build empathy and relevance.
* **Photography Style:** Authentic, well-lit photography of real installers and hardware. No generic stock photos of western homes.

---

## 4. Colour System
The palette is engineered for high contrast and emotional resonance, mapping perfectly to Tailwind's configuration model.

| Category | Role / Colour Name | Purpose & Usage | Accessibility Considerations |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Navy / Trust Blue | Core branding, primary buttons, header backgrounds. Conveys financial security. | Must meet 4.5:1 contrast against white text. |
| **Secondary** | Sun Gold / Energy Yellow | Accents, "Best Value" highlights, active tab states. Represents solar power. | Use for UI accents only, not for critical text. |
| **Accent** | Forest Green | Sustainability indicators, positive ROI metrics. | Ensure sufficient contrast against light backgrounds. |
| **Success** | Emerald Green | Form success, completed milestones, verified badges. | Combine with checkmark icons for color-blind users. |
| **Warning** | Amber/Orange | Expiring quotes, system alerts. | Combine with alert icons. |
| **Error** | Crimson Red | Form errors, rejected KYC, failed payments. | Must meet 4.5:1 contrast against light backgrounds. |
| **Info** | Sky Blue | Tooltips, informational banners. | Ensure readability for text overlays. |
| **Neutral** | Slate / Gray Scale | Borders, disabled states, secondary text. | Use dark slates for body text to reduce eye strain. |
| **Background** | Off-White / Pearl | Application background to reduce harsh glare. | Ensure components sit cleanly on top. |
| **Surface** | Pure White | Cards, modals, dropdowns. | Used to lift content off the background. |

---

## 5. Typography System
We use a robust, highly legible sans-serif stack optimized for digital interfaces.

* **Font Family:** Primary Sans-Serif (e.g., Inter or a similar highly readable geometric sans).
* **Display Headings:** Used for marketing hero sections only. Tight letter-spacing, heavy weights.
* **Headings (H1–H6):** Used to establish strict content hierarchy. 
    * H1: Page Titles (e.g., Dashboard Overview)
    * H2: Section Titles (e.g., Active Quotes)
* **Body Text:** Base size set to 16px (equivalent to 1rem) for maximum readability on mobile devices.
* **Captions/Labels:** 12px-14px for form labels and metadata, in medium weights to preserve legibility.
* **Line Heights:** 1.5 for body text to improve readability; 1.2 for headings to maintain tight visual grouping.
* **Responsive Scale:** Typography scales fluidly based on viewport width (larger H1s on desktop, compact on mobile).

---

## 6. Spacing & Layout System
Built on a strict **8pt grid system** to ensure vertical and horizontal rhythm.

* **Spacing Scale:** Base unit = 8px. Scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px.
* **Margins & Padding:** Components must exclusively use values from the spacing scale.
* **Grid System:** 12-column grid on desktop, 8-column on tablet, 4-column on mobile.
* **Containers:** Maximum content width capped at 1200px to prevent ultra-wide distortion.
* **Breakpoints:** * Mobile: < 768px
    * Tablet: 768px - 1023px
    * Desktop: 1024px+

---

## 7. Elevation & Shadows
Shadows are used purposefully to indicate interactive depth and Z-index hierarchy, never for mere decoration.

* **Level 1 (Subtle):** Cards, input fields on hover.
* **Level 2 (Medium):** Dropdowns, sticky headers, bottom navigation bars.
* **Level 3 (High):** Modals, dialog boxes, floating action buttons (FABs).

---

## 8. Border Radius & Shapes
* **Radius Scale:** Base unit = 8px.
* **Usage:**
    * Small (4px): Checkboxes, small badges.
    * Medium (8px): Buttons, input fields, cards (standardizes the modern, friendly feel).
    * Large (16px+): Modals, bottom-sheet drawers.
    * Full (9999px): Avatars, radio buttons.

---

## 9. Iconography
* **Style:** Clean, minimalist 2D line icons. 2px stroke width.
* **Sizes:** * 16x16 (Inline text icons, tooltips)
    * 24x24 (Standard UI icons, navigation)
    * 32x32 (Empty state accents)
* **Accessibility Labels:** Every SVG icon must contain a `<title>` tag or an `aria-label` attribute if it is actionable or conveys critical meaning.

---

## 10. Imagery & Illustrations
* **Product Images:** Isolated on clean, white backgrounds for the marketplace.
* **Installer Images:** Professional headshots or branded company logos.
* **Empty-State Illustrations:** Simple, single-color vector graphics (using Brand Primary and Secondary) to keep the app lightweight.

---

## 11. Motion & Animation
Motion must be performant, subtle, and purposeful. No excessive flourishes.
* **Page Transitions:** Instant or subtle fade-in (max 150ms).
* **Hover/Focus States:** Fast transitions (100ms) on opacity or background color.
* **Loading Indicators:** Skeleton loaders preferred over spinners to reduce layout shift and perceived wait times.
* **Reduced Motion:** Must respect the user's OS-level `prefers-reduced-motion` settings, falling back to instant state changes.

---

## 12. Forms
Forms are critical for capturing leads and Escrow deposits. They must be flawless.
* **Inputs:** Large touch targets (min 44px height). Persistent, visible labels above the input field (no floating labels to reduce cognitive load).
* **Validation:** Real-time on `blur`.
* **Error Messages:** Red text placed explicitly below the input field, accompanied by an error icon.
* **Required Fields:** Marked with a subtle asterisk `*`. Optional fields explicitly labeled "(Optional)".
* **Toggles/Switches:** Used for immediate state changes (e.g., turning on notifications).

---

## 13. Navigation Components
* **Navbar (Desktop):** Sticky top bar. White background, subtle bottom border.
* **Sidebar (Authenticated Desktop):** Fixed left side. Highlights the active route using a light background fill and primary color text.
* **Mobile Navigation:** Fixed bottom tab bar (using Level 2 Elevation) for quick access to core routes.
* **Breadcrumbs:** Text-based, separated by chevrons (`>`), acting as links to parent directories.

---

## 14. Data Display Components
* **Cards:** The primary container for quotes, products, and projects. White surface, Level 1 shadow, 8px border radius.
* **Tables:** Used exclusively for high-density Admin and Installer views on tablet/desktop. Must include horizontal scrolling for smaller screens.
* **Badges:** Used for status indicators (e.g., "Pending", "Verified"). High contrast text on a light tinted background of the respective semantic color.
* **Progress Indicators:** Step-trackers used in the Solar Calculator and Installer KYC wizard to orient the user.

---

## 15. Feedback Components
* **Toasts:** Slide in from bottom-center on mobile, top-right on desktop. Auto-dismiss after 4 seconds.
* **Modals:** Used for destructive actions (e.g., "Cancel Quote") or deep focus tasks. Must include a dark overlay backdrop and an explicit "X" close button.
* **Empty States:** Centered illustration + informative text + primary action button.
* **Loading Skeletons:** Animated light-gray placeholders matching the exact shape of the expected content.

---

## 16. Accessibility Standards
* **Colour Contrast:** Strict adherence to WCAG AA (4.5:1 for normal text, 3:1 for large text).
* **Keyboard Navigation:** All interactive elements must have a visible `focus-visible` ring.
* **Touch Targets:** Minimum 44x44 CSS pixels for all buttons and icon links on touch devices.
* **Screen Readers:** Forms must use appropriate `aria-describedby` tags linking inputs to their error messages.

---

## 17. Design Tokens (Implementation Naming Strategy)
Design tokens bridge the gap between design and Tailwind CSS configuration.
* **Colours:** `color-brand-primary`, `color-semantic-success-bg`, `color-text-body`.
* **Typography:** `text-size-h1`, `font-weight-medium`, `line-height-relaxed`.
* **Spacing:** `spacing-sm` (8px), `spacing-md` (16px), `spacing-lg` (24px).
* **Shadows:** `shadow-level-1`, `shadow-level-2`.

---

## 18. Future Expansion
* **Mobile Applications:** Tokens map seamlessly to React Native stylesheets for the future iOS/Android rollout.
* **AI Interfaces:** Chat UI components (bubbles, typing indicators) will inherit the existing radius and typography tokens.
* **Binance Wallet / Web3:** Dedicated token colors (Crypto Yellow) reserved for future Web3 integration buttons.
* **IoT Dashboards:** Dark mode token variations will be introduced to support high-contrast, always-on inverter monitoring screens.

---

## 19. Design System Risks & Mitigation

| Risk | Description | Mitigation Strategy |
| :--- | :--- | :--- |
| **Inconsistent Implementation** | Developers overriding tokens with hardcoded CSS values. | **Mitigation:** Strict PR reviews. Use Tailwind linters to enforce the usage of utility classes configured to our design tokens. |
| **Accessibility Regression** | New components failing WCAG standards. | **Mitigation:** Mandatory automated accessibility checks (e.g., Axe) integrated into the CI/CD pipeline. |
| **Bloated CSS Bundle** | Unused styles slowing down performance. | **Mitigation:** Next.js and Tailwind JIT compiler will automatically purge unused tokens from the production build. |

---

## 20. Design System Recommendations (DSRs)

### DSR 001: Phase 2 Dark Mode Architecture
* **Context:** While the MVP is designed for standard light-mode use, the future inclusion of IoT monitoring dashboards (which users may leave active on screens permanently) will heavily benefit from Dark Mode to reduce eye strain and power consumption.
* **Recommendation:** Structure the color design tokens with CSS variables from Day 1 (e.g., using Tailwind's `dark:` variant patterns) even if we do not expose the toggle to users in Phase 1. This prevents a massive refactoring effort during Phase 3.

---

**Approval Checklist**
- [ ] Brand colors map cleanly to accessibility requirements.
- [ ] 8pt spacing grid is established for frontend integration.
- [ ] Mobile-first sizing (touch targets) is mandated.
- [ ] Design tokens are prepared for Tailwind CSS configuration.

*Document Footer: Gridless Africa - Design System v1.0*