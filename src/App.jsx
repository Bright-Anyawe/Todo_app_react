import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./component/Routes/RouteLayout";

const router = createBrowserRouter(routes);

export const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
