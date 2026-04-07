// Shared form validation helpers. Each returns an error message string
// or null when the value is valid.

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
}

export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (!value || value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
}

export function validateName(value: string): string | null {
  const required = validateRequired(value, 'Name');
  if (required) return required;
  if (value.trim().length > 60) return 'Name must be 60 characters or fewer';
  if (/[<>]/.test(value)) return 'Name contains invalid characters';
  return null;
}

export function validatePrice(value: string): string | null {
  if (value == null || value === '') return 'Price is required';
  const n = Number(value);
  if (Number.isNaN(n)) return 'Price must be a number';
  if (n <= 0) return 'Price must be greater than 0';
  if (n > 1_000_000) return 'Price is too high';
  return null;
}

export function validateMoncashId(value: string): string | null {
  if (!value) return null; // optional
  // Loose Haitian phone-number pattern: 509-XX-XXXX or 8-10 digits
  if (!/^[0-9\-+\s]{6,20}$/.test(value)) return 'Invalid MonCash ID format';
  return null;
}
