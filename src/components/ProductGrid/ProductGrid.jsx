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
  return <div className={styles.cardGrid}>{productCards}</div>;
}
