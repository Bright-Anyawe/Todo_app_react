
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const TodoDetails = ({ open, onClose, todo }) {
     
     Dialog open={open} onClose={onClose}>
      <DialogTitle>Todo Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Task: {todo.taskTitle}</Typography>
        <Typography variant="body1">Description: {todo.description}</Typography>
        <Typography variant="body1">Priority: {todo.priority}</Typography>
        <Typography variant="body1">Due Date: {todo.date}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dia
}