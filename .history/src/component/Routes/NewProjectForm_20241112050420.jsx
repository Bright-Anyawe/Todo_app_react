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

const NewProjectForm = () => {


     
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add new project name
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            name="projectName"
            type="text"
            fullWidth
            variant="standard"
            value={taskTitle}
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
