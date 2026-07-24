import styles from './StatusStates.module.css';

export default function LoadingState() {
  return (
    <div className={styles.stateBlock} role="status" aria-live="polite">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.skeletonRow}>
          <span className={styles.skeletonAvatar} />
          <span className={styles.skeletonLine} style={{ width: '30%' }} />
          <span className={styles.skeletonLine} style={{ width: '15%' }} />
          <span className={styles.skeletonLine} style={{ width: '20%' }} />
          <span className={styles.skeletonLine} style={{ width: '25%' }} />
        </div>
      ))}
      <span className={styles.visuallyHidden}>Loading pilgrim records…</span>
    </div>
  );
}
