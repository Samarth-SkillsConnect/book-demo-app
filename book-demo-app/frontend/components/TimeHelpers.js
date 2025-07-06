// Converts "14:00:00" to "2:00 PM"
export function formatTime(timeStr) {
  const [h, m] = timeStr.split(":");
  const date = new Date();
  date.setHours(+h, +m, 0, 0);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Converts "14:00:00", "14:30:00" to "2:00 PM – 2:30 PM"
export function formatTimeRange(start, end) {
  return `${formatTime(start)} – ${formatTime(end)}`;
}