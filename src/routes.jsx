import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ProductPage from "./components/ProductPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <ProductPage pageType="shop" />,
      },
      {
        path: "cart",
        element: <ProductPage pageType="cart" />,
      },
    ],
    errorElement: <NotFound />,
  },
];

export default routes;
