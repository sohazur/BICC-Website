# BICC website owner-content revision — 2026-08-13

## Product specification

- **Repository boundary:** work only in the standalone `BICC-Website` repository and the `bicc-health-khulna` Firebase Hosting site. Do not modify or deploy the internal `BICC-Clinic` application.
- **Subject:** Biswas Investigation Centre & Clinic (BICC), a patient-facing diagnostic centre, clinic, inpatient facility, operation theatre, cabin service, and admitted-patient pharmacy in Khulna.
- **Audience:** Bangla- and English-speaking patients and family members, especially stressed or low-digital-confidence mobile visitors.
- **Single job:** make it immediately obvious how to find a test or doctor, understand clinic/pharmacy support, contact BICC, request a visit, and get directions.
- **Owner sources:** the supplied four-page UI/UX brief, official logo, BICC information file, diagnostic rate chart, and bilingual doctor directories from `WebDev.zip`.

## Design plan

- **Direction:** retain the established “quiet clinical confidence” design—warm white, forest green, diagnostic violet, mint, and ink—with the supplied official BICC logo and a clearer institutional name lockup.
- **Typography:** Manrope for English/utility text and Anek Bangla for Bangla; keep the oversized editorial hero but make dense medical directories compact and scannable.
- **Layout:** remove the utility strip; use a single sticky header; move the three-step patient journey beneath the hero; organize diagnostics and doctors as search-first, expandable directories; keep Clinic, Pharmacy, Contact, and Visit as focused patient-action sections.
- **Signature:** keep the restrained ECG route line as the ordered three-step patient journey. It is specific to diagnostic care and communicates a real sequence rather than acting as decoration.
- **Responsive rule:** at phone widths the header, directory controls, and fixed quick actions must fit within the viewport with no horizontal scrolling; dense lists stay collapsed until requested.
- **Accessibility rule:** every control must be keyboard-operable with a visible focus state; language selection must use real buttons, persist, update the document language, and keep labels localized.
- **Content safety:** show owner-provided doctors and test names without rates, clearly require phone confirmation for schedules, preparation, prices, availability, admission, and surgery. Do not imply that the SMS/WhatsApp helper automatically books an appointment.

## Implementation checklist

- [x] Import and optimize the supplied BICC logo; update the header, navigation, hero, journey placement, and footer.
- [x] Publish every supplied diagnostic test without rates, including the missing X-ray, urine, and stool services, behind searchable expandable categories.
- [x] Add the complete bilingual 60-doctor directory with patient-friendly specialty grouping, search, and schedule-confirmation guidance.
- [x] Focus Clinic on IPD/admission, OT, and cabins; add the admitted-patient pharmacy section and owner-confirmed payment/operations copy.
- [x] Connect the supplied Facebook, Instagram, WhatsApp, call, Maps, address-copy, SMS, and appointment-request actions.
- [x] Restore language persistence, document-language updates, semantic controls, labels, focus states, and reduced-motion behavior.
- [x] Repair package-lock reproducibility, tests, mobile layout, asset weight, SEO/schema/social metadata, and inactive-link behavior.
- [x] Run clean install, automated tests, optimized build, desktop/mobile browser QA, console/network/overflow checks, and content-count assertions.
- [ ] Commit and push only the standalone website repository, deploy only `bicc-health-khulna`, and verify the live release.

## Review

- Pending implementation and release verification.
