import ProductCard from "../ProductCard";
import type1Styles from "./ProductGridType1.module.css";
import type2Styles from "./ProductGridType2.module.css";

export default function ProductGrid({ styleType, products, isInCart }) {
  let styles = type1Styles;
  if (styleType == 2) {
    styles = type2Styles;
  }

  const productCards = products.map((p) => {
    return (
      <ProductCard
        key={p.id}
        styleType={styleType}
        data={p}
        isInCart={isInCart}
      />
    );
  });

  const cartHeader = (
    <>
      <p className={styles.productTitle + " " + styles.tableLikeBracket}>
        Product
      </p>
      <p className={styles.tableLikeBracket}>Price (Each)</p>
      <p className={styles.tableLikeBracket}>Quantity</p>
      <p className={styles.tableLikeBracket}>Total Price</p>
    </>
  );

  const grandTotal = Object.values(products)
    .reduce((p, c) => p + c.price * c.quantity, 0)
    .toFixed(2);

  const totalDisplay = (
    <div className={styles.grandTotalDisplay}>
      {isInCart && <p className={styles.grandTotalLabel}>Grand Total</p>}
      {isInCart && <p className={styles.grandTotalValue}>${grandTotal}</p>}
    </div>
  );

  return (
    <div className={styles.cardGrid}>
      {isInCart && cartHeader}
      {productCards}
      {totalDisplay}
    </div>
  );
}
