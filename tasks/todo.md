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
- [x] Commit and push only the standalone website repository, deploy only `bicc-health-khulna`, and verify the live release.

## Review

- Imported the owner-supplied identity and content into a focused patient website with bilingual navigation, an official 92 KB transparent logo, 156 diagnostic tests, 60 English doctor records, and 60 Bangla doctor records.
- Added search-first diagnostic and doctor directories, clinic/admission/OT/cabin information, admitted-patient pharmacy details, booking-request preparation, real contact/social/location actions, and an accessible mobile quick-action dock.
- Verification passed: clean `npm ci`, 6/6 automated tests, optimized production build (68.89 KB JavaScript and 6.07 KB CSS gzip), `git diff --check`, mobile and desktop browser QA, no console warnings/errors, no horizontal overflow, no duplicate IDs, no unnamed controls, and no empty links.
- Published commit `c6766be` to the public `sohazur/BICC-Website` repository. GitHub attributes the commit to `sohazur` via `71766945+sohazur@users.noreply.github.com`.
- Deployed only Firebase Hosting target `bicc-health-khulna` in project `bicc-e73e8`; the internal clinic Hosting site, Functions, Firestore rules, indexes, and production data were not changed.
- Live verification passed at `https://bicc-health-khulna.web.app/`: HTTP 200, expected security/cache headers, optimized assets, correct SEO/schema metadata, 156-test and 60-doctor UI counts, clean console, and 390 px / 1280 px layouts without overflow.

# Patient journey and enquiry refinement — 2026-08-14

## Product and design specification

- **Primary correction:** prevent the doctor directory and other dense sections from making the page feel endless on either phone or desktop.
- **Journey signature:** keep the ECG route as BICC's memorable visual, but make its ordered path obvious on phones as well as wide screens; each step must read as a confident action, not a generic card.
- **Doctor directory:** preserve all 60 bilingual records and filters while containing the results in a clearly labelled, keyboard-scrollable viewport sized to roughly two or three rows.
- **Clinic mobile hierarchy:** lead with the clinic explanation and actions, then show the supporting cabin image; remove all “illustrative/replacement” production copy.
- **Location language:** use Sonadanga as the visible locality while retaining the complete postal address for accuracy and search.
- **Visit experience:** replace the drawn map placeholder with an interactive Google Maps embed while keeping the direct Maps and address-copy actions.
- **Enquiry persistence:** save valid submissions through an isolated, write-only website Cloud Function into a private named Firestore database; do not relax clinic Firestore rules or deploy the clinic application's function codebase.
- **Safety and privacy:** validate and length-limit all fields server-side, require consent to store/contact, use idempotency, origin enforcement, a honeypot, and hashed-IP hourly limits, expose no public reads, and keep call/WhatsApp/SMS fallbacks when saving fails.
- **Responsive QA:** verify English and Bangla at narrow phone, standard phone, tablet, and desktop widths, including nested doctor scrolling, clinic order, map interaction, focus states, and no horizontal overflow.

## Implementation checklist

- [x] Redesign the three-step patient journey with a consistent desktop/mobile ECG path and stronger visual hierarchy.
- [x] Constrain doctor results to an accessible internal scroll region and add a clear bilingual scrolling cue.
- [x] Reorder and crop the clinic image for mobile; remove illustrative-image copy everywhere.
- [x] Replace visible Choto Boyra shorthand with Sonadanga while retaining the complete verified address.
- [x] Replace the decorative visit map with an interactive Google Maps embed.
- [x] Add the isolated website enquiry function, private Firestore persistence, validation, consent, rate limiting, idempotency, and resilient UI states.
- [ ] Extend frontend and function tests, then run clean install, unit tests, optimized build, and diff checks.
- [ ] Run bilingual browser QA across phone/tablet/desktop and verify the live save endpoint without touching clinic app data or rules.
- [ ] Commit and push only `BICC-Website`; deploy only the website function codebase and `bicc-health-khulna` Hosting target.

## Review

- Pending implementation and production verification.
