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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormButton } from "../Button";

export default function Project() {
  const navigate = useNavigate();

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
    // Toggle the options menu for a specific to-do item
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

  const handleCheckBoxChange = (index) => {
    setCompletedToDos((prevCompletedToDos) => {
      if (prevCompletedToDos.includes(index)) {
        return prevCompletedToDos.filter((i) => i !== index);
      } else {
        return [...prevCompletedToDos, index];
      }
    });
  };
  console.dir(selectedProjectName, { depth: null });

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>{project ? project.name : "Project"}</h2>
      </div>

      <div className="taskContainer">
        {Array.isArray(projectToDos) &&
          projectToDos.map((todo, index) => (



            return
          ))}
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