import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  deps: any[] = [], // ✅ allow dynamic re-fetching
  autoFetch = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchFunction();
      setData(fetchedData);
      setError(null);
      return fetchedData;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);  

  return { data, loading, error, fetchData, reset };
};

export default useFetch;
