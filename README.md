# Pilgrim Records

A React (Vite) admin table for managing pilgrim registrations, styled after a
customer-table reference UI in a green color theme.

## Table fields

Every record is expected to have these fields, and every field is normalized
to a **String** the moment it's fetched (see `src/services/pilgrimService.js`):

```
campId, fullName, category, gender, pilgrimGroup, schoolName, phone, additionalInfo
```

The table is driven entirely by `src/constants/tableColumns.js` and renders
however many rows the backend returns — 3 or 3,000, no code changes needed.

## Getting started

```bash
npm install
npm run dev
```

The app runs with local sample data (`src/services/mockPilgrims.js`) out of
the box, so it's fully functional with no backend configured.

## Connecting a real backend

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` to your backend's base URL, and (optionally)
   `VITE_PILGRIMS_ENDPOINT` if it's not `/pilgrims`.
3. Your endpoint should return either a plain JSON array, or an object with a
   `data` or `results` array, of objects shaped like the fields above. Any
   extra fields are ignored; missing fields are simply rendered as `""`.

No other code changes are required — `usePilgrims()` and `pilgrimService.js`
handle loading, error, and empty states automatically.

## Folder structure

```
src/
  components/     UI building blocks, one folder per component
  constants/       table column config (single source of truth for headers)
  hooks/           usePilgrims — data fetching + state
  services/        pilgrimService (backend calls) + mock data
  utils/           String coercion, initials, color hashing helpers
  App.jsx          page layout: search, filter, table, pagination
  main.jsx         React entry point
```

## Features

- Search across name, camp ID, phone, and school name
- Filter by category (options are derived from the data itself)
- Click any sortable column header to sort ascending/descending
- Pagination for large result sets
- Loading skeleton, error state with retry, and empty state
