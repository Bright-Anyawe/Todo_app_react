import * as React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";


export default function FormDialog({children}) {
 const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState({
    task: "",
    description: "",
    priority: "normal",
    date: "",
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", formData);
    handleClose(); // Close the dialog after submission
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Add Task
      </Button>
      <Dialog>
        <DialogTitle>Add a New Task</DialogTitle>
      </Dialog>
    </React.Fragment>
  );
}