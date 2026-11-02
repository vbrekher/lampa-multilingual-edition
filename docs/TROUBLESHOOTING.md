# Troubleshooting

## Build asks for a normal terminal

Use `npm run builder` for the local visual Builder, or run `npm run build:multilingual` in Terminal on your Mac or Linux computer. The legacy `npm run build:personal` command is still available. For automated builds, pass explicit flags:

~~~bash
npm run build:multilingual -- --language en --plugins off
~~~

## "node" or "npm" is not found

Install Node.js 22+ from [nodejs.org](https://nodejs.org/).

## "zip" / "unzip" not found

Install the standard operating-system packages for those commands.

## "Upstream ... changed"

The personal adapter checks the original Lampa 3.x source structure. If upstream changed the loader, manifest, or Gulp build, the adapter intentionally stops rather than producing a potentially broken WGT. Open a pull request with the upstream commit SHA and a reproduction (Issues may be disabled). Don't bypass these checks blindly.

## "Missing app.min.js" or another asset

The source build did not complete. Run `npm ci`, then repeat the build and inspect the first Gulp error. The builder will not package an incomplete WGT.

## Apps2Samsung cannot install the WGT

Confirm Developer Mode, correct computer IP, same network, TV restart, and Apps2Samsung certificate/re-signing setup. Refer to [Samsung Developer Mode](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-device.html).

## The catalogue works but playback does not

A catalogue listing is not evidence that the TV supports a particular codec or stream. Check the video source and the actual Samsung playback backend. If using TorrServer, verify it is running, reachable from the TV, and that the correct local address was entered.

## My TorrServer URL is ignored

Rebuild and reinstall, then inspect Lampa's server settings. Use the full URL, e.g. `http://192.168.1.25:8090`; don't use `localhost` unless the server is actually on the TV (usually it isn't). Samsung may restrict remote/public pages accessing private-network addresses; the Multilingual WGT uses a local app entry point to avoid the public loader, but connectivity still depends on firmware.

## I want Dutch UI

Dutch UI is fully integrated in Lampa Multilingual. Choose `Nederlands` in the first-launch menu or Settings → Interface → Language. In the local Builder select `nl` as the initial TV language.

## Can I attach my WGT to a pull request?

Please don't. It may reveal local server addresses and other preferences. Share sanitized steps, selected language, TV model/Tizen version, and a redacted error instead.
