import ProductCard from "../ProductCard";
import shopStyles from "./ProductGridShop.module.css";
import cartStyles from "./ProductGridCart.module.css";

export default function ProductGrid({ products, pageType }) {
  const productCards = products.map((p) => {
    return <ProductCard key={p.id} data={p} pageType={pageType} />;
  });

  if (pageType === "shop") {
    const styles = shopStyles;
    return <div className={styles.cardGrid}>{productCards}</div>;
  } else if (pageType === "cart") {
    const styles = cartStyles;
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

    const grandTotal = products
      .reduce((p, c) => p + c.price * c.quantity, 0)
      .toFixed(2);

    const totalDisplay = (
      <div className={styles.grandTotalDisplay}>
        <p className={styles.grandTotalLabel}>Grand Total</p>
        <p className={styles.grandTotalValue}>${grandTotal}</p>
      </div>
    );

    return (
      <div className={styles.cardGrid}>
        {cartHeader}
        {productCards}
        {totalDisplay}
      </div>
    );
  }
}
