import { useState } from "react";
import { useOutletContext } from "react-router";
import shopStyles from "./ProductCardShop.module.css";
import cartStyles from "./ProductCardCart.module.css";

export default function ProductCard({ data, pageType }) {
  const isInCart = pageType === "cart";
  let styles = shopStyles;
  if (isInCart) {
    styles = cartStyles;
  }

  const [quantity, setQuantity] = useState(data.quantity ?? 1);
  const [badInputMsg, setBadInputMsg] = useState(null);
  const [cart, setCart] = useOutletContext();

  const safeSetQuantity = (value) => {
    setQuantity(value);
    if (!(Number.isInteger(+value) && +value > 0)) {
      setBadInputMsg("Qty. must be a positive whole number");
    } else {
      setBadInputMsg(null);
      if (isInCart) {
        replaceCartEntry(+value);
      }
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    safeSetQuantity(value);
  };

  const replaceCartEntry = (newQuantity) => {
    setCart({ ...cart, [data.id]: newQuantity });
  };

  const increment = (e) => {
    e.preventDefault();
    const newQuantity = +quantity + 1;
    safeSetQuantity(newQuantity);
  };

  const decrement = (e) => {
    e.preventDefault();
    if (+quantity > 1) {
      const newQuantity = +quantity - 1;
      safeSetQuantity(newQuantity);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    setCart({ ...cart, [data.id]: (cart[data.id] ?? 0) + +quantity });
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    const cartCopy = { ...cart };
    delete cartCopy[data.id];
    setCart(cartCopy);
  };

  const killButton = !isInCart && badInputMsg;

  return (
    <div className={styles.card}>
      <p className={styles.title}>{data.title}</p>
      <img src={data.image} alt="a fake product image" />
      <p className={styles.price}>${data.price?.toFixed(2)}</p>
      <form
        className={styles.cartForm}
        onSubmit={isInCart ? removeFromCart : addToCart}
      >
        <div className={styles.formRow}>
          <label htmlFor="qty">Qty</label>
          <input
            id="qty"
            name="qty"
            type="number"
            value={quantity}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
        </div>
        <div className={styles.ments}>
          <button
            aria-label="increment"
            className={`hoverGrow ${styles.increment}`}
            type="button"
            onClick={increment}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </button>
          <button
            aria-label="decrement"
            className={`hoverGrow ${styles.decrement}`}
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
          aria-label="command"
          className={`${!killButton && "hoverGrow"} ${styles.commandBtn}`}
          type="submit"
          disabled={killButton}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </button>
        {badInputMsg && (
          <div className={styles.qtyErr} role="alert">
            {badInputMsg}
          </div>
        )}
      </form>
      {isInCart && (
        <p className={styles.price}>
          ${(data.price * Math.max(Math.floor(quantity), 1)).toFixed(2)}
        </p>
      )}
    </div>
  );
}
