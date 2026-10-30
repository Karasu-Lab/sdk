import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

/** The signed-in user, read from the verified session token's claims. */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

/**
 * The current session as the SDK reports it: who is signed in and when
 * the token that proved it expires.
 */
export interface SessionInfo {
  user: SessionUser;
  expiresAt: Date;
}

/** The claims the auth server's token endpoint puts in its session tokens. */
interface SessionTokenClaims extends JWTPayload {
  id?: string;
  email?: string;
  name?: string;
  image?: string | null;
}

/**
 * Creates the session reader for one auth API origin. Reading the
 * session is a JWT exchange, not a session-endpoint round trip per app:
 *
 * 1. `GET /api/auth/token` exchanges the caller's session cookie for a
 *    short-lived JWT signed by the auth server.
 * 2. The token is verified locally against the server's JWKS
 *    (`/api/auth/jwks`), which the remote key set fetches once and
 *    caches — so a read costs the token request plus, amortized, the
 *    key request: about two requests, and no session lookup reaches
 *    the database.
 *
 * Returns null when there is no session to exchange or the token does
 * not verify.
 */
export function createSessionReader(authApiUrl: string): () => Promise<SessionInfo | null> {
  const base = authApiUrl.replace(/\/+$/, '');
  const jwks = createRemoteJWKSet(new URL(`${base}/api/auth/jwks`));

  return async function getSession(): Promise<SessionInfo | null> {
    let token: string | undefined;
    try {
      const response = await fetch(`${base}/api/auth/token`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return null;
      token = ((await response.json()) as { token?: string }).token;
    } catch {
      return null;
    }
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, jwks);
      const claims = payload as SessionTokenClaims;
      const id = typeof claims.sub === 'string' && claims.sub ? claims.sub : claims.id;
      if (!id || !claims.email) return null;
      return {
        user: {
          id,
          email: claims.email,
          name: claims.name ?? null,
          image: claims.image ?? null,
        },
        expiresAt: new Date((claims.exp ?? 0) * 1000),
      };
    } catch {
      return null;
    }
  };
}
