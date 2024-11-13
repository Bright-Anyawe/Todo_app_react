import App from "./App";
import { Inbox } from "../Routes/Inbox";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";
import Projects from "../Routes/Project";
import Display from "../Display";
import { Children } from "react";
import { element } from "prop-types";

const routes = [
  { path: "/", element: <App /> },
  {
    index: true,
    path: "display",
    element: <App />,
    children:]
  },
  { path: "/", element: <App /> },
];
