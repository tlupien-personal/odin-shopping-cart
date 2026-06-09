import styles from "./Cart.module.css";
import ProductGrid from "../ProductGrid";
import { useOutletContext } from "react-router";
import ProductDataWrapper from "../ProductDataWrapper/ProductDataWrapper";

export default function Cart() {
  const [cart, _] = useOutletContext();

  return (
    <ProductDataWrapper
      renderItem={(products) => {
        const cartProducts = [];
        for (const [productId, quantity] of Object.entries(cart)) {
          cartProducts.push({ ...products[productId], quantity });
        }

        return (
          <div className={styles.cart}>
            <h1>Cart {cartProducts.length === 0 && "(empty)"}</h1>
            {cartProducts.length > 0 && (
              <ProductGrid
                styleType={2}
                products={cartProducts}
                isInCart={true}
              />
            )}
          </div>
        );
      }}
    />
  );
}
