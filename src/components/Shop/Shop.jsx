import styles from "./Shop.module.css";
import ProductGrid from "../ProductGrid";

export default function Shop() {
  return (
    <div className={styles.shop}>
      <h1>Shop</h1>
      <ProductGrid />
    </div>
  );
}
