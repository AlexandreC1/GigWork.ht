// Lightweight defense-in-depth sanitization helpers.
// React auto-escapes JSX text nodes, but these helpers strip any HTML tags
// from user-generated content before it reaches render, and validate URLs
// to prevent javascript:/data: URI injection through img src attributes.

const HTML_TAG_RE = /<[^>]*>/g;
const FALLBACK_IMAGE = 'https://picsum.photos/seed/placeholder/400/300';

export function sanitizeText(input: string | undefined | null): string {
  if (input == null) return '';
  return String(input).replace(HTML_TAG_RE, '').trim();
}

export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return FALLBACK_IMAGE;
  const trimmed = String(url).trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return FALLBACK_IMAGE;
}
