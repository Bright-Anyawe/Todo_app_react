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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formReducer, initialState } from "../Layout/Reducers/FormReducer";
import { useReducer } from "react";
import { useContext } from "react";
import { GeneralContext, ProjectContext } from "../../Context/ContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextProvider";
import { db, doc, setDoc } from "../../FireBase/FireBase";

export default function FormDialog() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
    open,
    setOpen,
    inboxCount,
    setInboxCount,
    sundayCount,
    setSundayCount,
    mondayCount,
    setMondayCount,
    tuesdayCount,
    setTuesdaysCount,
    selectedTodo,
  } = useContext(GeneralContext);
  const { projects, setProjects, setSelectedProjectName, selectedProjectName } =
    useContext(ProjectContext);

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
        fieldValue: new Date(selectedTodo.date),
      });
      dispatch({
        type: "Update_form_inputs",
        fieldName: "projectName",
        fieldValue: selectedTodo.projectName,
      });
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedProjectName) {
      dispatch({
        type: "Update_form_inputs",
        fieldName: "projectName",
        fieldValue: selectedProjectName,
      });
    }
  }, [selectedProjectName]);

  const handleClose = () => {
    document.getElementById("root").removeAttribute("inert");
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
    if (newDate instanceof Date) {
      dispatch({
        type: "Update_form_inputs",
        fieldName: "date",
        fieldValue: newDate,
      });
    } else {
      console.error("Invalid date value:", newDate);
    }
  };

  const handleClearForm = () => {
    dispatch({
      type: "Clear_inputs_field",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProjectName = state.projectName || "Inbox";
    setSelectedProjectName(selectedProjectName);

    const newTodo = { ...state };

    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.name === selectedProjectName) {
          const updatedTodos = selectedTodo
            ? project.todos.map((todo) =>
                todo === selectedTodo ? newTodo : todo
              )
            : [...project.todos, newTodo];
          return { ...project, todos: updatedTodos };
        }
        return project;
      });

      if (user) {
        const userDoc = doc(db, "users", user.uid);
        setDoc(userDoc, { projects: updatedProjects }, { merge: true });
        console.log(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      return updatedProjects;
    });

    if (selectedProjectName === "Inbox") {
      if (!selectedTodo) {
        setInboxCount(inboxCount + 1);
      }
    } else if (selectedProjectName === "Sunday") {
      if (!selectedTodo) {
        setSundayCount(sundayCount + 1);
      }
    } else if (selectedProjectName === "Monday") {
      if (!selectedTodo) {
        setMondayCount(mondayCount + 1);
      }
    } else if (selectedProjectName === "Tuesday") {
      if (!selectedTodo) {
        setTuesdaysCount(tuesdayCount + 1);
      }
    }

    const convertedName = selectedProjectName.toLowerCase();
    if (
      ["inbox", "sunday", "monday", "tuesday"].includes(selectedProjectName)
    ) {
      navigate(`/display/${convertedName}`);
    } else if (selectedProjectName === "Project") {
      navigate("/display/project");
    } else {
      console.error(`Unknown project name: ${selectedProjectName}`);
      navigate("/display/inbox"); // Default to Inbox if invalid
    }

    handleClose();
    handleClearForm();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} role="dialog" aria-modal="true">
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
              <MenuItem value="low" style={{ color: "green" }}>
                Low
              </MenuItem>
              <MenuItem value="normal" style={{ color: "blue" }}>
                Normal
              </MenuItem>
              <MenuItem value="important" style={{ color: "orange" }}>
                Important
              </MenuItem>

              <MenuItem value="urgent" style={{ color: "red" }}>
                Urgent
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel>Select project</InputLabel>
            <Select
              name="projectName"
              value={projectName}
              onChange={handleChange}
            >
              {Array.isArray(projects) && projects.length > 0 ? (
                projects.map((project, index) => (
                  <MenuItem key={index} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="Inbox">Inbox</MenuItem>
              )}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={date instanceof Date && !isNaN(date) ? date : null}
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
