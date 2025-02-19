import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";

import { db, doc, setDoc } from "../FireBase/FireBase";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

import { GeneralContext, ProjectContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    OpenProjectForm,
    setOpenProjectForm,
    setProjects,
    projectName,
    setProjectName,
    selectedProjectIndex,
    setSelectedProjectName,
  } = useContext(ProjectContext);
  const { setOpen } = useContext(GeneralContext);

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
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          setDoc(userDoc, { projects: updatedProjects }, { merge: true });
        } else {
          localStorage.setItem("projects", JSON.stringify(updatedProjects));
        }
        return updatedProjects;
      });
    } else {
      const newProject = { name: projectName, todos: [], completed: false };

      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects, newProject];
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
