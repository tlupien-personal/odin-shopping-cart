import Navbar from "../Navbar";
import { Outlet } from "react-router";
import styles from "./App.module.css";
import { useState } from "react";

export default function App() {
  const [cart, setCart] = useState({});

  return (
    <div className={styles.app}>
      <Navbar cart={cart} />
      <Outlet context={[cart, setCart]} />
    </div>
  );
}
