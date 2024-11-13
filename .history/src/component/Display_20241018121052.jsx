import { Outlet } from "react-router-dom";

const Display = () => {
  return (
    <>
      <div id="displayContentContainer">
        <div className="displayContentSubContainer">
            <Outlet />{" "}
          </div>


          <div id="taskBtnContainer">
            <svg
              className="addTask"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <button className="taskBtn">Add task</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
