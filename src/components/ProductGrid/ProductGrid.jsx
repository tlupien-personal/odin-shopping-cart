import useProductData from "../../hooks/useProductData";
import LoadingSpinner from "../LoadingSpinner";
import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const { products, isLoading, error } = useProductData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>There was an error.</p>
      </div>
    );
  }

  return (
    <div className={styles.cardGrid}>
      {products.map((p) => (
        <ProductCard key={p.id} data={p} />
      ))}
    </div>
  );
}
