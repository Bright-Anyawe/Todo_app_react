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

// List of default projects
const defaultProjects = [
  "Inbox",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
    setTuesdayCount,
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

  // Only set projectName from selectedProjectName when dialog opens
  useEffect(() => {
    if (open && selectedProjectName) {
      dispatch({
        type: "Update_form_inputs",
        fieldName: "projectName",
        fieldValue: selectedProjectName,
      });
    }
    // eslint-disable-next-line
  }, [open]);

  const handleClose = () => {
    document.getElementById("root").removeAttribute("inert");
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProjectName = state.projectName || "Inbox";
    setSelectedProjectName(selectedProjectName);

    const newTodo = { ...state };

    // Ensure the selected project exists in projects, if not, create it
    let projectExists = false;
    let updatedProjects = projects.map((project) => {
      if (project.name === selectedProjectName) {
        projectExists = true;
        const updatedTodos = selectedTodo
          ? project.todos.map((todo) =>
              todo === selectedTodo ? newTodo : todo
            )
          : [...project.todos, newTodo];
        return { ...project, todos: updatedTodos };
      }
      return project;
    });

    // If project does not exist, add it (with the new todo)
    if (!projectExists) {
      updatedProjects = [
        ...updatedProjects,
        { name: selectedProjectName, todos: [newTodo] },
      ];
    }

    // Also ensure all default projects exist (with empty todos if missing)
    defaultProjects.forEach((name) => {
      if (!updatedProjects.some((p) => p.name === name)) {
        updatedProjects.push({ name, todos: [] });
      }
    });

    // Update Firestore
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      try {
        await setDoc(userDoc, { projects: updatedProjects }, { merge: true });
        console.log("Projects updated successfully");
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    if (selectedProjectName === "Inbox") {
      if (!selectedTodo) {
        setInboxCount(
          updatedProjects.find((p) => p.name === "Inbox").todos.length
        );
      }
    } else if (selectedProjectName === "Sunday") {
      if (!selectedTodo) {
        setSundayCount(
          updatedProjects.find((p) => p.name === "Sunday").todos.length
        );
      }
    } else if (selectedProjectName === "Monday") {
      if (!selectedTodo) {
        setMondayCount(
          updatedProjects.find((p) => p.name === "Monday").todos.length
        );
      }
    } else if (selectedProjectName === "Tuesday") {
      if (!selectedTodo) {
        setTuesdayCount(
          updatedProjects.find((p) => p.name === "Tuesday").todos.length
        );
      }
    }

    const convertedName = selectedProjectName.toLowerCase();
    if (defaultProjects.includes(selectedProjectName)) {
      navigate(`/display/${convertedName}`);
    } else if (selectedProjectName === "Project") {
      navigate("/display/project");
    } else {
      console.error(`Unknown project name: ${selectedProjectName}`);
      navigate("/display/inbox");
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
              value={projectName || "Inbox"}
              onChange={handleChange}
            >
              {defaultProjects.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
              {/* Also show any custom projects not in defaultProjects */}
              {projects
                .filter((p) => !defaultProjects.includes(p.name))
                .map((project, index) => (
                  <MenuItem key={project.name} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))}
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
