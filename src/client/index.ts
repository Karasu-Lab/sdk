/**
 * The authentication and single sign-on client surface of the Karasu Lab
 * SDK. `createAppAuthClient` builds the better-auth client every app
 * signs in with — OAuth 2.0 provider, multi-session, passkey, and SSO
 * plugins wired in — on top of the better-auth family of libraries,
 * which consuming apps provide as peer dependencies.
 */
export { createAppAuthClient, type CreateAppAuthClientOptions } from '@karasu-lab/utils/client';
