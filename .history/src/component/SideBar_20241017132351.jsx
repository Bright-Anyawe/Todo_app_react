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
        <ul>
          <li className="inbox-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>inbox</title>
              <path d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
            </svg>
            Inbox
          </li>

          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>calendar-today</title>
              <path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
            </svg>
            Today
          </li>

          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>calendar-outline</title>
              <path d="M12 12H17V17H12V12M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 5V7H5V5H19M5 19V9H19V19H5Z" />
            </svg>
            Tomorrow
          </li>

          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>calendar-range-outline</title>
              <path d="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13H17V11H15V13M11 13H13V11H11V13Z" />
            </svg>
            This Week
          </li>
        </ul>
        {/* 
           <div id="projects">
             <li className="project_text">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                 <title>email-plus-outline</title>
                 <path d="M13 19C13 18.66 13.04 18.33 13.09 18H4V8L12 13L20 8V13.09C20.72 13.21 21.39 13.46 22 13.81V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H13.09C13.04 19.67 13 19.34 13 19M20 6L12 11L4 6H20M20 15V18H23V20H20V23H18V20H15V18H18V15H20Z" />
               </svg>
               <h3>My Projects </h3> <span className="excluded">**</span>
             </li>

             <li className="addProjectsContainer">
               <p className="addProject-svgContainer">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                   <title>plus-box-multiple-outline</title>
                   <path d="M18 11H15V14H13V11H10V9H13V6H15V9H18M20 4V16H8V4H20M20 2H8C6.9 2 6 2.9 6 4V16C6 17.11 6.9 18 8 18H20C21.11 18 22 17.11 22 16V4C22 2.9 21.11 2 20 2M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6Z" />
                 </svg>
               </p>
               <p id="addNewProjectEl">Add project </p>
             </li>
           </div>

           <li className="project-select">
             <select id="project-dropdown">
               <option value="">Select a project</option>
             </select>
           </li> */}
      </aside>
    </>
  );
};

export default SideBar;
