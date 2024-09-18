import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import { UserProvider } from "./provider/UserProvider";
import ProtectedRoute from "./component/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
     element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
    // loader: () => fetch("https://ums-backend-beta.vercel.app/users"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
