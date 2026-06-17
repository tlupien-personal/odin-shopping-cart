import { useState, useEffect } from "react";

export default function useProductData(productCache) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      /*
      It is like this because in this learning exercise it is well
      known that the API returns 20 total products and they don't
      change, so the "cache" is either empty or full. I want to
      emphasize that this was done specifically because of these
      circumstances and is NOT how I would do it in a more realistic
      production environment. The point of this is to avoid unnecessary
      requests to the kindly provided free API, not to like, actually
      cache stuff well.
      */
      if (Object.keys(productCache).length === 0) {
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.status !== 200) {
          throw new Error(
            `Failed to fetch data with status code ${response.status}`,
          );
        }
        const data = await response.json();
        for (const p of data) {
          productCache[p.id] = p;
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setProducts({ ...productCache });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, isLoading, error };
}
