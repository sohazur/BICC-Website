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
- [x] Extend frontend and function tests, then run clean install, unit tests, optimized build, and diff checks.
- [x] Run bilingual browser QA across phone/tablet/desktop and verify the live save endpoint without touching clinic app data or rules.
- [x] Commit and push only `BICC-Website`; deploy only the website function codebase and `bicc-health-khulna` Hosting target.

## Review

- Rebuilt the three-step journey as a real ordered ECG path with icons and direct service/call/map actions. Desktop keeps the horizontal pulse; phone layouts use a connected vertical pulse and compact action cards in both English and Bangla.
- Contained all-doctor results in a keyboard-labelled internal scroll region: 497px at 320×667, 600px at 390×844, and 650px at tablet/desktop sizes. All 60 records remain rendered and searchable, with stable group counts across both languages and a keyboard skip link to Clinic.
- Fixed the clinic image's accidental 800px rendered height by overriding its intrinsic height and removing default figure margins. The phone crop is now 245px, clinic copy/actions precede the image, and all patient-facing placeholder/replacement notes are gone.
- Changed visible locality shorthand to Sonadanga while retaining Choto Boyra inside the complete postal address. Replaced the decorative map with a lazy, localized interactive Google Maps embed pinned to the verified coordinates; visit copy/actions precede the map on phones.
- Created deletion-protected named Firestore database `bicc-public` in `nam5`, deployed deny-all browser rules and TTL policies, and deployed only website codebase function `submitPublicWebsiteRequest` in `asia-south1`. The six clinic functions in the `default` codebase remained unchanged.
- The save endpoint validates and canonicalizes all fields, requires consent, rejects disallowed origins, limits payload/field sizes, uses a honeypot, hashes the IP into an hourly limit key, and treats repeated UUIDs idempotently. WhatsApp, SMS, copy, and call remain available if saving fails.
- Automated verification passed: 8/8 React tests, 5/5 server validation tests, optimized build (70.88 KB JavaScript and 6.33 KB CSS gzip), and `git diff --check`.
- Live bilingual QA passed at 320, 390, 768, and 1280px with no horizontal overflow or console warnings/errors. The real production form stored a QA request, repeated direct submission returned success without duplication, an unauthorized origin returned HTTP 403, and the QA document was removed afterward (`release_qa_documents=0`).
- Published website commits `05ea5b4` and `409079c` to `sohazur/BICC-Website`; Firebase Hosting serves bundle `main.b3b7f813.js` at `https://bicc-health-khulna.web.app/`.

# Public domain launch — 2026-08-14

## Launch specification

- **Primary address:** serve the public website at `https://biswasclinic.com/` with a valid managed TLS certificate.
- **Canonical behavior:** use the apex domain as the canonical URL and make `www.biswasclinic.com` resolve through Firebase Hosting and redirect to the apex where supported.
- **Scope boundary:** connect only the standalone `BICC-Website` release and Firebase Hosting site `bicc-health-khulna`; preserve the internal clinic application, its default Hosting site, functions, rules, and data.
- **DNS safety:** inspect the current Namecheap host records first, change only records that conflict with Firebase Hosting, and preserve unrelated email and verification records.
- **Application readiness:** allow saved enquiries from the apex and `www` origins, update canonical/social/schema/sitemap URLs, and retain the `web.app` address as a fallback.
- **Definition of live:** public DNS resolves, HTTPS validates, the apex renders the production website, `www` has intentional behavior, and the enquiry endpoint accepts the custom-domain origin.

## Implementation checklist

- [x] Inspect existing DNS, redirects, and Firebase custom-domain state.
- [x] Add the apex and `www` custom domains to `bicc-health-khulna` and capture Firebase's exact DNS requirements.
- [x] Apply the required Namecheap records without disturbing unrelated DNS.
- [x] Update production origins and SEO URLs; run automated tests and an optimized build.
- [x] Commit and push only `BICC-Website`; deploy only its function codebase and Hosting site.
- [x] Verify public DNS, managed HTTPS, apex/`www` behavior, and the live saved-enquiry flow.

## Review

- Namecheap now publishes the Firebase apex A record, Hosting ownership TXT record, and `www` CNAME on both authoritative nameservers. The existing email-forwarding SPF TXT record was preserved unchanged.
- Firebase now serves the apex consistently over managed HTTPS with HTTP 200, and `www` returns the intentional HTTP 301 redirect to the apex. The production enquiry endpoint accepted and persisted a controlled QA request in `bicc-public`; the record was verified and removed after the check.

# Search Console and TLS follow-up — 2026-08-14

## Checklist

- [x] Re-check authoritative/public DNS, Firebase custom-domain state, and live TLS behavior.
- [x] Add the `biswasclinic.com` domain property to Google Search Console and verify it through DNS.
- [x] Submit `https://biswasclinic.com/sitemap.xml` and inspect the resulting status.
- [x] Re-test secure apex loading and the intentional `www` redirect after Firebase edge propagation.
- [x] Document the current Search Console and TLS outcome and push the website repository.

