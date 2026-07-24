import { TAG_VARIANTS, pickFromPalette } from '../../utils/colorUtils.js';

/** Category tags rotate through the full pastel palette, keyed by their text. */
export function categoryVariant(label) {
  return pickFromPalette(label, TAG_VARIANTS);
}

/** Gender gets its own small, explicit mapping with a safe fallback. */
export function genderVariant(gender) {
  const normalized = (gender || '').toLowerCase();
  if (normalized === 'male') return 'indigo';
  if (normalized === 'female') return 'coral';
  return 'neutral';
}
