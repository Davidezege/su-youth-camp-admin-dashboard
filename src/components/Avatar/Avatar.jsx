import { getInitials } from '../../utils/stringUtils.js';
import { AVATAR_COLORS, pickFromPalette } from '../../utils/colorUtils.js';
import styles from './Avatar.module.css';

export default function Avatar({ fullName }) {
  const initials = getInitials(fullName);
  const background = pickFromPalette(fullName, AVATAR_COLORS);

  return (
    <span className={styles.avatar} style={{ backgroundColor: background }} aria-hidden="true">
      {initials}
    </span>
  );
}