## Review

- The `sc-domain:biswasclinic.com` property is ownership-verified in Google Search Console for `sohazur@reachllm.com` using a Namecheap DNS TXT record. Existing Firebase and email TXT records remain intact.
- Google Search Console accepted `https://biswasclinic.com/sitemap.xml` with status **Success** and discovered one page on August 14, 2026.
- A clean Chrome Incognito session loaded the apex over HTTPS with the normal site-information indicator, and `https://www.biswasclinic.com/` redirected to the apex. The older normal-profile tab still showed a stale **Not Secure** label.
- After the final Hosting deployment, `https://biswasclinic.com/` returns HTTP 200 with the production page and `https://www.biswasclinic.com/` returns HTTP 301 to the apex. The earlier Firebase 404/edge-propagation condition is resolved on the verified edge.

# Bilingual SEO/GEO answer library — 2026-08-16

## Audit and product specification

- **Subject:** Biswas Investigation Centre & Clinic (BICC), a diagnostic centre, specialist chamber, clinic, admission/OT/cabin facility, and admitted-patient pharmacy in Sonadanga, Khulna.
- **Audience:** Bangla- and English-speaking patients or relatives searching from Khulna under time pressure, including people who use different spellings such as diagnostic centre/center, X-ray/Xray, ultrasound/ultrasonography/USG, ECG/EKG, clinic/hospital, cabin/room, and গাইনি/স্ত্রীরোগ/প্রসূতি.
- **Primary job:** answer the immediate question, show whether BICC lists the relevant service or specialist, state what must be confirmed by phone, and offer call, WhatsApp, appointment-request, and map actions without forcing a long homepage scroll.
- **Current technical gap:** the Create React App release exposes one client-rendered URL, one generic metadata set, one sitemap entry, and a JavaScript/local-storage language switch. It has no crawlable service, specialist, or article architecture, no URL-level English/Bangla alternates, and a catch-all rewrite that can turn missing routes into soft 404s.
- **Rendering decision:** migrate the public UI to an Astro static export with narrowly hydrated React islands for search, navigation, and the enquiry form. Each route must ship complete HTML, page-specific metadata, canonical and `hreflang` links, JSON-LD, and semantic internal links. Static generation is the correct server-rendered output for this mostly fixed content, produces less browser JavaScript than a full application framework, and remains compatible with the existing Firebase Hosting and enquiry Function.
- **Language URLs:** keep `/` as English/x-default and use `/bn` for Bangla. Mirror every service, specialist, and article at a distinct Bangla URL; never use cookies, browser language, or client-side text replacement as the only discoverable translation.
- **Content quality boundary:** do not fabricate prices, cabin counts, test preparation, doctor schedules, patient totals, outcomes, reviews, accreditation, or a “best” ranking. Answer “best clinic/diagnostic centre in Khulna” intent with an evidence-based comparison checklist and clearly identify BICC's owner-confirmed facts. Comparison content must never disparage or rank competitors without a dated, reproducible dataset.
- **Medical safety:** keep articles logistical and educational, cite reputable sources where clinical context is necessary, distinguish diagnostics from diagnosis, add an emergency notice, and tell readers to follow their clinician's instructions. Do not imply physician review until a named BICC clinician actually reviews the copy.
- **GEO principle:** optimize for ordinary search and AI answers through concise visible answers, original local facts, explicit entities, source links, and consistent structured data—not keyword stuffing, hidden text, mass-generated doorway pages, or unsupported `llms.txt` claims.

## Information architecture

- Home: `/` and `/bn`.
- Service hub plus focused pages for pathology, X-ray, ultrasonography/USG, ECG, specialist consultation, clinic admission, operation theatre/surgery support, and cabins.
- Specialist hub plus focused pages for medicine/heart care, gynaecology/obstetrics, general/laparoscopic surgery, orthopaedics, kidney/urology, and child health; every page is derived from the owner-provided doctor directory and repeats the schedule-confirmation requirement.
- Blog hub plus substantial bilingual guides covering a 10-point diagnostic-centre checklist, a neutral “best clinic in Khulna?” comparison framework, what to bring for a test, questions to ask before pathology testing, X-ray/ultrasound/ECG visit checklists, doctor-schedule confirmation, and admission/cabin planning.
- About/editorial page that identifies BICC, its location and history, explains owner-supplied versus cited information, shows update dates, and publishes the content-review/correction policy.

## Design plan

