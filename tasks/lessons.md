# Lessons

- Treat owner-supplied website archives as source material, not a merge-ready release. Verify lockfiles, tests, source-data completeness, accessibility, responsive geometry, and real contact links before publishing.
- Dense healthcare directories should start with search and patient-friendly categories. Do not render hundreds of tests or dozens of doctors as one uninterrupted mobile page.
- Preserve the standalone patient website boundary: its Git history, deployment, assets, and task records must never be folded into the private BICC operations application.
- A directory can be searchable and still overwhelm the page. When the full doctor list is available, contain results in an explicitly labelled internal scroll area that shows only two or three rows at a time on both mobile and desktop.
- Responsive hierarchy must reflect the patient's task: clinic explanation and actions precede supporting imagery on phones, and a signature journey graphic must remain understandable rather than disappearing at the mobile breakpoint.
- Never ship asset-production notes such as “illustrative image” or “replace later” in patient-facing copy.
- Keep public-search work in the standalone website repository and Hosting target even when a similarly named internal clinic application exists; verify the Git remote and Firebase site before every commit or deploy.
- If Chrome extension discovery is unavailable but the user explicitly confirms Computer Use is enabled, use the desktop Computer Use path to operate the real logged-in Chrome session before declaring browser/account access unavailable.
