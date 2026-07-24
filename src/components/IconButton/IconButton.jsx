import styles from './IconButton.module.css';

export default function IconButton({ label, onClick, spinning = false }) {
  return (
    <button type="button" className={styles.button} onClick={onClick} aria-label={label} title={label}>
      <svg
        className={spinning ? styles.spinning : ''}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
    </button>
  );
}
