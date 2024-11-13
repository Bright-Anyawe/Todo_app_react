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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formReducer, initialState } from "../Layout/Reducers/FormReducer";
import { useReducer } from "react";
import { useContext } from "react";
import { GeneralContext } from "../Layout/App";

export default function FormDialog({ open, setOpen }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const taskTitle = state.taskTitle;
  const description = state.description;
  const priority = state.priority;
  const date = state.date;
  const count = state.count;

  const {inboxToDos, setInboxToDos} = useContext(GeneralContext)

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "Update_form_inputs",
      formData: {
        fieldName: name,
        fieldValue: value,
      },
    });
    // setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    dispatch({
      type: "Update_form_inputs",
      formData: {
        fieldName: "date",
        fieldValue: newDate,
      },
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", state);
    setInboxToDos()
    handleClose(); // Close the dialog after submission
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            name="taskTitle"
            type="text"
            fullWidth
            variant="standard"
            value={taskTitle}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={priority} onChange={handleChange}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="important">Important</MenuItem>

              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={date}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                },
              }}
            />
          </LocalizationProvider>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
