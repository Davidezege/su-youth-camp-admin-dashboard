import { PILGRIM_FIELDS } from '../constants/tableColumns.js';
import { toSafeString } from '../utils/stringUtils.js';
import { MOCK_PILGRIMS } from './mockPilgrims.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const PILGRIMS_ENDPOINT = import.meta.env.VITE_PILGRIMS_ENDPOINT || '/pilgrims';


function resolveFieldValue(raw, field) {
  if (!raw || typeof raw !== 'object') return undefined;
  if (field in raw) return raw[field];

  const snakeCaseField = field.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  if (snakeCaseField in raw) return raw[snakeCaseField];

  const lowerCaseField = field.toLowerCase();
  if (lowerCaseField in raw) return raw[lowerCaseField];

  return undefined;
}

function normalizeRecord(raw, index) {
  const record = { id: toSafeString(raw?.campId) || `row-${index}` };
  PILGRIM_FIELDS.forEach((field) => {
    record[field] = toSafeString(resolveFieldValue(raw, field));
  });
  return record;
}

function normalizeList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeRecord);
}


export async function fetchPilgrims({ signal } = {}) {
  if (!API_BASE_URL) {
    return normalizeList(MOCK_PILGRIMS);
  }

  const response = await fetch(`${API_BASE_URL}${PILGRIMS_ENDPOINT}`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to load pilgrim records (status ${response.status})`);
  }

  const payload = await response.json();
  const list = Array.isArray(payload) ? payload : payload?.data || payload?.results || [];
  return normalizeList(list);
}
