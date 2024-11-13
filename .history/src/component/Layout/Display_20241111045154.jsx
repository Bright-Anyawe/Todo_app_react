import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Inbox } from "../Routes/Inbox";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";
import FormDialog from "../PopUp/Dialog";
import { useState } from "react";

const Display = () => {
  const { name } = useParams();
   const [open, setOpen] = useState(false);


  return (
    <>
      <div id="displayContentContainer">
        <div className="displayContentSubContainer">
          {/* <Inbox /> */}
          {/* <Outlet />{" "} */}
          {name === "inbox" ? (
            <Inbox />
          ) : name === "tomorrow" ? (
            <Tomorrow />
          ) : name === "thisWeek" ? (
            <ThisWeek />
          ) : (
            <Completed />
          )}

          <div id="taskBtnContainer">
            <svg
              className="addTask"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <button className="taskBtn" onClick={() => {<FormDialog />}}>Add task</button>
            
              
            
            {/* <Form/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
