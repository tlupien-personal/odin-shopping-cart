import Navbar from "../Navbar";
import { Outlet } from "react-router";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  );
}
