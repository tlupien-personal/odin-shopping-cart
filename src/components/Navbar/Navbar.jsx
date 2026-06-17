import { Link } from "react-router";
import styles from "./Navbar.module.css";
import CartIcon from "../CartIcon/CartIcon";

export default function Navbar({ cart }) {
  return (
    <div className={styles.navbar}>
      <Link className="hoverGrow" to="/">
        Home
      </Link>
      <Link className="hoverGrow" to="/shop">
        Shop
      </Link>
      <CartIcon cart={cart} />
    </div>
  );
}
