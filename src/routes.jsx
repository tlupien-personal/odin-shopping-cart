import App from "./components/App";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound/NotFound";

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
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
    errorElement: <NotFound />,
  },
];

export default routes;
