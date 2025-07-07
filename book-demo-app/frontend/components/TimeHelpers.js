// export function formatTime(timeStr) {
//   const [h, m] = timeStr.split(":");
//   const date = new Date(Date.UTC(2000, 0, 1, h, m, 0));
//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "Asia/Kolkata",
//   }) + " IST";
// }

// export function formatTimeRange(start, end) {
//   return `${formatTime(start)} – ${formatTime(end)}`;
// }


export function formatTime(timeStr) {
  // Convert "HH:mm" to 12-hour format (e.g., "09:00" -> "9:00 AM")
  const [h, m] = timeStr.split(":");
  const hour = Number(h);
  const minute = Number(m);
  const isPM = hour >= 12;
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minuteStr = minute.toString().padStart(2, "0");
  const ampm = isPM ? "PM" : "AM";
  return `${hour12}:${minuteStr} ${ampm}`;
}

export function formatTimeRange(start, end) {
  return `${formatTime(start)} – ${formatTime(end)}`;
}