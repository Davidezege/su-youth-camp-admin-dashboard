export default function SortIcon({ direction }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4l4 5H8l4-5z"
        fill={direction === 'asc' ? 'var(--color-forest)' : 'var(--color-sage)'}
      />
      <path
        d="M12 20l-4-5h8l-4 5z"
        fill={direction === 'desc' ? 'var(--color-forest)' : 'var(--color-sage)'}
      />
    </svg>
  );
}
