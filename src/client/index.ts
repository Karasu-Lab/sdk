import { createAppAuthClient } from '@karasu-lab/utils/client';
import { hostConfigSchema, type HostConfig, type HostConfigInput } from '../config';

/**
 * The authentication and single sign-on client surface of the Karasu Lab
 * SDK. `createAppAuthClient` builds the better-auth client every app
 * signs in with — OAuth 2.0 provider, multi-session, passkey, and SSO
 * plugins wired in — on top of the better-auth family of libraries,
 * which consuming apps provide as peer dependencies.
 */
export { createAppAuthClient, type CreateAppAuthClientOptions } from '@karasu-lab/utils/client';

/** A configured SDK instance: the parsed hosts and the clients built from them. */
export interface SdkInstance {
  hosts: HostConfig;
  authClient: ReturnType<typeof createAppAuthClient>['authClient'];
  bridgeFirebaseSession: ReturnType<typeof createAppAuthClient>['bridgeFirebaseSession'];
}

/**
 * Creates an SDK instance from the host app's injected host
 * configuration. The hosts are parsed with the zod host schema, so an
 * instance always carries valid origins, and the auth client is built
 * against the injected `authApiUrl` — the SDK itself reads no
 * environment variables.
 */
export function createSdk(input: HostConfigInput): SdkInstance {
  const hosts = hostConfigSchema.parse(input);
  const { authClient, bridgeFirebaseSession } = createAppAuthClient({ baseURL: hosts.authApiUrl });
  return { hosts, authClient, bridgeFirebaseSession };
}
