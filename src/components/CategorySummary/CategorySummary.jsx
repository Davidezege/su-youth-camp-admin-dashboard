import styles from './CategorySummary.module.css';

export default function CategorySummary({ items }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.summary} aria-label="Camp category summary">
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Category summary</h2>
        <p className={styles.description}>Totals by camp category, including gender breakdowns.</p>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.category} className={styles.card}>
            <div className={styles.cardLabel}>{item.category}</div>
            <div className={styles.cardTotal}>{item.total}</div>
            <div className={styles.footer}>
              <div className={styles.footerItem}>
                <span className={styles.footerLabel}>Male</span>
                <span className={styles.footerValue}>{item.male}</span>
              </div>
              <div className={styles.footerItem}>
                <span className={styles.footerLabel}>Female</span>
                <span className={styles.footerValue}>{item.female}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
