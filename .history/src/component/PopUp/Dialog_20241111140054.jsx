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
import { useEffect } from "react";

export default function FormDialog({ selectedTodo, onSave }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { open, setOpen } = useContext(GeneralContext);
  const { taskTitle, description, priority, date, count } = state;


  const { inboxToDos, setInboxToDos } = useContext(GeneralContext);

  useEffect(() => {
    if (selectedTodo) {
      dispatch({
        type: "Update_form_inputs",
        fieldName: "taskTitle",
        fieldValue: selectedTodo.taskTitle,
      });
      dispatch({
        type: "Update_form_inputs",
        fieldName: "description",
        fieldValue: selectedTodo.description,
      });
      dispatch({
        type: "Update_form_inputs",
        fieldName: "priority",
        fieldValue: selectedTodo.priority,
      });
      dispatch({
        type: "Update_form_inputs",
        fieldName: "date",
        fieldValue: selectedTodo.date,
      });
    }
  }, [selectedTodo]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "Update_form_inputs",

      fieldName: name,
      fieldValue: value,
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

  const handleClearForm = () => {
    dispatch({
      type: "Clear_inputs_field",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state); 
    // console.log("Task submitted:", state);
    // setInboxToDos((prevToDos) => {
    //   const updatedToDos = Array.isArray(prevToDos)
    //     ? [...prevToDos, state]
    //     : [state];
    //   return updatedToDos;
    // });
    
    handleClose(); 
    handleClearForm();
    console.log(inboxToDos);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedTodo ? "Edit Task" : "Add a New Task"}
        </DialogTitle>

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
