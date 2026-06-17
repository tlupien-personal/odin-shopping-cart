import styles from "./ErrorBox.module.css";

export default function ErrorBox({ error }) {
  return (
    <div className={styles.errorBox}>
      <h1>There was an error</h1>
      <p>Specifically, this error:</p>
      <p className={styles.errorMessage}>
        {error?.message ||
          "An error so erroneous it doesn't even have a message O.o"}
      </p>
      <p>Please refresh the page or come back later.</p>
      <p>It'll work then, you know, probably...</p>
    </div>
  );
}
