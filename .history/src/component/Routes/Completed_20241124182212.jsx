import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox, Snackbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import { TodoDetails } from "./TodoDetails";

export function Completed() {
  const { setCompletedCount, setCompletedToDos, completedToDos } =
    useContext(GeneralContext);

  const { projects = [], setProjects } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


  // useEffect(() => {
  //   const storedCompletedToDos =
  //     JSON.parse(localStorage.getItem("completedToDos")) || [];
  //   setCompletedToDos(storedCompletedToDos);
  // }, []);


useEffect(() => {
  const storedCompletedToDos =
    JSON.parse(localStorage.getItem("completedToDos")) || [];
  setCompletedToDos(storedCompletedToDos);
  setIsDataLoaded(true); 
}, [setCompletedToDos]);


  useEffect(() => {
    if (Array.isArray(completedToDos)) {
      setCompletedCount(completedToDos.length);
      localStorage.setItem("completedToDos", JSON.stringify(completedToDos));
    }
  }, [completedToDos, setCompletedCount]);

  if (!isDataLoaded) {
    return <div>Loading...</div>; // Display a loading state
  } useEffect(() => {
    if (Array.isArray(completedToDos)) {
      setCompletedCount(completedToDos.length);
      localStorage.setItem("completedToDos", JSON.stringify(completedToDos));
    }
  }, [completedToDos, setCompletedCount]);

  if (!isDataLoaded) {
    return <div>Loading...</div>; // Display a loading state
  }

  const handleOptionsClick = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleToDoDetails = (todo) => {
    setTodoDetails(todo);
    setDetailsOpen(true);
  };

  const handleDelete = (index) => {
    const updatedTodos = completedToDos.filter((_, i) => i !== index);
    setCompletedToDos(updatedTodos); 


    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.name === "Completed") {
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
    });
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTodoDetails(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Completed Todos</h2>
      </div>

      <div className="taskContainer">
        {Array.isArray(completedToDos) &&
          completedToDos.map((todo, index) => {
            const isCompleted = completedToDos.includes(todo);

            return (
              <div key={index} className="taskItem">
                <div className="taskContent">
                  <Checkbox
                    //    onClick={() => handleCheckBoxChange(index, todo)}
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

                  <Snackbar
                    open={snackbarOpen}
                    onClose={handleCloseSnackbar}
                    message="Task marked as completed!"
                    autoHideDuration={3000}
                  />

                  {showOptions === index && (
                    <div className="taskOptions">
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
