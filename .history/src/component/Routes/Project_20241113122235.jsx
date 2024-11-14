import { GeneralContext, ProjectContext } from "../Layout/App";
import { useContext } from "react";
import { IconButton, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import select
import { TodoDetails } from "./TodoDetails";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Project() {
  const navigate = useNavigate();
  const projectName = useParams();

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
  const [selectedProject, setSelectedProject] = useState(null);

  const { projects = [], setProjects } = useContext(ProjectContext);
  const [showOptions, setShowOptions] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);

  const project = projects.find(
    (proj) => proj.name !== "Inbox" && proj.name !== "Today"
  );
  const projectToDos = project ? project.todos : [];

    useEffect(() => {
      const project = projects.find(
        (p) => p.name.toLowerCase() === projectName.toLowerCase()
      );
      setSelectedProject(project);
    }, [projectName, projects]);

    if (!selectedProject) {
      return <div>Project not found</div>;
    }

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
        [...prevCompletedToDos, index];
      }
    });
  };

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>{project ? project.name : "Project"}</h2>
      </div>

      <div className="taskContainer">
        {projectToDos.map((todo, index) => (
          <div key={index} className="taskItem">
            <div className="taskContent">
              <Checkbox
                onClick={() => handleCheckBoxChange()}
                style={{ float: "left" }}
              />

              <span>{todo.taskTitle}</span>
              <span> - {todo.priority}</span>
              {/* {isCompleted && <span style={{ color: 'green', marginLeft: '10px' }}>Task completed!</span>} */}

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
        ))}
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
