import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Inbox } from "../Routes/Inbox";
import { Tomorrow } from "../Routes/Tomorrow";
import { ThisWeek } from "../Routes/Week";
import { Completed } from "../Routes/Completed";

import { useState } from "react";
import { FormButton } from "../Button";

const Display = () => {
  const { name } = useParams();
  


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

         
        </div>
      </div>
    </>
  );
};

export default Display;
