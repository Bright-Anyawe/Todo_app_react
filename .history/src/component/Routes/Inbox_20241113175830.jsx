import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import FormDialog from "../PopUp/Dialog";
import { TodoDetails } from "./TodoDetails";

export function Inbox() {
  const {
    // inboxToDos,
    // setInboxToDos,
    open,
    setOpen,
    selectedTodo,
    setSelectedTodo,
    completedToDos,
    setCompletedToDos,
  } = useContext(GeneralContext);

  const { projects = [], setProjects } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);

  const inboxToDos =
    projects.find((project) => project?.name === "Inbox")?.todos || [];

  const handleOptionsClick = (index) => {
    // Toggle the options menu for a specific to-do item
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  console.dir(inboxToDos, { depth: null });
  const handleDelete = (index) => {
    const updatedTodos = inboxToDos.filter((_, i) => i !== index);
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.name === "Inbox") {
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
    });
  };

  const handleToDoDetails = (todo) => {
    setTodoDetails(todo);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTodoDetails(null);
  };

  
  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
        {inboxToDos.map((todo, index) => {

          return (
            <div key={index} className="taskItem">
              <div className="taskContent">
                <Checkbox
                  onClick={}
                  style={{ float: "left" }}
                  checked={isCompleted}
                />

                <span
                  style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.taskTitle}
                </span>
                <span> - {todo.priority}</span>
                {isCompleted && (
                  <span style={{ color: "green", marginLeft: "10px" }}>
                    Task completed!
                  </span>
                )}

                <IconButton
                  onClick={() => handleOptionsClick(index)}
                  style={{ marginLeft: "auto" }}
                >
                  <MoreVertIcon />
                </IconButton>

                {showOptions === index && (
                  <div className="taskOptions">
                    <IconButton onClick={() => handleEditClick(todo)}>
                      <EditIcon /> Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon /> Delete
                    </IconButton>
                    <IconButton onClick={() => handleToDoDetails(todo)}>
                      <InfoIcon /> Details
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {
        <TodoDetails
          open={detailsOpen}
          onClose={handleCloseDetails}
          todo={todoDetails}
        />
      }
    </div>
  );
}
