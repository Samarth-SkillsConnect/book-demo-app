// export function formatTime(timeStr) {
//   const [h, m] = timeStr.split(":");
//   // Create a date with fixed values and use Asia/Kolkata timezone
//   const date = new Date(Date.UTC(2000, 0, 1, h, m, 0));
//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "Asia/Kolkata",
//   }) + " IST";
// }

// // Converts "14:00:00", "14:30:00" to "2:00 PM IST – 2:30 PM IST"
// export function formatTimeRange(start, end) {
//   return `${formatTime(start)} – ${formatTime(end)}`;
// }


export function formatTime(timeStr) {
  const [h, m] = timeStr.split(":");
  const date = new Date(Date.UTC(2000, 0, 1, h, m, 0));
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }) + " IST";
}

export function formatTimeRange(start, end) {
  return `${formatTime(start)} – ${formatTime(end)}`;
}