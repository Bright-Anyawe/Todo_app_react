



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
               <p className="inbox">Inbox</p>
             </li>

             <li>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                 <title>calendar-today</title>
                 <path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
               </svg>
               Today
             </li>
           </ul>
         </aside>
       </>
     );
};

export default SideBar