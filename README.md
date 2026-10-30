# @karasu-lab/sdk

The Karasu Lab SDK for authentication and single sign-on. It gathers the
auth and SSO surface the apps share behind one interface:

- `@karasu-lab/sdk/client` — `createAppAuthClient`, the better-auth
  client factory (OAuth 2.0 provider, multi-session, passkey, and SSO
  plugins) that the auth and sso apps sign in through.
- `@karasu-lab/sdk/uri` — `buildUri` / `buildUriWithNext`, object-composed
  URI building for the sign-in and callback flows, with the destination
  carried in the unified `next` parameter.

The better-auth family (`better-auth`, `@better-auth/oauth-provider`,
`@better-auth/passkey`, `@better-auth/sso`) is declared as peer
dependencies: installing the SDK states exactly which libraries the
consuming app must provide, at the versions the platform runs on.

Published to GitHub Packages from Karasu-Lab/npm, like the other
`@karasu-lab` packages; in the hub workspace it resolves to this
repository's source.
