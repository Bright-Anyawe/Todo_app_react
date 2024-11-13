import App from "../Layout/App";
import { Inbox } from "./Inbox";
import { Tomorrow } from "./Tomorrow";
import { ThisWeek } from "./Week";
import { Completed } from "./Completed";
import Project
import Display from "../Layout/Display";
import { Today } from "./Today";
import { Children } from "react";
import { element } from "prop-types";

const routes = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "display/:name",
        element: <Display />,

        children: [
          {
            index: true,
            path: "inbox",
            element: <Inbox />,
          },
          { path: "today", element: <Today /> },

          { path: "tomorrow", element: <Tomorrow /> },
          { path: "thisWeek", element: <ThisWeek /> },
          { path: "completed", element: <Completed /> },
        ],
      },
    ],
  },
];

export default routes;
