import styles from './FilterDropdown.module.css';

export default function FilterDropdown({ options, value, onChange }) {
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
        <line x1="4" y1="6" x2="20" y2="6" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filter by category"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'All' ? 'All categories' : option}
          </option>
        ))}
      </select>
    </div>
  );
}
