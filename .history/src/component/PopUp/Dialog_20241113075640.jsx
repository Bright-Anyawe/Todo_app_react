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
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

export default function FormDialog() {
  const { name } = useParams();
  const navigate = useNavigate(); 
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
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
        fieldName: "projectName",
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

  useEffect(() => {
    console.log("Projects in FormDialog:", projects);
  }, [projects]);

  const handleSaveTodo = (updateTodo) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.name === "Inbox") {
          const updatedTodos = project.todos.map((todo) =>
            todo === selectedTodo ? updateTodo : todo
          );
          return { ...project, todos: updatedTodos };
        }
        return project;
      });
    });
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProjectName = state.projectName || "Inbox";

    const selectedProject = projects.find(
      (project) => project.name === selectedProjectName
    );

    const newTodo = { ...state };

    const updatedProjects = projects.map((project) => {
      if (project.name === selectedProject.name) {
        return { ...project, todos: [...project.todos, newTodo] };
      }
      return project;
    });
    console.log(updatedProjects);

    if (name === "inbox") {
      if (selectedTodo) {
        handleSaveTodo(state);
      } else {
        setProjects(updatedProjects);
        setInboxCount(inboxCount + 1);
      }
    } else if (name === "today") {
      if (selectedTodo) {
        handleSaveTodo(state);
      } else {
        setProjects(updatedProjects);
        setTodayCount(todayCount + 1);
      }
      console.log(todayCount);
    } else if (name === "project") {
      if (selectedTodo) {
        handleSaveTodo(state);
      } else {
        setProjects(updatedProjects);
        setTodayCount(todayCount + 1);
      }
      console.log(todayCount);
    }
    console.log(projects);
const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

    // handleSaveTodo(state);
        navigate(`/display/${selectedProjectName}`);


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
              {Array.isArray(projects) &&
                projects
                  .filter((project) => project)
                  .map((project, index) => (
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
