import styles from "./CategorySummary.module.css";

export default function CategorySummary({ items }) {
  if (items.length === 0) return null;

  const totalCampers = items.reduce((acc, item) => acc + item.total, 0);
  const totalMale = items.reduce((acc, item) => acc + item.male, 0);
  const totalFemale = items.reduce((acc, item) => acc + item.female, 0);

  return (
    <section className={styles.summary} aria-label="Camp category summary">
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Category summary</h2>
        <p className={styles.description}>
          Totals by camp category, including gender breakdowns.
        </p>
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalCard}>
          <div className={styles.totalHeader}>
            <span className={styles.totalLabel}>
              Total Campers (All Categories)
            </span>
            <span className={styles.categoryCount}>
              {items.length} {items.length === 1 ? "category" : "categories"}
            </span>
          </div>
          <div className={styles.totalContent}>
            <div className={styles.totalValue}>{totalCampers}</div>
            <div className={styles.totalFooter}>
              <div className={styles.footerItem}>
                <span
                  className={`${styles.footerLabel} ${styles.totalFooterLabel}`}
                >
                  Total Male
                </span>
                <span
                  className={`${styles.footerValue} ${styles.totalFooterValue}`}
                >
                  {totalMale}
                </span>
              </div>
              <div className={styles.footerItem}>
                <span
                  className={`${styles.footerLabel} ${styles.totalFooterLabel}`}
                >
                  Total Female
                </span>
                <span
                  className={`${styles.footerValue} ${styles.totalFooterValue}`}
                >
                  {totalFemale}
                </span>
              </div>
            </div>
          </div>
        </div>
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
