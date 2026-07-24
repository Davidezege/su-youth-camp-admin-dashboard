import { useCallback, useEffect, useState } from 'react';
import { fetchPilgrims } from '../services/pilgrimService.js';


export function usePilgrims() {
  const [pilgrims, setPilgrims] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    const controller = new AbortController();

    setStatus('loading');
    setError(null);

    fetchPilgrims({ signal: controller.signal })
      .then((data) => {
        setPilgrims(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Something went wrong while loading records.');
        setStatus('error');
      });

    return controller;
  }, []);

  useEffect(() => {
    const controller = load();
    return () => controller.abort();
  }, [load]);

  return { pilgrims, status, error, reload: load };
}
