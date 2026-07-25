import Avatar from '../Avatar/Avatar.jsx';
import Tag from '../Tag/Tag.jsx';
import { splitCategories, truncate } from '../../utils/stringUtils.js';
import { categoryVariant, genderVariant } from './tagVariant.js';
import styles from './PilgrimTable.module.css';

export default function TableRow({ record }) {
  const categories = splitCategories(record.category);

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <span className={styles.campId}>{record.campId === 'none' ? 'none' : record.campId}</span>
      </td>

      <td className={styles.cell}>
        <div className={styles.nameCell}>
          <Avatar fullName={record.fullName} />
          <div className={styles.nameText}>
            <span className={styles.fullName}>{record.fullName === 'none' ? 'none' : record.fullName}</span>
            <span className={styles.schoolName}>{record.schoolName === 'none' ? 'none' : record.schoolName}</span>
          </div>
        </div>
      </td>

      <td className={styles.cell}>
        {record.gender !== 'none' ? <Tag label={record.gender} variant={genderVariant(record.gender)} /> : 'none'}
      </td>

      <td className={styles.cell}>
        <div className={styles.tagGroup}>
          {categories.length > 0
            ? categories.map((cat) => <Tag key={cat} label={cat} variant={categoryVariant(cat)} />)
            : 'none'}
        </div>
      </td>

      <td className={styles.cell}>
        <span className={styles.groupBadge}>{record.pilgrimGroup === 'none' ? 'none' : record.pilgrimGroup}</span>
      </td>

      <td className={styles.cell}>
        <span className={styles.phone}>{record.phone === 'none' ? 'none' : record.phone}</span>
      </td>

      <td className={styles.cell}>
        <span className={styles.info} title={record.additionalInfo === 'none' ? undefined : record.additionalInfo}>
          {record.additionalInfo === 'none' ? 'none' : truncate(record.additionalInfo, 48)}
        </span>
      </td>

      <td className={styles.cell}>
        <span className={styles.groupBadge}>{record.community === 'none' ? 'none' : record.community}</span>
      </td>
    </tr>
  );
}
