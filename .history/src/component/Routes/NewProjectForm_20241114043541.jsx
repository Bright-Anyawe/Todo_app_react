import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { formReducer, initialState } from "../Layout/Reducers/FormReducer";
import { useReducer } from "react";
import { useContext } from "react";
import { GeneralContext, ProjectContext } from "../Layout/App";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const navigate = useNavigate()
  const {
    OpenProjectForm,
    setOpenProjectForm,
    projects,
    setProjects,
    projectName,
    setProjectName,
    selectedProjectIndex,
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
      setProjects((prevProjects) =>
        prevProjects.map((project, index) =>
          index === selectedProjectIndex
            ? { ...project, name: projectName }
            : project
        )
      );
      console.log()
    } else {
      setProjects([...projects, { name: projectName, todos: [] }]);
    }
    setProjectName("");
    handleCloseForm();
    navigate("/display/Project");

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
