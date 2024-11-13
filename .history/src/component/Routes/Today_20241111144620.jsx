import { GeneralContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import FormDialog from "../PopUp/Dialog";

export function Today() {
  const { todayToDos, setTodayToDos } = useContext(GeneralContext);

  return (
    <div className="tomorrowTaskContainer">
      <div className="taskTitle">
        <h2>Today</h2>
      </div>

      <div className="taskContainer"></div>
    </div>
  );
}
