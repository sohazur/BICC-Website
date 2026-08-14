# BICC Website

Public patient website for Biswas Investigation Centre & Clinic (BICC) in Khulna, Bangladesh.

## Live site

[biswasclinic.com](https://biswasclinic.com/)

Firebase fallback: [bicc-health-khulna.web.app](https://bicc-health-khulna.web.app/)

## Local development

```bash
npm ci
npm start
```

## Verification

```bash
npm test -- --watchAll=false
npm run build
```

The patient website is intentionally maintained separately from the private internal BICC operations application.

Valid appointment enquiries are saved by the website-owned `bicc-public-website` Functions codebase to the isolated `bicc-public` Firestore database. Browser access to that database is denied; staff can review requests from the Firebase console. A saved request is not a confirmed appointment.

Deploy only from this directory and keep every target scoped:

```bash
firebase deploy --project bicc-e73e8 --only firestore:bicc-public
firebase deploy --project bicc-e73e8 --only functions:bicc-public-website:submitPublicWebsiteRequest
firebase deploy --project bicc-e73e8 --only hosting
```

Never run an unscoped Firebase deploy here or deploy the parent clinic application's default Functions/Firestore configuration for website changes.

Valid appointment enquiries are saved by the website-owned `bicc-public-website` Functions codebase to the isolated `bicc-public` Firestore database. Browser access to that database is denied; staff can review requests from the Firebase console. A saved request is not a confirmed appointment.

Deploy only from this directory and keep every target scoped:

```bash
firebase deploy --project bicc-e73e8 --only firestore:bicc-public
firebase deploy --project bicc-e73e8 --only functions:bicc-public-website:submitPublicWebsiteRequest
firebase deploy --project bicc-e73e8 --only hosting
```

Never run an unscoped Firebase deploy here or deploy the parent clinic application's default Functions/Firestore configuration for website changes.
