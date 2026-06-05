import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ styleType, products }) {
  return (
    <div className={styles.cardGrid}>
      {products.map((p) => (
        <ProductCard key={p.id} styleType={styleType} data={p} />
      ))}
    </div>
  );
}
