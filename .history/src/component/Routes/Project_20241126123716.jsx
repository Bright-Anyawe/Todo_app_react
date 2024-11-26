import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { TodoDetails } from "./TodoDetails";
import { FormButton } from "../Button";

export default function Project() {

  const {
    setOpen,
    getPriorityColor,
    markTodoAsCompleted,
  } = useContext(GeneralContext);

  const {
    projects = [],
    setProjects,
    selectedProjectName,
  } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);

  const project = projects.find(
    (proj) =>
      proj.name === selectedProjectName &&
      proj.name !== "Inbox" &&
      proj.name !== "Today"
  );
  const projectToDos = project ? project.todos : [];

  const handleOptionsClick = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedTodos = projectToDos.filter((_, i) => i !== index);

    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.name === project.name ? { ...proj, todos: updatedTodos } : proj
      )
    );
  };

  const handleToDoDetails = (todo) => {
    setTodoDetails(todo);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTodoDetails(null);
  };

  // const handleCheckBoxChange = (index, todo) => {
  //   markTodoAsCompleted(todo);

  //   setCompletedToDos((prevCompletedToDos) => {
  //     if (prevCompletedToDos.includes(index)) {
  //       return prevCompletedToDos.filter((i) => i !== index);
  //     } else {
  //       return [...prevCompletedToDos, index];
  //     }
  //   });
  // };

  const handleCheckBoxChange = (index, todo) => {
    markTodoAsCompleted(todo);

    setProjects((prevProjects) =>
      prevProjects.map((proj) => {
        if (proj.name === project.name) {
          const updatedTodos = proj.todos.map((t, i) =>
            i === index ? { ...t, completed: true } : t
          );
          return { ...proj, todos: updatedTodos };
        }
        return proj;
      })
    );
  };


  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>{project ? project.name : "Project"}</h2>
      </div>

      <div className="taskContainer">
        {Array.isArray(projectToDos) &&
          projectToDos.map((todo, index) => {
            const isCompleted = todo.completed || false;
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
                  <div className="todoTextContent">
                    <p
                      style={{
                        textDecoration: isCompleted ? "line-through" : "none",
                        color: isCompleted ? "grey" : "black",
                      }}
                    >
                      {todo.taskTitle}
                    </p>
                    <p style={{ color: priorityColor }}> - {todo.priority}</p>
                  </div>{" "}
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
