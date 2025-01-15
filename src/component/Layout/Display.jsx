import { Outlet } from "react-router-dom";

const Display = () => {
  return (
    <div id="displayContentContainer" data-testid="display">
      <div className="displayContentSubContainer">
        {/* Render nested routes using Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default Display;
