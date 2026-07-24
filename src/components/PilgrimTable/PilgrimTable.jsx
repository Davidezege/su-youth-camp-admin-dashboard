import { TABLE_COLUMNS } from '../../constants/tableColumns.js';
import TableRow from './TableRow.jsx';
import SortIcon from './SortIcon.jsx';
import styles from './PilgrimTable.module.css';

export default function PilgrimTable({ rows, sortConfig, onSort }) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th key={column.key} style={{ width: column.width }} className={styles.headerCell}>
                {column.sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => onSort(column.key)}
                  >
                    {column.label}
                    <SortIcon direction={sortConfig.key === column.key ? sortConfig.direction : null} />
                  </button>
                ) : (
                  <span>{column.label}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((record) => (
            <TableRow key={record.id} record={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
