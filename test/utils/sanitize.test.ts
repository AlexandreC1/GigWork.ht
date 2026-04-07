import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeUrl } from '../../utils/sanitize';

describe('sanitizeText', () => {
  it('strips HTML tags', () => {
    expect(sanitizeText('<script>alert(1)</script>hi')).toBe('alert(1)hi');
  });
  it('handles null/undefined', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
  });
  it('trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
  });
});

describe('sanitizeUrl', () => {
  it('accepts https URLs', () => {
    expect(sanitizeUrl('https://example.com/a.png')).toBe('https://example.com/a.png');
  });
  it('rejects javascript: URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).not.toContain('javascript');
  });
  it('rejects data: URLs', () => {
    expect(sanitizeUrl('data:text/html,<script>')).not.toContain('data:');
  });
  it('returns fallback for empty', () => {
    expect(sanitizeUrl('')).toMatch(/^https?:\/\//);
  });
});
