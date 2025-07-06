// Example API utility (to be replaced with real backend endpoints)

export async function fetchAvailableSlots(date) {
  // Example: fetch(`/api/slots?date=${date}`)
  // Return array of slots
  return ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"];
}

export async function bookDemo(formData) {
  // Example: fetch('/api/book-demo', { method: 'POST', body: JSON.stringify(formData) })
  // Return { success: true, ... }
  return { success: true };
}