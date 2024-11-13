import { GeneralContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

export function Inbox() {
const {inboxToDos} = useContext(GeneralContext)
console.log(inboxToDos)

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
        {inboxToDos.map((todo, index) => (
          <div key={index} className="taskItem">
            <div className="taskContent">
              <span>{todo.taskTitle}</span>
              <span> - {todo.priority}</span>
              <IconButton
                onClick={() => handleOptionsClick(index)}
                style={{ marginLeft: "auto" }}
              ></IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
