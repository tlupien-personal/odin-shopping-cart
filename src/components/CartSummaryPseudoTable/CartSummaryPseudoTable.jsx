import { useOutletContext } from "react-router";
import { CartRowCard } from "../CartRowCard";
import styles from "./CartSummaryPseudoTable.module.css";
import useProductData from "../../hooks/useProductData";

export default function CartSummaryPseudoTable() {
  const [cart, setCart] = useOutletContext();
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
    <div className={styles.cartTable}>
      {Object.entries(cart).map(([k, v]) => (
        <CartRowCard key={k} data={products[k]} quantity={v} />
      ))}
    </div>
  );
}
