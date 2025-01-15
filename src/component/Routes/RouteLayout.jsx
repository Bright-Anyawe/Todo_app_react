import App from "../../App";
import { Inbox } from "./Inbox";
import { Tomorrow } from "./Tomorrow";
import { ThisWeek } from "./Week";
import { Completed } from "./Completed";
import Project from "./Project";
import Display from "../Layout/Display";
import { Today } from "./Today";
import Login from "../../Auth/Login";
import ErrorPage from "./ErrorPage.jsx";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "display",
        element: <Display />,
        children: [
          { index: true, element: <Navigate to="inbox" replace /> },
          { path: "inbox", element: <Inbox /> },

          { path: "today", element: <Today /> },
          { path: "tomorrow", element: <Tomorrow /> },
          { path: "thisWeek", element: <ThisWeek /> },
          { path: "completed", element: <Completed /> },
          { path: "project", element: <Project /> },
        ],
      },
      { path: "login", element: <Login /> },
    ],
  },
];

export default routes;
