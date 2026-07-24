/**
 * Single source of truth for the table headers.
 * Add/remove/reorder a column here and the whole table updates —
 * nothing else in the app needs to change.
 */
export const TABLE_COLUMNS = [
  { key: 'campId', label: 'Camp ID', sortable: true, width: '110px' },
  { key: 'fullName', label: 'Full Name', sortable: true, width: '240px' },
  { key: 'gender', label: 'Gender', sortable: true, width: '110px' },
  { key: 'category', label: 'Category', sortable: false, width: '200px' },
  { key: 'pilgrimGroup', label: 'Pilgrim Group', sortable: true, width: '150px' },
  { key: 'phone', label: 'Phone', sortable: false, width: '160px' },
  { key: 'additionalInfo', label: 'Additional Info', sortable: false, width: 'auto' },
];

/** Fields that can be searched via the search bar. */
export const SEARCHABLE_FIELDS = ['fullName', 'campId', 'phone', 'schoolName'];

/** The full, expected shape of a record coming from the backend. */
export const PILGRIM_FIELDS = [
  'campId',
  'fullName',
  'category',
  'gender',
  'pilgrimGroup',
  'schoolName',
  'phone',
  'additionalInfo',
];
