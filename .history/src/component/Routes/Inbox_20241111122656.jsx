import { GeneralContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";


export function Inbox() {
  const { inboxToDos } = useContext(GeneralContext);
    const [selectedTodo, setSelectedTodo] = useState(null); 
  const [showOptions, setShowOptions] = useState(null);
  const {open, setOpen} = useContext(GeneralContext)
  

  const handleOptionsClick = (index) => {
    // Toggle the options menu for a specific to-do item
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setOpne(true); /
  }

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
        {inboxToDos.map((todo, index) => (
          <div key={index} className="taskItem">
            <div className="taskContent">
              <Checkbox style={{ float: "left" }} />

              <span>{todo.taskTitle}</span>
              <span> - {todo.priority}</span>
              <IconButton
                onClick={() => handleOptionsClick(index)}
                style={{ marginLeft: "auto" }}
              >
                <MoreVertIcon />
              </IconButton>

              {showOptions === index && (
                <div className="taskOptions">
                  <IconButton onClick={() => alert("Edit feature")}>
                    <EditIcon /> Edit
                  </IconButton>
                  <IconButton onClick={() => alert("Delete feature")}>
                    <DeleteIcon /> Delete
                  </IconButton>
                  <IconButton onClick={() => alert("Details of the todo")}>
                    <InfoIcon /> Details
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
