import { z } from 'zod';

/**
 * Host configuration for a Karasu Lab SDK instance: the origins of the
 * platform's apps that authentication and single sign-on flow through.
 * The schema is the contract — an instance is only created from hosts
 * that parse, so a misconfigured deployment fails at startup with the
 * offending field named instead of failing mid-sign-in.
 */
export const hostConfigSchema = z.object({
  /** Origin of the api-auth worker hosting the better-auth instance. Every sign-in call goes here. */
  authApiUrl: z.url(),
  /** Origin of the auth app hosting the sign-in pages. */
  authUrl: z.url().optional(),
  /** Origin of the accounts app, the default destination after sign-in. */
  accountsUrl: z.url().optional(),
  /** Origin of the root app. */
  appUrl: z.url().optional(),
});

export type HostConfig = z.infer<typeof hostConfigSchema>;

/**
 * What a host app hands to {@link createSdk}: the same fields as
 * {@link HostConfig}, but each may be undefined (as environment
 * variables are) — the schema parse inside `createSdk` rejects a
 * missing or malformed required host.
 */
export interface HostConfigInput {
  authApiUrl?: string | undefined;
  authUrl?: string | undefined;
  accountsUrl?: string | undefined;
  appUrl?: string | undefined;
}
