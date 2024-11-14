import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox, Snackbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { FormButton } from "../Button";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const inboxToDos =
    projects.find((project) => project?.name === "Inbox")?.todos || [];

  const handleOptionsClick = (index) => {
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

  const handleCheckBoxChange = (index, todo) => {
    setCompletedToDos((prevCompletedToDos) => [...prevCompletedToDos, todo]);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
        {inboxToDos.map((todo, index) => {
          const isCompleted = completedToDos.includes(todo);

          return (
            <div key={index} className="taskItem">
              <div className="taskContent">
                <Checkbox
                  onClick={() => handleCheckBoxChange(index, todo)}
                  checked={isCompleted}
                  disabled={isCompleted}
                  style={{ float: "left" }}
                />

                <span
                  style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                    color: isCompleted ? "grey" : "black",
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
        <FormButton />
      </div>

      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message="Task marked as completed!"
        autoHideDuration={3000}
      />

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
