import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext, ProjectContext } from "../../Context/ContextProvider";
import NewProjectForm from "../CustomForm";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useRef, useEffect } from "react";
import AuthIcon from "./AuthIcon";

const SideBar = () => {
  const sidebarRef = useRef(null);

  const {
    inboxCount,
    sundayCount,
    mondayCount,
    tuesdayCount,
    completedCount,
    isCollapsed,
    setIsCollapsed,
    toggleSidebar,
    arrowRef,
  } = useContext(GeneralContext);
  const {
    setOpenProjectForm,
    projects,
    setProjects,
    setProjectName,
    setSelectedProjectName,
    selectedProjectIndex,
    setSelectedProjectIndex,
  } = useContext(ProjectContext);

  const navigate = useNavigate();
  const startIndex = 4;
  const [anchorEl, setAnchorEl] = useState(null);

  const openProjectForm = () => {
    setOpenProjectForm(true);
  };

  const handleProjectClick = (projectName) => {
    setSelectedProjectName(projectName);

    toggleSidebar();
    navigate(`/display/project`);
  };

  const handleOptionsClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectIndex(index);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
    // setSelectedProjectIndex(null);
  };

  const handleEditProject = () => {
    const project = projects[selectedProjectIndex];
    console.dir(project, { depth: null });
    setProjectName(project.name);
    setOpenProjectForm(true);
    handleOptionsClose();
  };

  const handleDeleteProject = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, i) => i !== selectedProjectIndex)
    );
    handleOptionsClose();
  };

  const handleNavClick = (path) => {
    console.log("Navigating to:", path);

    toggleSidebar();
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        (!arrowRef.current || !arrowRef.current.contains(event.target))
      ) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsCollapsed]);

  return (
    <>
      <aside
        id="sideBar"
        ref={sidebarRef}
        className={isCollapsed ? "collapsed" : ""}
        data-testid="sidebar"
      >
        <nav className="listContainer">
          <ul id="menu">
            <div className="block md:hidden relative mb-20 top-0 right-10">
              <AuthIcon />
            </div>

            <NavLink
              to="/dashboard"
              className="navLink"
              onClick={() => handleNavClick("/dashboard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>view-dashboard</title>
                <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
              </svg>
              Dashboard
            </NavLink>

            <NavLink
              to="display/inbox"
              className="navLink"
              onClick={() => handleNavClick("display/inbox")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>inbox</title>
                <path d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
              </svg>
              Inbox
              <span>{inboxCount}</span>
            </NavLink>

            <NavLink
              to="display/sunday"
              className="navLink"
              onClick={() => handleNavClick("display/sunday")}
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-today</title>
                <path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
              </svg>
              Sunday
              <span>{sundayCount}</span>
            </NavLink>
            <NavLink
              to="display/monday"
              className="navLink"
              onClick={() => handleNavClick("display/monday")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-outline</title>
                <path d="M12 12H17V17H12V12M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 5V7H5V5H19M5 19V9H19V19H5Z" />
              </svg>
              Monday
              <span>{mondayCount}</span>
            </NavLink>
            <NavLink
              to="display/tuesday"
              className="navLink"
              onClick={() => handleNavClick("display/tuesday")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-range-outline</title>
                <path d="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13H17V11H15V13M11 13H13V11H11V13Z" />
              </svg>
              Tuesday
              <span>{tuesdayCount}</span>
            </NavLink>

            <NavLink
              to="display/completed"
              className="navLink"
              onClick={() => handleNavClick("display/completed")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>calendar-check-outline</title>
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M5 7V5H19V7H5M10.56 17.46L16.5 11.53L15.43 10.47L10.56 15.34L8.45 13.23L7.39 14.29L10.56 17.46Z" />
              </svg>
              Completed
              <span>{completedCount}</span>
            </NavLink>
          </ul>
        </nav>

        <div id="projectsContainer">
          <div className="addProjectContainer">
            <svg
              onClick={() => openProjectForm()}
              className="projectClick"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <h2 id="addProjectText">My projects </h2>
          </div>
          <NewProjectForm />
          <div className="projects">
            {Array.isArray(projects) &&
              projects.slice(startIndex).map((project, index) => (
                <div
                  className="projectName"
                  onClick={() => handleProjectClick(project.name)}
                  key={index + startIndex}
                >
                  <span>#</span>
                  <h3>{project.name}</h3>
                  <div className="showOptions">
                    <IconButton
                      onClick={(event) =>
                        handleOptionsClick(event, index + startIndex)
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              ))}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleOptionsClose}
            >
              <MenuItem onClick={handleEditProject}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteProject}>Delete</MenuItem>
            </Menu>
          </div>{" "}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
