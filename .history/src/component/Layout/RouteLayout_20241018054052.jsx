
import App from "./App";
import { Inbox } from "../Routes/Inbox";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";
import Projects from "../Routes/Project";
import Display from "../Display";
import { Children } from "react";


const routes = [
  { path: "/", element: <App /> },
  { path: "display", element: <App />,
     Children: {
path: ''
     }
   },
  { path: "/", element: <App /> },
  { path: "/", element: <App /> },
];