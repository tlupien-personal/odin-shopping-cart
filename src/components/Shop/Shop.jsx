import styles from "./Shop.module.css";
import ProductGrid from "../ProductGrid";
import ProductDataWrapper from "../ProductDataWrapper/ProductDataWrapper";

export default function Shop() {
  return (
    <ProductDataWrapper
      renderItem={(products) => {
        return (
          <div className={styles.shop}>
            <h1>Shop</h1>
            <ProductGrid
              styleType={1}
              products={Object.values(products)}
              isInCart={false}
            />
          </div>
        );
      }}
    />
  );
}
