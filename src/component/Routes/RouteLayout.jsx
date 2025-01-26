import Dashboard from "../Layout/Dashboard.jsx";
import { Inbox } from "./Inbox";
import { Monday } from "./Monday.jsx";
import { Tuesday } from "./Tuesday.jsx";
import { Completed } from "./Completed";
import Project from "./Project";
import Display from "../Layout/Display";
import { Sunday } from "./Sunday.jsx";
import Login from "../../Auth/Login";
import ErrorPage from "./ErrorPage.jsx";
import { Navigate } from "react-router-dom";
// import { App } from "../../App";

const routes = [
  {
    path: "/",
    element: <Navigate to="/display/inbox" replace />,
  },
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "display",
        element: <Display />,
        children: [
          { index: true, element: <Navigate to="inbox" replace /> },
          { path: "inbox", element: <Inbox /> },

          { path: "sunday", element: <Sunday /> },
          { path: "monday", element: <Monday /> },
          { path: "tuesday", element: <Tuesday /> },
          { path: "completed", element: <Completed /> },
          { path: "project", element: <Project /> },
        ],
      },
      { path: "login", element: <Login /> },
    ],
  },
];

export default routes;
