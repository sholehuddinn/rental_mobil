import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/navbar.jsx";
import Register from "../pages/RegisterAdminPage.jsx";
import Login from "../pages/LoginAdminPage.jsx";
import Order from "../pages/OrderAdminPage.jsx";
import OrderDetails from "../pages/OrderDetails.jsx";
import CreateOrder from "../pages/CreteOrder.jsx";
import Checkout from "../pages/Checkout.jsx"
import Pembayaran from "../pages/PaymentAdminPage.jsx";
import PembayaranDetails from "../pages/PaymentDetail.jsx";
import Laporan from "../pages/LaporanAdminPage.jsx";
import Cars from "../pages/Cars.jsx";
import Home from "../pages/home.jsx";
import User from "../pages/User.jsx";
import Co2 from "../pages/CO2.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/:id",
        element: <OrderDetails />,
      },
      {
        path: "checkout/:id/:userId",
        element: <Co2 />,
      },
      {
        path: "order/create",
        element: <CreateOrder />,
      },
      {
        path: "order/create/:id",
        element: <Checkout />,
      },
      {
        path: "laporan",
        element: <Laporan />,
      },
      {
        path: "pembayaran",
        element: <Pembayaran />,
      },
      {
        path: "pembayaran/:id",
        element: <PembayaranDetails />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "user",
        element: <User />,
      }
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  }
]);

export default route;
