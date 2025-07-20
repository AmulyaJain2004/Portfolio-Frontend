import { useState, useEffect, useCallback } from "react";
import config from "../config";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = useCallback(() => setReloadFlag((f) => f + 1), []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    // Prepend apiBaseUrl if url is relative
    const fullUrl = url.startsWith("http") ? url : `${config.apiBaseUrl}${url}`;
    fetch(fullUrl, options)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          // Ensure data is always an array or object, never null/undefined
          setData(data ?? null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Fetch error:", err);
          setError(err.message || "Failed to fetch");
          setData(null); // Reset data on error
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [url, options, reloadFlag]);

  return { data, loading, error, refetch };
}
