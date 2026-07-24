/** Simple deterministic string hash (djb2-ish), used to pick stable colors. */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export const AVATAR_COLORS = [
  '#0f7a4e',
  '#147a5e',
  '#1f9a6c',
  '#2fa876',
  '#3e8f6c',
  '#0b5c3a',
  '#2b8f6f',
];

export const TAG_VARIANTS = ['mint', 'teal', 'amber', 'coral', 'indigo', 'lilac'];

/** Picks a stable item from a palette based on the input string. */
export function pickFromPalette(input, palette) {
  const safe = input || 'default';
  if (!palette.length) return null;
  return palette[hashString(safe) % palette.length];
}
