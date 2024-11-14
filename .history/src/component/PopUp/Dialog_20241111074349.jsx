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

export default function FormDialog({ open, setOpen }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    priority: "normal",
    date: "",
  });
  const taskTitle = state.taskTitle
  const description = state.taskDescription;
  const priority = state.priority;
  const date = state.date;
  const count = state.count;


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "Update_form_input",
      formData: {
        fieldName: name,
        fieldValue: value,
      },
    });
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", formData);
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
            value={formData.task}
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
            <Select
              name="priority"
              value={priority}
              onChange={handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
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