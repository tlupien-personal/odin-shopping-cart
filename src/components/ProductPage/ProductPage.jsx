import useProductData from "../../hooks/useProductData";
import LoadingSpinner from "../LoadingSpinner";
import ErrorBox from "../ErrorBox";
import { useOutletContext } from "react-router";
import ProductGrid from "../ProductGrid";
import styles from "./ProductPage.module.css";

export default function ProductPage({ pageType }) {
  const { products, isLoading, error } = useProductData();
  const [cart, _] = useOutletContext();

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    if (pageType === "shop") {
      return (
        <div className={styles.shop}>
          <h1>Shop</h1>
          <ProductGrid pageType={pageType} products={Object.values(products)} />
        </div>
      );
    } else if (pageType === "cart") {
      const cartProducts = [];
      for (const [productId, quantity] of Object.entries(cart)) {
        cartProducts.push({ ...products[productId], quantity });
      }

      return (
        <div className={styles.cart}>
          <h1>Cart {cartProducts.length === 0 && "(empty)"}</h1>
          {cartProducts.length > 0 && (
            <ProductGrid products={cartProducts} pageType={pageType} />
          )}
        </div>
      );
    }
  }
}
