export function getDeadlineTimestamp(deadline) {
  if (!deadline) return null;
  const trimmed = String(deadline).trim();
  if (!trimmed) return null;
  const hasTime = trimmed.includes("T");
  const isoCandidate = hasTime ? trimmed : `${trimmed}T23:59:59`;
  const value = new Date(isoCandidate).getTime();
  return Number.isNaN(value) ? null : value;
}

export function formatDeadline(deadline, locale = "zh-CN") {
  const timestamp = getDeadlineTimestamp(deadline);
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
