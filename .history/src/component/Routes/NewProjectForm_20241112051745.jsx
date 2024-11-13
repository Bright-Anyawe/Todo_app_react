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
import { ProjectContext } from "../Layout/App";

const NewProjectForm = () => {
  const { OpenProjectForm, setOpenProjectForm } = useContext(ProjectContext);
const [projectName, setProjectName] = useState('')

const handleProjectName = () => {
     
}

  const handleCloseForm = () => {
    setOpenProjectForm(false);
  };



  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button> */}
      <Dialog open={OpenProjectForm} onClose={handleCloseForm}>
        <DialogTitle>Add new project name</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            name="projectName"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={handleChange}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create new project</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default NewProjectForm;
