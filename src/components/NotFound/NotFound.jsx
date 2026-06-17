import { Link } from "react-router";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>That page doesn't exist.</h1>
      <h2>
        Click <Link to="/">here</Link> to get back to the app.
      </h2>
    </div>
  );
}
