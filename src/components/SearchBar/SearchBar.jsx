import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by name, camp ID, phone or school…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search pilgrim records"
      />
    </div>
  );
}
