import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div id="mainContentContainer" data-testid="main-content">
      <div className="mainContentSubContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent; 