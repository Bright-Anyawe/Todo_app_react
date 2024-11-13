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
import { GeneralContext, ProjectContext } from "../Layout/App";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function FormDialog() {
  const { name } = useParams();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
    inboxToDos,
    setInboxToDos,
    today,
    setTodayToDos,
    open,
    setOpen,
    inboxCount,
    setInboxCount,
    todayCount,
    setTodayCount,
    selectedTodo,
    setSelectedTodo,
  } = useContext(GeneralContext);
  const { projects, setProjects } = useContext(ProjectContext);

  const { taskTitle, description, priority, date, projectName } = state;

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
      dispatch({
        type: "Update_form_inputs",
        fieldName: "date",
        fieldValue: selectedTodo.projectName,
      });
    }
  }, [selectedTodo]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(state);

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
      fieldName: "date",
      fieldValue: newDate,
    });
  };

  const handleClearForm = () => {
    dispatch({
      type: "Clear_inputs_field",
    });
  };

  const handleSaveTodo = (updateTodo) => {
    const updatedTodos = inboxToDos.map((todo) =>
      todo === selectedTodo ? updateTodo : todo
    );

    setInboxToDos(updatedTodos);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProject = projects.find(
      (project) => project.name === state.projectName
    );

    if (!selectedProject) {
      console.log("Project not found");
      // state.projectName
      return;
    }

    const newTodo = { ...state };

    const updatedProjects = projects.map((project) => {
      if (project.name === selectedProject.name) {
        return { ...project, todos: [...project.todos, newTodo] };
      }
      return project;
    });

    setProjects(updatedProjects);

    if (name === "inbox") {
      if (selectedTodo) {
        handleSaveTodo(state);
      } else {
        setInboxToDos((prevToDos) => {
          const updatedToDos = Array.isArray(prevToDos)
            ? [...prevToDos, state]
            : [state];
          return updatedToDos;
        });
        setInboxCount(inboxCount + 1);
      }
    } else if (name === "today") {
      setTodayToDos((prevToDos) => {
        const updatedToDos = Array.isArray(prevToDos)
          ? [...prevToDos, state]
          : [state];
        return updatedToDos;
      });
      setTodayCount(todayCount + 1);
      console.log(todayCount);
    }

    // handleSaveTodo(state);

    handleClose();
    handleClearForm();
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

          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel>Select project</InputLabel>
            <Select
              name="projectName"
              value={projectName}
              onChange={handleChange}
            >
              <MenuItem value="inbox">Inbox</MenuItem>
              <MenuItem value="today">today</MenuItem>
              <MenuItem value="tomorrow">tomorrow</MenuItem>
              <MenuItem value="thisWeek">thisWeek</MenuItem>
              <MenuItem value="completed">thisWeek</MenuItem>

              {Array.isArray(projects) &&
                projects.map((project, index) => (
                  <MenuItem key={index} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))}
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
