import { useState, useEffect } from "react";

let productCache = [];

export default function useProductData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    if (productCache.length === 0) {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.status !== 200) {
          throw new Error(
            `Failed to fetch data with status code ${response.status}`,
          );
        }
        const data = await response.json();
        productCache = data;
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setProducts(productCache);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, isLoading, error };
}
