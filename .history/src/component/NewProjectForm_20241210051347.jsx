import * as React from "react";
import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

import { useContext } from "react";
import { GeneralContext, ProjectContext } from "./Layout/App";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const navigate = useNavigate();
  const {
    OpenProjectForm,
    setOpenProjectForm,
    projects,
    setProjects,
    projectName,
    setProjectName,
    selectedProjectIndex,
    setSelectedProjectName,
  } = useContext(ProjectContext);
  const { setOpen } = useContext(GeneralContext);

  useEffect(() => {
    if (projects && Array.isArray(projects)) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleProjectName = (e) => {
    const name = e.target.value;
    setProjectName(name);
  };

  const handleOpenTodoForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpenProjectForm(false);
  };

  

  const handleSubmit = () => {

    if (selectedProjectIndex !== null) {
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project, index) =>
            index === selectedProjectIndex
              ? { ...project, name: projectName }
              : project
          );
          localStorage.setItem("projects", JSON.stringify(updatedProjects));
          return updatedProjects;
        });
    } else {
          const newProject = { name: projectName, todos: [], completed: false };

      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects, newProject];
        // Sync updated state to localStorage
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        return updatedProjects;
      });
    }
      setSelectedProjectName(projectName);


    setProjectName("");
    handleCloseForm();
    navigate("/display/project");

    handleOpenTodoForm();
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button> */}
      <Dialog open={OpenProjectForm} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedProjectIndex !== null
            ? "Edit Project Name"
            : "Add New Project"}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project name"
            name="projectName"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={(e) => handleProjectName(e)}
          />

          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {selectedProjectIndex !== null
                ? "Update Project"
                : "Create New Project"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default NewProjectForm;
