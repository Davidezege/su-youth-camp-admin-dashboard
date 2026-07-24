/**
 * Every field coming from the backend is coerced to a String here.
 * This is the single place that guarantees "all data is String format",
 * so the rest of the app never has to worry about types.
 * Returns "none" if the value is empty or blank.
 */
export function toSafeString(value) {
  if (value === null || value === undefined) return 'none';
  const trimmed = String(value).trim();
  return trimmed === '' ? 'none' : trimmed;
}

/** Splits a comma-separated category string into a clean list of tags. */
export function splitCategories(category) {
  const safe = toSafeString(category);
  if (safe === 'none') return [];
  return safe
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
}

/** Produces up to 2 initials from a full name, safe against empty strings. */
export function getInitials(fullName) {
  const safe = toSafeString(fullName);
  if (safe === 'none') return '?';
  const parts = safe.split(/\s+/).filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
  return initials || '?';
}

/** Truncates long free-text fields (e.g. additionalInfo) for compact display. */
export function truncate(value, maxLength = 42) {
  const safe = toSafeString(value);
  if (safe.length <= maxLength) return safe;
  return `${safe.slice(0, maxLength - 1).trimEnd()}…`;
}
