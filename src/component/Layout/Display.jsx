import { Outlet } from "react-router-dom";

const Display = () => {
  return (
    <div id="displayContentContainer" data-testid="display">
      <div className="displayContentSubContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default Display;
