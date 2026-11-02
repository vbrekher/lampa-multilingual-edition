# Changelog

## Unreleased — Lampa Multilingual product experience

- Rebranded the public-facing product, Samsung widget title and primary package filename to **Lampa Multilingual** while retaining the old Tizen application ID and legacy CLI/output path for installed-user compatibility.
- Rebuilt the GitHub README around 21 UI languages, Arabic/Urdu/Hebrew RTL, actual product differences, honest hardware limitations, a clear quick start and prominent gratitude to Yumata/the original Lampa team.
- Added a complete static landing page under `docs/index.html`, ready for GitHub Pages `main:/docs` without GitHub Actions.
- Created a responsive, three-language **local visual Builder** with language picker, optional TorrServer URL, parser/plugin controls, configuration review, real WGT compilation progress, cancellation, and download with SHA-256.
- Implemented a loopback-only Builder API with same-origin token checks, no arbitrary shell commands or external personal WGT uploads.
- Updated RU/NL/EN getting-started guides, security, contributions and local product-experience tests.
- Physical Samsung installation/playback and native-speaker editorial certification remain separate external acceptance checks.

## Unreleased — language consistency

- Localized builder prompts, help, warnings and validation errors into English, Russian and Dutch.
- Separated terminal setup language (`--builder-language`) from the on-TV language (`--language`).
- Updated all three entry-point guides to show prompts in their own language.
- Added localization regression tests and a documentation-language audit.

## v0.1.0 — initial developer preview

- Added local Mac/Linux personal builder for Samsung Tizen WGT.
- Introduced user-selected language, optional TorrServer URL, and opt-in plugins.
- Compiles upstream Lampa 3.x assets in a temporary directory and strips the public app loader from the staged package.
- Added separate Tizen app ID, branded icon and visual GitHub documentation.
- Added eleven source/packaging tests and CI that compiles a credential-free generic smoke WGT, verifies its ZIP and discards the result.
- Added English, Russian and Dutch installation guides and security notes.

**Not certified:** physical Samsung install/playback, codec support and TorrServer live connectivity remain unverified. No personalized WGT binary is published.
