import { GeneralContext, ProjectContext } from "../../Context/ContextProvider";
import { useContext } from "react";
import { IconButton, Checkbox, Snackbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { FormButton } from "../Button";
import { TodoDetails } from "./TodoDetails";
import { useEffect } from "react";
// import { db, doc, setDoc  } from "../../FireBase/FireBase";


export function Inbox() {
  const {
    setOpen,
    setInboxCount,
    setSelectedTodo,
    markTodoAsCompleted,
    getPriorityColor,
  } = useContext(GeneralContext);

  const { projects = [], setProjects } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // useEffect(() => {
  //   const storedProjects = JSON.parse(localStorage.getItem("projects"));
  //   if (storedProjects && storedProjects.length) {
  //     setProjects(storedProjects);
  //   }
  // }, []);
  

  let inboxToDos =
    projects.find((project) => project?.name === "Inbox")?.todos || [];

  useEffect(() => {  
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects && storedProjects.length) {
      setProjects(storedProjects);
      const inboxTodos =
        storedProjects.find((project) => project?.name === "Inbox")?.todos ||
        [];
      setInboxCount(inboxTodos.length);
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
    const updatedTodos = inboxToDos.filter((_, i) => i !== index);

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.name === "Inbox") {
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setInboxCount(updatedTodos.length);
      // updateFirestore(updatedProjects);
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
    markTodoAsCompleted(todo);

    const updatedTodos = inboxToDos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.name === "Inbox") {
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });

    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // const updateFirestore = async (updatedProjects) => {
  //   if (user) {
  //     const userDoc = doc(db, "users", user.uid);
  //     await setDoc(userDoc, { projects: updatedProjects }, { merge: true });
  //   }
  // };

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
        {inboxToDos.map((todo, index) => {
          const isCompleted = todo.completed || false;
          const priorityColor = getPriorityColor(todo.priority);

          
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
                <span style={{ color: priorityColor }}> - {todo.priority}</span>

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
