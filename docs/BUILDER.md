# Local visual WGT Builder

**Lampa Multilingual** includes a graphical setup wizard that runs only on your computer. This is not a cloud service.

## Requirements

- macOS or Linux
- Node.js 22+ and npm
- zip and unzip
- Internet connection for installing npm dependencies (not required to upload build settings)

## Start

~~~bash
git clone https://github.com/vbrekher/lampa-personal-edition.git
cd lampa-personal-edition
npm ci
npm run builder
~~~

A browser opens at a randomized `http://127.0.0.1:<port>/` address. The process displays the exact address. Use **Ctrl+C** to stop it.

If the browser does not open automatically, copy the printed local URL. You can also run `node personal/builder-web.mjs --no-open` to avoid opening a browser.

## Wizard steps

1. **Welcome:** introduction, privacy and requirements.
2. **TV language:** select one of 21 localized UI names. Every WGT includes every language; this is only the initial default.
3. **TorrServer:** optionally enter the URL of a separate server. Empty is valid. Only HTTP(S) URLs without embedded credentials, query strings or fragments are accepted.
4. **Parser:** choose Jackett, Prowlarr or TorrServer.
5. **Plugins:** disabled by default. Allowing plugins does not auto-install them; the in-app consent screen still applies.
6. **Review:** check the exact configuration that will be passed to the compiler.
7. **Build:** watch real compiler output, cancel if needed, and download the locally produced WGT plus its SHA-256.

The GUI languages are **English, Russian and Dutch**. The on-TV app is independently localized into **21 languages**.

## Technical implementation

The GUI server is `personal/builder-web.mjs`, its static interface is under `personal/builder-ui/`. The actual compilation is performed by the existing `personal/build.mjs` and `personal/lib.mjs` modules. The GUI does **not** contain or maintain a second compiler.

The service binds only to `127.0.0.1`. Build requests require a same-origin `Origin` header and an unguessable per-process token. Input is checked by the existing normalization functions. Shell interpolation and arbitrary command execution through request parameters are not supported.

The output is `dist/Lampa-Multilingual.wgt`. A legacy-named copy `dist/Lampa-Personal-Edition.wgt` is also created for existing scripts and tests. The Tizen application identity remains `L4mpaPers0.LampaPersonal` for installation continuity, but the visible application title is **Lampa Multilingual**.

The output is a locally compiled **unsigned** WGT. Installing on the TV may require signing or re-signing using [Apps2Samsung](https://github.com/Apps2Samsung/Apps2Samsung) or Samsung's tools.

## CLI alternative

~~~bash
npm run build:multilingual -- --language nl --plugins off
npm run build:personal -- --language nl --plugins off
~~~

Both commands invoke the same build engine. The second is a legacy alias retained for compatibility.

## Static product website

The public marketing page lives in `docs/index.html` with `docs/assets/`. Preview it locally:

~~~bash
npm run site:preview
~~~

The product page's interactive Builder example **does not compile anything**; it links users to the local Builder. To publish without GitHub Actions, enable GitHub Pages from branch **main**, folder **/docs**, in repository settings (if permitted by your account).

## Verification

~~~bash
npm ci
npm run test:personal
npm run i18n:strict
npm run i18n:source-check
npm test -- --run
npm audit --audit-level=low
npm run build:multilingual -- --language en --plugins off
unzip -tq dist/Lampa-Multilingual.wgt
~~~

Open the GUI, try a language change and build, then check the downloaded file. No physical TV certification is implied by these local checks.

If a build fails, inspect the redacted GUI log and `dist/build-error.log`. Do not publish passwords, personal server addresses, configured personal WGTs or signing certificates in reports.

## Community

The original Lampa code, design and player architecture remain the foundation of this project. Thank you to **Yumata and the original Lampa contributors**. See [Contributing](../CONTRIBUTING.md) for translation and bug-fix pull requests.