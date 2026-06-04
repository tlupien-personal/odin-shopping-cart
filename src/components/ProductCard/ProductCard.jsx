import styles from "./ProductCard.module.css";

export default function ProductCard({ data }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{data.title}</p>
      <img src={data.image} />
      <p className={styles.price}>${data.price.toFixed(2)}</p>
      <p>Placeholder for Add to Cart stuff</p>
    </div>
  );
}
