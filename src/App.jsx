import { useMemo, useState } from 'react';
import Header from './components/Header/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import FilterDropdown from './components/FilterDropdown/FilterDropdown.jsx';
import IconButton from './components/IconButton/IconButton.jsx';
import PilgrimTable from './components/PilgrimTable/PilgrimTable.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import LoadingState from './components/StatusStates/LoadingState.jsx';
import ErrorState from './components/StatusStates/ErrorState.jsx';
import EmptyState from './components/StatusStates/EmptyState.jsx';
import { usePilgrims } from './hooks/usePilgrims.js';
import { SEARCHABLE_FIELDS } from './constants/tableColumns.js';
import { splitCategories, toSafeString } from './utils/stringUtils.js';
import './App.css';

const ROWS_PER_PAGE = 8;

export default function App() {
  const { pilgrims, status, error, reload } = usePilgrims();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  const [page, setPage] = useState(1);

  // Category options are derived dynamically from whatever data arrives —
  // no hardcoded list, so it works no matter what the backend sends.
  const categoryOptions = useMemo(() => {
    const set = new Set();
    pilgrims.forEach((record) => splitCategories(record.category).forEach((cat) => set.add(cat)));
    return ['All', ...Array.from(set).sort()];
  }, [pilgrims]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return pilgrims.filter((record) => {
      const matchesSearch =
        !term ||
        SEARCHABLE_FIELDS.some((field) => toSafeString(record[field]).toLowerCase().includes(term));
      const matchesCategory =
        categoryFilter === 'All' || splitCategories(record.category).includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [pilgrims, searchTerm, categoryFilter]);

  const sorted = useMemo(() => {
    const { key, direction } = sortConfig;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const valueA = toSafeString(a[key]).toLowerCase();
      const valueB = toSafeString(b[key]).toLowerCase();
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleCategoryChange(value) {
    setCategoryFilter(value);
    setPage(1);
  }

  const hasActiveFilters = Boolean(searchTerm) || categoryFilter !== 'All';

  return (
    <div className="page">
      <div className="card">
        <div className="cardTop">
          <Header total={pilgrims.length} />
          <IconButton label="Refresh records" onClick={reload} spinning={status === 'loading'} />
        </div>

        <div className="toolbar">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <FilterDropdown options={categoryOptions} value={categoryFilter} onChange={handleCategoryChange} />
        </div>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState message={error} onRetry={reload} />}
        {status === 'success' && sorted.length === 0 && <EmptyState hasFilters={hasActiveFilters} />}
        {status === 'success' && sorted.length > 0 && (
          <>
            <PilgrimTable rows={paginated} sortConfig={sortConfig} onSort={handleSort} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              totalRows={sorted.length}
              rowsPerPage={ROWS_PER_PAGE}
            />
          </>
        )}
      </div>
    </div>
  );
}
