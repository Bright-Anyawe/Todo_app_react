const SideBar = () => {
  return (
    <>
      <aside id="sideBar">
        <div id="task">
          <svg
            className="addTask"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>plus</title>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          <button className="addTask">Add task</button>
        </div>
    
    
        <div id="projectsContainer">
          <div className="projectSubContainer">
            <p id="addNewProjectEl">My projects </p>

            <svg
              className="projectClick"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </div>
        </div>

        <li className="project-select">
          <select id="project-dropdown">
            <option value="">Select a project</option>
          </select>
        </li>
      </aside>
    </>
  );
};

export default SideBar;
