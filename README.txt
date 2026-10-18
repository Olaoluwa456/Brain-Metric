BrainMetric PWA — Complete Offline Knowledge & Reasoning Edition

QUESTION BANK
- 6,441 knowledge questions in total: 63 original curated starter questions plus 6,378 added questions.
- 1,000 existing reasoning exercises, for 7,441 total practice questions in this release.
- 13 topical areas represented, including general knowledge, Nigeria & Africa, science, world history, geography, technology, sports, exam practice, chemistry, maths, English/vocabulary, culture/arts and brain teasers.
- Each question has a natural-language prompt (no generated “Question 667:” prefixes), four answer choices, one keyed answer, difficulty, category and an explanation.
- Bank is built from explicit fact tables, country metadata, periodic-table reference data, common English spelling-frequency data, and mathematically calculated exercises.
- Automated validation checks required fields, choice count, answer indices, categories, difficulty, explanations and duplicate stems. This is not a substitute for human editorial review of every factual claim.

FEATURES
- No sign-in, passwords, Google auth, Supabase or user account required.
- Installable PWA, manifest, app icons and offline cache for app shell and question bank.
- Reasoning test centre, Explore Quizzes, searchable 5K+ Question Bank, daily question, daily sprint, weekly cup, shareable challenge links, result cards, Brain Arcade, XP/ranks, missions, Journey, lessons, mistake review, analytics, achievements and local data export/reset.
- Topic collections: General Knowledge; Nigeria & Africa; Science & Nature; World History; World Geography; Technology & Digital Life; Sports & Entertainment; Exam Preparation; Mathematics & Numeracy; Chemistry & Elements; English & Vocabulary; Culture, Literature & Arts; and Brain Teasers.
- Question Bank can search prompts, options and explanations, filter by topic/difficulty, reveal answers, save questions, practise filtered sets and page through results.
- Public quiz directory at /quizzes/index.html links to 16 standalone topic/challenge landing pages; crawlable from the main footer. robots.txt permits public crawl discovery.

QUESTION BANK SOURCES AND LIMITATIONS
- Country reference facts use the installed CountryInfo metadata snapshot and ISO 3166 / ISO 639 / ISO 4217 reference lists accessed through CountryInfo and pycountry. Some country metadata may be incomplete or may differ between sources; border lists and country naming are especially subject to source updates.
- Element names, symbols, atomic numbers and approximate atomic weights use the installed RDKit periodic-table reference data.
- Spelling targets are drawn from the packaged TextBlob English spelling-frequency list; distractors are mechanically generated and filtered against that dictionary.
- Numerical/algebra/geometry/statistics questions are generated from arithmetic rules and their answer keys are calculated deterministically.
- Additional general-knowledge facts are explicit BrainMetric-authored reference-table entries. The bank has been automated-checked, but should be editorially reviewed before it is described as fully expert-verified or official exam material.
- Exam questions are original practice questions, not official WAEC, NECO, JAMB or other past papers. Current affairs are not auto-updated while offline; add dated, sourced content when publishing current-events quizzes.
- Scores are practice results, not a validated IQ score or clinical assessment.

NO ACCOUNTS / ONLINE LIMITS
- Progress is stored in the current browser/device. Cross-device sync, real-time online multiplayer, tamper-resistant public leaderboards and central question editing require a real backend; this static release does not pretend to provide them.
- Sharing quiz URLs lets friends attempt the same deterministic question set, but each result remains local.
- Clearing browser site data may remove local progress. Use Settings & data → Export JSON to create a backup first.

DEPLOY
1. Extract this ZIP.
2. Upload the contents of the BrainMetric-PWA folder to your static host (e.g. Netlify), replacing the previous release files together.
3. Confirm `question-bank.js` uploads alongside `index.html`; it is needed for the enlarged bank.
4. Open the HTTPS site, refresh it, and test Explore Quizzes and Question Bank. The service-worker cache version is updated for this release. The v7 release starts with a fresh score history for existing installations.
5. For search-engine discovery, use the final domain to create/submit a sitemap and verify site ownership in search-console tools after deployment.

Built as a static, installable educational PWA.


SECURITY-HARDENED RELEASE
- This release externalizes app JavaScript/CSS and removes the remote Google Fonts import.
- Netlify deployment: publish the contents of this folder at the site root so _headers is
  applied. The policy blocks inline scripts and third-party connections while allowing the
  existing inline style attributes needed by dynamic layout.
- Publish over HTTPS. HSTS is included for HTTPS responses.
- Verify security headers on the live origin after deployment; local ZIP inspection cannot
  verify host configuration or deployed response headers.
- Local scores remain editable and are not suitable for high-stakes competition.
- See SECURITY-REVIEW.txt for the three hardening passes, ten-point checks, and limitations.


RELEASE v7 — SCORE RESET, FRESH START & DARK THEME
- The published v7 build uses a new local storage namespace, so existing browsers start with zero scores when they first load this release. Old v1 local score storage is discarded on startup.
- A new visitor using their own browser profile starts at zero automatically. Progress is local to a browser profile and is not shared between visitors or devices; two people using the same browser profile will share that profile's local data unless it is reset.
- Overview > Recent activity includes Reset scores. Settings & data includes Reset scores & statistics (keeps theme, completed lessons, profile and saved questions) and Erase everything (clears all app progress and preferences). Both actions require confirmation.
- Dark mode has been redesigned with a deeper navy/obsidian background, clearer surface layers, aqua accents, better borders, and updated cards and controls. The theme button now shows an accessible moon/sun-style switch.
- The service-worker cache is bumped to v7 so the browser installs the updated app files. Publish the contents of this folder together and ensure _headers remains at the site root.


BUG-FIX PASS — DAILY CHALLENGE REWARD
- Daily Challenge completion now has a handler-level duplicate-completion guard in addition to disabled UI controls. XP cannot be granted again through a repeat activation after the daily item has been completed.
- Returning to a completed daily challenge shows the correct answer and explanation while the choices remain disabled.


RELEASE v8 — BUG-HUNT FIXES
- The service-worker cache is versioned to v8 to ensure browsers fetch the corrected application files.
- Daily reward is now guarded in the click handler against duplicate same-day activation, and completed daily questions show the answer and explanation.
- A regression test suite covers the complete question and quiz collections, daily reward idempotency, invalid storage fallback, safe profile rendering, score reset, full erase, and theme switching.
- Publication still requires testing on the actual HTTPS host; automated checks cannot guarantee every device/browser behaviour.

QA REPORT
- See QA-TEST-REPORT.txt for automated checks passed and test coverage limitations. A bug-free guarantee is not possible; complete live-site/browser verification after deployment.


RELEASE v9 — FULL ZIP AUDIT
- Fixed navigation for Settings & data and the BrainMetric logo.
- Fixed generated fraction questions to show exact rational answers rather than floating-point approximations.
- Improved grammar in generated syllogisms and replaced one duplicate chess question.
- Updated the service-worker cache to brainmetric-pwa-secure-v9-audited.
- See QA-TEST-REPORT.txt for the bug-fix list, check results and deployment-only verification items.
- Browser interaction checks passed in an in-memory Chromium document; verify installation, offline reload and actual response headers on the public HTTPS host after deployment.
