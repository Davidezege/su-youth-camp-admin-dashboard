import styles from './Header.module.css';

export default function Header({ total }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Pilgrim Records</h1>
        <span className={styles.livePill}>
          <span className={styles.dot} />
          Live
        </span>
      </div>
      <p className={styles.subtitle}>
        {total} {total === 1 ? 'record' : 'records'} synced from the backend
      </p>
    </div>
  );
}
