import styles from './StatusStates.module.css';

export default function EmptyState({ hasFilters }) {
  return (
    <div className={styles.stateBlock}>
      <div className={styles.centeredState}>
        <span className={styles.emptyIcon}>◎</span>
        <h3 className={styles.stateTitle}>
          {hasFilters ? 'No matching records' : 'No records yet'}
        </h3>
        <p className={styles.stateText}>
          {hasFilters
            ? 'Try a different search term or category filter.'
            : 'Once the backend returns pilgrim records, they will appear here.'}
        </p>
      </div>
    </div>
  );
}
