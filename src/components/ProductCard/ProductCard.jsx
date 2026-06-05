import { useState } from "react";
import { useOutletContext } from "react-router";
import type1Styles from "./ProductCardType1.module.css";
import type2Styles from "./ProductCardType2.module.css";

export default function ProductCard({ styleType, data, isInCart }) {
  let styles = type1Styles;
  if (styleType == 2) {
    styles = type2Styles;
  }
  const [quantity, setQuantity] = useState(data.quantity ?? 1);
  const [cart, setCart] = useOutletContext();

  const replaceCartEntry = (newQuantity) => {
    setCart((cart) => {
      return { ...cart, [data.id]: newQuantity };
    });
  };

  const increment = (e) => {
    e.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) {
      replaceCartEntry(newQuantity);
    }
  };

  const decrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (isInCart) {
        replaceCartEntry(newQuantity);
      }
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    setCart({ ...cart, [data.id]: (cart[data.id] ?? 0) + quantity });
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    const cartCopy = { ...cart };
    delete cartCopy[data.id];
    setCart(cartCopy);
  };

  return (
    <div className={styles.card}>
      <p className={styles.title}>{data.title}</p>
      <img src={data.image} />
      <p className={styles.price}>${data.price?.toFixed(2)}</p>
      <form className={styles.cartForm}>
        <div className={styles.formRow}>
          <label htmlFor="qty">Qty</label>
          <input
            id="qty"
            name="qty"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.ments}>
          <button
            className={styles.increment}
            type="button"
            onClick={increment}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </button>
          <button
            className={styles.decrement}
            type="button"
            onClick={decrement}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>minus</title>
              <path d="M19,13H5V11H19V13Z" />
            </svg>
          </button>
        </div>
        <button
          className={styles.commandBtn}
          type="button"
          onClick={isInCart ? removeFromCart : addToCart}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </button>
      </form>
      {isInCart && (
        <p className={styles.price}>${(data.price * quantity).toFixed(2)}</p>
      )}
    </div>
  );
}
