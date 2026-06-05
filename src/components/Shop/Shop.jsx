import styles from "./Shop.module.css";
import ProductGrid from "../ProductGrid";
import useProductData from "../../hooks/useProductData";
import LoadingSpinner from "../LoadingSpinner";

export default function Shop() {
  const { products, isLoading, error } = useProductData();

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <div className={styles.error}>
        <p>There was an error.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.shop}>
        <h1>Shop</h1>
        <ProductGrid styleType={1} products={Object.values(products)} />
      </div>
    );
  }
}