- **Direction:** extend the existing quiet clinical confidence system rather than introducing a generic magazine theme. Use forest `#07543B`, deep forest `#042E23`, diagnostic violet `#44317A`, mint `#E8F5EE`, paper `#F6F8F5`, and ink `#15251F`.
- **Type:** retain Manrope for English and utility text and Anek Bangla for Bangla; self-host through the framework build where practical to remove a render-blocking third-party font request.
- **Layout:** compact institutional header; page-specific answer hero; a narrow “what BICC offers / what to confirm” truth strip; readable article column; related services and guides; persistent patient actions; restrained footer.
- **Signature:** an “answer route” rail that connects each article's direct answer, local BICC fact, confirmation step, and next action. It borrows the ECG rhythm from the homepage but encodes a real patient decision path.
- **Article cards:** use service-specific line icons, bilingual taxonomy labels, reading time, and one-sentence outcomes rather than stock-blog thumbnails.
- **Responsive/accessibility:** no horizontal overflow at 320px; one-column article flow; 44px controls; skip links, landmarks, visible focus, reduced motion, descriptive breadcrumbs, and no interaction required to reveal core answer text.

## Implementation checklist

- [x] Migrate the public frontend to a reproducible Astro static export without changing the isolated enquiry Function or clinic application.
- [x] Publish distinct English/Bangla home, service, specialist, blog, article, and editorial routes with complete initial HTML.
- [x] Add unique titles, meta descriptions, canonical URLs, `hreflang`, Open Graph/Twitter metadata, breadcrumbs, LocalBusiness/MedicalClinic/DiagnosticLab, Service, Article, and Breadcrumb JSON-LD where appropriate.
- [x] Remove the ignored meta-keywords approach and the Hosting catch-all soft-404 behavior; add a real localized 404 and keep `/api/enquiries` working.
- [x] Add the responsive blog/service UI, homepage discovery section, internal links, patient action rail, citations, update dates, editorial disclosures, and correction contact path.
- [x] Generate localized sitemap entries and robots output from the content registry; validate that every sitemap URL returns an indexable 200 with its own canonical HTML.
- [x] Preserve the 156-test and 60-doctor bilingual directories, enquiry persistence, language usability, contact/social/map links, and mobile quick actions.
- [x] Run unit/content tests, clean build, a no-JavaScript HTML crawl, structured-data checks, Lighthouse/performance analysis, bilingual mobile/desktop QA, console/network review, and unknown-route 404 tests.
- [x] Commit and push only `BICC-Website`, deploy only its Hosting target, verify the production enquiry flow, and submit the expanded sitemap for indexing in Search Console.

## Review

- Replaced the one-document Create React App release with a 57-page Astro static build containing 56 indexable URLs: 28 English and 28 Bangla. The collection includes two homepages, service/specialist/blog hubs, nine focused service pages per language, six specialty pages per language, eight substantial patient guides per language, and bilingual about/editorial pages.
- Every sitemap URL now ships a unique title and description, canonical URL, English/Bangla/`x-default` alternates, Open Graph/Twitter metadata, one visible H1, complete answer content without JavaScript, and valid JSON-LD. The catch-all soft 404 and obsolete meta-keywords approach are gone.
- Added a restrained responsive answer-library design with direct-answer heroes, truth/confirmation panels, the ECG-inspired answer route, internal discovery links, neutral comparison criteria, reputable medical-context citations, owner-data disclosure, correction policy, and persistent call/WhatsApp/request/map actions.
- Preserved the interactive 156-test directory, default all-doctor view with 60 server-rendered bilingual records inside the contained scroll region, Clinic/OT/cabin/pharmacy sections, Google Map, social links, and saved-enquiry React island/API route.
- Clean verification passed: `npm ci`, 12/12 frontend/content tests, 5/5 Function validation tests, production build, zero npm vulnerabilities, `git diff --check`, and an HTML audit across all 56 indexable routes. Unknown routes return HTTP 404.
- Chrome QA passed at 390px mobile and 1440px desktop with no horizontal overflow or console errors. Lighthouse scored 100 for accessibility, best practices, SEO, and agentic browsing on both the mobile homepage and desktop comparison article; the local homepage trace measured 166 ms LCP and 0.00 CLS.
- Published commit `80c1f14` to the public `sohazur/BICC-Website` repository with author `Sohazur Islam <71766945+sohazur@users.noreply.github.com>` and deployed only Firebase Hosting site `bicc-health-khulna` from project `bicc-e73e8` using `mdsohazurislam@gmail.com`.
- Production verification passed on August 16, 2026: apex and Firebase fallback return HTTP 200, `www` redirects to the apex, focused service/blog routes return HTTP 200, unknown routes return HTTP 404, the sitemap returns XML with 56 URLs, hashed Astro assets receive immutable caching, and security headers are present.
- The live enquiry endpoint returned HTTP 200 for a controlled QA submission, stored the normalized request in the named private Firestore database, and the QA submission was removed immediately after verification.
- Google Search Console accepted the refreshed sitemap with status **Success**, last read August 16, 2026, and **56 discovered pages**. This submits the complete bilingual URL set for crawling; Google controls crawl and indexing timing.
