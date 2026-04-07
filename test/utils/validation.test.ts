import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateName,
  validatePrice,
  validateMoncashId,
} from '../../utils/validation';

describe('validateRequired', () => {
  it('returns error for empty', () => {
    expect(validateRequired('', 'Field')).toContain('required');
    expect(validateRequired('   ', 'Field')).toContain('required');
  });
  it('returns null for valid', () => {
    expect(validateRequired('hello', 'Field')).toBeNull();
  });
});

describe('validateName', () => {
  it('rejects HTML chars', () => {
    expect(validateName('<script>')).not.toBeNull();
  });
  it('rejects empty', () => {
    expect(validateName('')).not.toBeNull();
  });
  it('accepts normal name', () => {
    expect(validateName('Jean-Pierre')).toBeNull();
  });
});

describe('validatePrice', () => {
  it('rejects non-numeric', () => {
    expect(validatePrice('abc')).not.toBeNull();
  });
  it('rejects zero and negative', () => {
    expect(validatePrice('0')).not.toBeNull();
    expect(validatePrice('-5')).not.toBeNull();
  });
  it('accepts positive', () => {
    expect(validatePrice('50')).toBeNull();
  });
});

describe('validateMoncashId', () => {
  it('allows empty (optional)', () => {
    expect(validateMoncashId('')).toBeNull();
  });
  it('accepts valid formats', () => {
    expect(validateMoncashId('509-12-3456')).toBeNull();
  });
  it('rejects garbage', () => {
    expect(validateMoncashId('abc<script>')).not.toBeNull();
  });
});
