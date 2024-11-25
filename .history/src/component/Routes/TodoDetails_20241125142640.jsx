
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
    font-weight: "600"
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
          <DialogTitle style={styles.dialogTitle}>Todo Details</DialogTitle>
          <DialogContent style={styles.dialogContent}>
            <Typography variant="h6" style={styles.taskTitle}>
              Task: {todo.taskTitle}
            </Typography>
            <Typography variant="body1" style={styles.label}>
              <strong>Description:</strong>{" "}
              {todo.description || "No description provided"}
            </Typography>
            <Typography variant="body1" style={styles.label}>
              <strong>Priority:</strong>{" "}
              <span>
                {todo.priority}
              </span>
            </Typography>{" "}
            <Typography variant="body1" style={styles.label}>
              <strong>Due Date:</strong>{" "}
              {todo.date ? formatDateInWords(todo.date) : "No date set"}
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