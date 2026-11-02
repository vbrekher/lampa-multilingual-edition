# Contributing to Lampa Multilingual

Thank you for making Lampa more accessible. We especially appreciate the creators and contributors of the [original Lampa project](https://github.com/yumata/lampa-source); this independent community fork builds on their work.

**Small pull requests are welcome.** You do not have to be a full-time developer to correct a word, fix a line of documentation or report a Samsung-specific display issue.

## Translation improvement

1. Find your language in `src/lang/<language-code>.js`. The repository supports 21 TV-interface languages.
2. Identify the exact key you want to improve and inspect its meaning in `src/lang/en.js`, `src/lang/ru.js` and the actual TV screen.
3. Edit the translation without changing the **key**, placeholders (for example `{name}` or `{ip}`), technical URLs, HTML structure, product names or other literal identifiers.
4. If relevant, update the short terminology glossary in `i18n/glossaries/<language-code>.json` and any value-bound `i18n/reviewed-exceptions.json` entry.
5. Run the lightweight checks:

~~~bash
npm ci
npm run i18n:strict
npm run i18n:source-check
npm run test:personal
~~~

6. Open a pull request explaining the original wording, proposed wording and the screen/context that prompted the change. You may attach a *redacted* screenshot.

These checks verify structure and regression rules, but **native-language editorial feedback is still very valuable**. There is no need to collect all 21 language screenshots for a two-word wording correction unless your change also affects layout.

## Builder and product website

The local visual Builder lives in `personal/builder-web.mjs` and `personal/builder-ui/`. It reuses the existing compiler in `personal/build.mjs` and `personal/lib.mjs`. The static product site lives in `docs/index.html` and `docs/assets/` and can be previewed with `npm run site:preview`.

For Builder changes, run the package's unit suite and produce an actual local WGT. Do not implement a second compiler, upload personal configurations to a cloud service or remove default consent checks for third-party JavaScript.

## Samsung compatibility

Please share your Samsung **model**, **Tizen/firmware version**, installation/signing method, exact reproduction steps and a privacy-safe log. Clearly distinguish running Lampa in desktop Chromium/WebKit from **physical TV** or hardware AVPlay testing.

## Security and provenance

**Never commit** user-specific WGTs, passwords, access tokens, signing certificates, authenticated TorrServer URLs, private network addresses, copyrighted media or unauthorized third-party plugin bundles.

Retain the original Lampa attribution and licensing notices. Do not advertise the community fork as an official Lampa, Samsung or Apps2Samsung release.

## Quick commands

~~~bash
npm ci
npm run test:personal
npm run i18n:strict
npm run i18n:source-check
npm test -- --run
npm run build:multilingual -- --language en --plugins off
unzip -tq dist/Lampa-Multilingual.wgt
~~~

The legacy `npm run build:personal` command is retained for compatibility.