import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange, totalRows, rowsPerPage }) {
  const start = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className={styles.wrapper}>
      <span className={styles.summary}>
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{totalRows}</strong>
      </span>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className={styles.pageIndicator}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className={styles.navButton}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
