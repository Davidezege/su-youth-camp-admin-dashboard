import styles from './StatusStates.module.css';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.stateBlock}>
      <div className={styles.centeredState}>
        <span className={styles.errorIcon}>!</span>
        <h3 className={styles.stateTitle}>Couldn't load records</h3>
        <p className={styles.stateText}>{message || 'The backend request failed. Please try again.'}</p>
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
