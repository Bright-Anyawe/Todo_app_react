import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Inbox } from "../Routes/Inbox";
import { Today } from "../Routes/Today";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";

import { useState } from "react";
import { FormButton } from "../Button";
import Project from "../Routes/Project";

const Display = () => {
  const { name } = useParams();

  c

  return (
    <>
      <div id="displayContentContainer" data-testid="display">
        <div className="displayContentSubContainer">
          {/* <Inbox /> */}
          {/* <Outlet />{" "} */}
          
        </div>
      </div>
    </>
  );
};

export default Display;
