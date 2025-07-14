
// Email validation with extra rules
export function validateEmail(email) {
  // Basic pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;

  // No consecutive dots
  if (email.includes('..')) return false;

  // Split local/domain
  const [local, domain] = email.split('@');
  if (!local || !domain) return false;

  // Domain checks
  if (
    domain.startsWith('.') || domain.endsWith('.') ||
    domain.startsWith('-') || domain.endsWith('-') ||
    !domain.includes('.') ||
    domain.length > 255
  ) return false;

  // Local part checks
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.split('.').some(part => part.startsWith('-') || part.endsWith('-') || part === '')) return false;

  // No disposable email domains (simple example, expand as needed)
  const disposableDomains = [
    "mailinator.com", "10minutemail.com", "guerrillamail.com", "yopmail.com"
  ];
  if (disposableDomains.some(d => domain.toLowerCase().endsWith(d))) return false;

  return true;
}

// Phone: must start with +, 10-15 digits, no spaces, not all same digit, no letters
export function validatePhone(phone) {
  if (!/^\+\d{10,15}$/.test(phone)) return false;
  if (/[^+\d]/.test(phone)) return false;
  // No repeated digits (e.g., +1111111111)
  const digits = phone.replace('+','');
  if (/^(\d)\1+$/.test(digits)) return false;
  return true;
}

// Guest emails: array, max 30, all valid, no duplicates, no empty, no main email (optionally pass mainEmail)
export function validateGuestEmails(emails, mainEmail = null) {
  if (!Array.isArray(emails)) return false;
  if (emails.length > 30) return false;
  const cleaned = emails.map(e => e.trim()).filter(e => e.length > 0);
  const lower = cleaned.map(e => e.toLowerCase());
  const hasDuplicates = new Set(lower).size !== lower.length;
  if (hasDuplicates) return false;
  if (mainEmail && lower.includes(mainEmail.toLowerCase())) return false;
  return cleaned.every(validateEmail);
}

// Name: 2-40 chars, only letters, spaces, hyphens, apostrophes
export function validateName(name) {
  if (typeof name !== 'string') return false;
  if (name.trim().length < 2 || name.trim().length > 40) return false;
  if (!/^[A-Za-z\s'-]+$/.test(name.trim())) return false;
  return true;
}

// Company: optional, but if present must be at least 2 chars, not only digits, no forbidden symbols
export function validateCompany(company) {
  if (!company || company.trim().length === 0) return true;
  if (company.trim().length < 2) return false;
  if (/^[0-9]+$/.test(company.trim())) return false;
  if (!/^[A-Za-z0-9\s'&()\-.,]+$/.test(company.trim())) return false;
  return true;
}

// Description: 10-500 chars, no only spaces
export function validateDescription(description) {
  if (typeof description !== 'string') return false;
  const desc = description.trim();
  if (desc.length < 10) return false;
  if (desc.length > 500) return false;
  return true;
}