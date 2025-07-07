
export function validateEmail(email) {

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return false;


  if (email.includes('..')) return false;

  const [local, domain] = email.split('@');
  if (!local || !domain) return false;

  
  if (
    domain.startsWith('.') || domain.endsWith('.') ||
    domain.startsWith('-') || domain.endsWith('-') ||
    !domain.includes('.') ||
    domain.length > 255
  ) return false;


  if (local.length > 64 || local.startsWith('.') || local.endsWith('.')) return false;


  if (domain.split('.').some(part => part.startsWith('-') || part.endsWith('-') || part === '')) return false;

  return true;
}

export function validatePhone(phone) {
  if (!/^\+\d{8,15}$/.test(phone)) return false;
  if (/[^+\d]/.test(phone)) return false;
  return true;
}

export function validateGuestEmails(emails) {
  if (!Array.isArray(emails)) return false;
  if (emails.length > 30) return false;
  const cleaned = emails.map(e => e.trim()).filter(e => e.length > 0);
  const lower = cleaned.map(e => e.toLowerCase());
  const hasDuplicates = new Set(lower).size !== lower.length;
  if (hasDuplicates) return false;
  return cleaned.every(validateEmail);
}

export function validatedescription(description) {
  if(description.length > 300) return false;
  return description;
}