/**
 * URI construction for the sign-in and callback flows. Queries are
 * composed as objects, and the destination a flow continues to is
 * carried in the unified `next` parameter.
 */
export { buildUri, buildUriWithNext, type UriQuery } from '@karasu-lab/utils/uri';
