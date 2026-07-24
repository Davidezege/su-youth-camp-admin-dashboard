import styles from './Tag.module.css';

/**
 * variant: one of 'mint' | 'teal' | 'amber' | 'coral' | 'indigo' | 'lilac' | 'neutral'
 */
export default function Tag({ label, variant = 'neutral' }) {
  if (!label) return null;
  return <span className={`${styles.tag} ${styles[variant] || styles.neutral}`}>{label}</span>;
}
