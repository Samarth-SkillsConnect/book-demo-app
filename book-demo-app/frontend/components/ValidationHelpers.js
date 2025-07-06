// Improved Email validation: checks for common domain mistakes, double dots, and basic RFC compliance.
export function validateEmail(email) {
  // Basic format check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;

  // Reject consecutive dots in local or domain
  if (email.includes('..')) return false;

  // Split local and domain
  const [local, domain] = email.split('@');
  if (!local || !domain) return false;

  // Domain must contain at least one dot, and not start/end with dot/hyphen
  if (
    domain.startsWith('.') || domain.endsWith('.') ||
    domain.startsWith('-') || domain.endsWith('-') ||
    !domain.includes('.') ||
    domain.length > 255
  ) return false;

  // Local part should not start/end with dot or be longer than 64 chars
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.')) return false;

  // No special characters at start/end of domain labels
  if (domain.split('.').some(part => part.startsWith('-') || part.endsWith('-') || part === '')) return false;

  return true;
}

// Improved phone validation: checks for "+" at start, only digits after, appropriate length, no spaces/dashes, etc.
export function validatePhone(phone) {
  // E.164 standard allows up to 15 digits after the "+"
  if (!/^\+\d{8,15}$/.test(phone)) return false;
  // No spaces, no letters, no special characters except the leading +
  if (/[^+\d]/.test(phone)) return false;
  return true;
}

// Guest emails: unique, valid, no empty values, max 30
export function validateGuestEmails(emails) {
  if (!Array.isArray(emails)) return false;
  if (emails.length > 30) return false;
  // Trim and filter out empty emails
  const cleaned = emails.map(e => e.trim()).filter(e => e.length > 0);
  // Check for duplicates
  const lower = cleaned.map(e => e.toLowerCase());
  const hasDuplicates = new Set(lower).size !== lower.length;
  if (hasDuplicates) return false;
  // Validate each email
  return cleaned.every(validateEmail);
}