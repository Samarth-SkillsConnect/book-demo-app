export function formatTime(timeStr) {
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