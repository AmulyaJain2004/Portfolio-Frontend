import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = useCallback(() => setReloadFlag(f => f + 1), []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => { if (isMounted) setData(data); })
      .catch(err => { if (isMounted) setError(err.message || 'Failed to fetch'); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [url, options, reloadFlag]);

  return { data, loading, error, refetch };
} 