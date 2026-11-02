## Summary

What is changing and why?

## Area

- [ ] Translation / terminology
- [ ] UI / visual Builder / product site
- [ ] Packaging / core code / Tizen runtime
- [ ] Documentation only

For translations, include language code, dictionary key, old/new wording and UI context. Run the strict i18n and source checks. Small wording corrections do not require manually re-running every screenshot for all locales.

## Verification

- [ ] `npm run i18n:strict` passed (if localization changed)
- [ ] `npm run i18n:source-check` passed (if sources changed)

- [ ] `npm run test:personal` passed
- [ ] Real build smoke with `npm run build:multilingual -- --language en --plugins off`
- [ ] Tested on a Samsung Tizen device (model/version listed below)
- [ ] No real TV test (explain below)

TV model / Tizen version (if used):

## Security and upstream attribution

- [ ] No personal WGT, authenticated URL, password, token or certificate uploaded
- [ ] Original Lampa license and copyright notices preserved
- [ ] No copyrighted video files or unauthorized third-party streams added
