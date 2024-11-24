import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox, Snackbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import { TodoDetails } from "./TodoDetails";
import { FormButton } from "../Button";

export function Tomorrow() {
  const {
    setOpen,
    setSelectedTodo,
    setCompletedToDos,
    setTomorrowCount,
    getPriorityColor,
  } = useContext(GeneralContext);

  const { projects = [], setProjects } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const tomorrowToDos =
    projects.find((project) => project?.name === "Tomorrow")?.todos || [];

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects && storedProjects.length) {
      const updatedProjects = storedProjects.map((project) => {
        if (project.name === "Tomorrow") {
          project.todos = project.todos.map((todo) => ({
            ...todo,
            completed: todo.completed ?? false,
          }));
        }
        return project;
      });
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      const tomorrowToDos =
        updatedProjects.find((project) => project?.name === "Tomorrow")
          ?.todos || [];
      setTomorrowCount(tomorrowToDos.length);
    }
  }, []);

  const handleOptionsClick = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedToDos = tomorrowToDos.filter((_, i) => i !== index);

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.name === "Tomorrow") {
          return { ...project, todos: updatedToDos };
        }
        return project;
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      updatedToDos.length;
      return updatedProjects;
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
    markTodoAsCompleted(todo)
    const updatedTodos = tomorrowToDos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.name === "Tomorrow") {
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
    setCompletedToDos((prevCompletedToDos) => [...prevCompletedToDos, todo]);

    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Tomorrow</h2>
      </div>

      <div className="taskContainer">
        {Array.isArray(tomorrowToDos) &&
          tomorrowToDos.map((todo, index) => {
            const isCompleted = todo.completed;
            const priorityColor = getPriorityColor(todo.priority);

            return (
              <div key={index} className="taskItem">
                <div className="taskContent">
                  <Checkbox
                    onClick={() => handleCheckBoxChange(index, todo)}
                    checked={!!isCompleted}
                    disabled={!!isCompleted}
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
                  <span style={{ color: priorityColor }}>
                    {" "}
                    - {todo.priority}
                  </span>
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

                  <Snackbar
                    open={snackbarOpen}
                    onClose={handleCloseSnackbar}
                    message="Task marked as completed!"
                    autoHideDuration={3000}
                  />

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
      <FormButton />

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
