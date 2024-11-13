import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "./Layout/App";
import { ProjectContext } from "./Layout/App";
import NewProjectForm from "./Routes/NewProjectForm";

const SideBar = () => {
  const { inboxCount, todayCount } = useContext(GeneralContext);
  const { setOpenProjectForm, projects, setProjects } =
    useContext(ProjectContext);

  const openProjectForm = () => {
    setOpenProjectForm(true);
  };

  return (
    <>
      <aside id="sideBar">
        <nav className="listContainer">
          <ul id="menu">
            {/* <li className="inbox-container"> */}
            <NavLink to="display/inbox" className="navLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>inbox</title>
                <path d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
              </svg>
              Inbox
              <span>{inboxCount}</span>
            </NavLink>

            {/* </li> */}

            <NavLink to="display/today" className="navLink">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-today</title>
                <path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
              </svg>
              Today
              <span>{todayCount}</span>
            </NavLink>
            <NavLink to="display/Tomorrow" className="navLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-outline</title>
                <path d="M12 12H17V17H12V12M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 5V7H5V5H19M5 19V9H19V19H5Z" />
              </svg>
              Tomorrow
            </NavLink>
            <NavLink to="display/thisWeek" className="navLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-range-outline</title>
                <path d="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13H17V11H15V13M11 13H13V11H11V13Z" />
              </svg>
              This Week
            </NavLink>

            <NavLink to="display/completed" className="navLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-check-outline</title>
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M5 7V5H19V7H5M10.56 17.46L16.5 11.53L15.43 10.47L10.56 15.34L8.45 13.23L7.39 14.29L10.56 17.46Z" />
              </svg>
              Completed
            </NavLink>
          </ul>
        </nav>

        <div id="projectsContainer">
          <div className="addProjectContainer">
            <p id="addProjectText">My projects </p>

            <svg
              onClick={() => openProjectForm()}
              className="projectClick"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </div>
          <NewProjectForm />

          {Array.isArray(projects) &&
            projects.map((project, index) => (
              <div key={index}>
                <span>#</span>
                <h4>{project}</h4>
                <div className={showOp} ></div>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
