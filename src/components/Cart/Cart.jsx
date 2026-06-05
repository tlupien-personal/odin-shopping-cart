import styles from "./Cart.module.css";
import ProductGrid from "../ProductGrid";
import useProductData from "../../hooks/useProductData";
import LoadingSpinner from "../LoadingSpinner";
import { useOutletContext } from "react-router";

export default function Cart() {
  const { products, isLoading, error } = useProductData();
  const [cart, setCart] = useOutletContext();

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <div className={styles.error}>
        <p>There was an error.</p>
      </div>
    );
  } else {
    const cartProducts = [];
    for (const [productId, quantity] of Object.entries(cart)) {
      cartProducts.push({ ...products[productId], quantity });
    }

    return (
      <div className={styles.cart}>
        <h1>Cart</h1>
        <ProductGrid styleType={2} products={cartProducts} />
      </div>
    );
  }
}
