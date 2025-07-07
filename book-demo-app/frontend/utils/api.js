export async function fetchAvailableSlots(date) {
  return ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"];
}

export async function bookDemo(formData) {
  return { success: true };
}