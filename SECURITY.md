# Security policy

## What the builder stores

Lampa Multilingual puts chosen language, optional TorrServer URL, and plugin policy inside a locally generated WGT. **These fields are not encrypted.** The builder does not ask for passwords, CUB credentials, API keys or other secrets. URLs with embedded username/password, query strings or fragments are rejected.

The build runs locally and `dist/` is Git-ignored. Do not publish personal WGTs, CI artifacts containing a personal configuration, or screenshots showing private URLs.

## Limitations

- Only the core **application assets** are packaged locally. Lampa uses external catalogue, metadata and online services at runtime. This is not an offline/privacy guarantee.
- Third-party plugins are off by default. Enabling them can run arbitrary JavaScript delivered by other parties. Only install code from trusted sources.
- A WGT is not an encrypted container. Treat included server addresses as disclosed to anyone with the file.
- Remote service and media-stream privacy depends on your own endpoints and upstream components.
- `HTTP` does not encrypt requests; use `HTTPS` when exposing servers beyond a trusted LAN.

## Responsible reporting

Open a GitHub issue with a sanitized reproducer containing no passwords, tokens, authenticated URLs or personal WGT files. If a private security-reporting channel is available on GitHub, use it for confidential details. Rotate compromised credentials promptly.

See the upstream [Lampa source](https://github.com/yumata/lampa-source) and preserved [GPL v2 license](LICENSE). Upstream package metadata and LICENSE currently disagree; we do not claim that this resolves that upstream licensing ambiguity.

## Local visual Builder

The GUI is served only on `127.0.0.1`, applies origin and one-time-process token checks to build requests, and invokes the existing CLI without a shell. No user settings or personal WGT uploads are sent to a cloud builder. Use this only on a trusted local computer; do not reverse-proxy the local service or expose it on the Internet. Any TorrServer address stored in the WGT is unencrypted, so never include credentials or access tokens in it.
