import App from "./App";
import { Inbox } from "../Routes/Inbox";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";
import Projects from "../Routes/Project";
import Display from "../Display";
import { Today } from "./Today";
import { Children } from "react";
import { element } from "prop-types";

const routes = [
  {
    path: "/",
    element: <App />,

    children: {
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
  },
];

export default routes;