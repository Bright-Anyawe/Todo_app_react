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

  return (
    <>
      <div id="displayContentContainer">
        <div className="displayContentSubContainer">
          {/* <Inbox /> */}
          {/* <Outlet />{" "} */}
          {name === "inbox" ? (
            <Inbox />
          ) : name === "today" ? (
            <Today />
          ) : name === "tomorrow" ? (
            <Tomorrow />
          ) : name === "thisWeek" ? (
            <ThisWeek />
          ) : name === "project" ? (
            <Project />
          ) : (
            <Completed />
          )}
          <FormButton />
        </div>
      </div>
    </>
  );
};

export default Display;
