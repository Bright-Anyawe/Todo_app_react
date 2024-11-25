
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const TodoDetails = ({ open, onClose, todo }) => {
     
  if (!todo) return null;

 const formatDateInWords = (dateString) => {
   if (!dateString) return "No date set";
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
     weekday: "long",
     month: "long",
     year: "numeric",
   });
 };
    
    return (
      <>
        {" "}
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Todo Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Task: {todo.taskTitle}</Typography>
            <Typography variant="body1">
              Description: {todo.description}
            </Typography>
            <Typography variant="body1">Priority: {todo.priority}</Typography>
            <Typography variant="body1">
              {" "}
              Due Date: {formatDateInWords}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}