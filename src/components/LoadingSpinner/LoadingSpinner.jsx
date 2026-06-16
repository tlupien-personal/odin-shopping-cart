import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <svg
      role="img"
      aria-labelledby="loading-title"
      className={styles.loading}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title id="loading-title">loading</title>
      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
    </svg>
  );
}
