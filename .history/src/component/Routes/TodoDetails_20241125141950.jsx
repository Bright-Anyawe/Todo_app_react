
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


const styles = {
  dialogTitle: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  dialogContent: {
    padding: "24px",
    lineHeight: "1.6",
    fontSize: "1rem",
  },
  taskTitle: {
    marginBottom: "16px",
    color: "#3f51b5",
    fontWeight: "bold",
  },
  label: {
    marginBottom: "12px",
  },
  dialogActions: {
    justifyContent: "center",
    padding: "16px",
  },
  closeButton: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "8px 16px",
    textTransform: "capitalize",
    fontWeight: "bold",
    borderRadius: "20px",
  },
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
              Due Date: {formatDateInWords(todo.date)}
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