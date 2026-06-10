import styles from "./Home.module.css";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <svg
        className={styles.homeIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>home</title>
        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
      </svg>
      <p>
        Welcome to my{" "}
        <a href="https://www.theodinproject.com/">The Odin Project</a>
        {" - "}
        <a href="https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart">
          Shopping Cart Exercise
        </a>
        !
      </p>
      <p>
        The interesting parts of the project are in the{" "}
        <Link to="/shop">shop</Link> and <Link to="/cart">cart</Link> pages
        (well, and, of course, in{" "}
        <a href="https://github.com/tlupien-personal/odin-shopping-cart">
          the code itself
        </a>
        ) so head on over to one of those! Not much to see here...
      </p>
    </div>
  );
}
