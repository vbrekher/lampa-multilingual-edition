# Technical build notes — v0.1.0

**Source baseline:** fork of [yumata/lampa-source](https://github.com/yumata/lampa-source) 3.x, created from upstream commit `3c658ffb4047d62a605389a1039281288836d6b8` (2026-10-30). Do not silently mix binaries from public Lampa mirrors with this build.

## Build pipeline

1. Clone the source, install npm dependencies locally.
2. The shared CLI/GUI builder copies `src/`, `public/` and `index/` into an isolated temporary directory.
3. It patches only staged versions of `gulpfile.js`, `src/services/libs.js` and `src/core/manifest.js`: fixes early Gulp callback, loads packaged libraries, and resolves application assets from local paths.
4. It runs a **non-watching** Gulp `personal_tizen` job and validates key files.
5. It replaces the upstream remote `loader.js` in the staged Tizen index with `personal-config.js` and `app.min.js`.
6. It writes its own `config.xml` (app ID `L4mpaPers0.LampaPersonal`) and icon, packages ZIP-compatible WGT, runs `unzip -tq`.
7. It removes the temporary directory. Original source files remain untouched.

## Graphical local Builder

The `npm run builder` command serves the UI from `127.0.0.1` only and starts the same `personal/build.mjs` workflow as the CLI. API requests must originate from the local page and supply an in-process token. Input is normalized by `normalizeSettings`; subprocess arguments are passed without a shell. A WGT is never compiled on or uploaded to the public product website. Local builds produce `dist/Lampa-Multilingual.wgt` and a legacy output alias for older tools.

The generated WGT keeps app ID `L4mpaPers0.LampaPersonal` to support upgrades; only the displayed app title is rebranded. The public website is a static file under `docs/index.html`, usable through `npm run site:preview` or GitHub Pages (`main` + `/docs`).

## Safeguards and gaps

- URL input allows only HTTP/HTTPS without credentials, query strings or URL fragments.
- Personal build is self-contained for main app assets, but third-party metadata/provider calls **still happen**.
- Default disables remote configuration and CUB account integration, with third-party plugin use off.
- Gulp and manifest patch functions **fail closed** if the expected upstream code changes.
- The CLI builder's terminal language (`en`, `ru`, `nl`) is independent of the Lampa TV interface language; all 21 locales, including `nl`, are bundled.
- The WGT is unsigned until Apps2Samsung re-signs as appropriate.
- Unit packaging and multilingual documentation tests run before CI attempts a **real source build**. Neither is equivalent to testing the app on Samsung.
- Upstream source and dependencies may change; keep the pinned baseline and document upgrades.
- No on-device proof of install, menu, catalogue, AVPlay, codecs or remote control has yet been recorded.

## Legal and content boundaries

This fork does not ship movies, third-party streaming links, piracy plugins or a torrent server. The user's TorrServer is independent. Original Lampa is maintained by Yumata; this repo preserves upstream copyright/attribution. `LICENSE` is GPL v2 while upstream `package.json` says ISC: verify against rights holders before claiming a final redistributable product license.

The builder's successful terminal output is localized. If upstream Gulp compilation fails, raw diagnostics are written locally to `dist/build-error.log` (ignored by Git) and the terminal shows a localized error.
