import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextProvider";
import PersonIcon from "@mui/icons-material/Person";

import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBase/FireBase";
import { ProjectContext } from "../../Context/ContextProvider";

const AuthIcon = ({ className }) => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const { projects } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  const handleLogout = async () => {
    if (projects.length) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }

    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);

    setAnchorEl(null);
    setSnackbarMessage("Successfully logged out!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div
        style={{ position: "absolute", top: "20px", right: "10px" }}
        className={`relative ${className}`}
      >
        <IconButton aria-label="User Menu" onClick={handleMenuOpen}>
          {user && user.photoURL ? (
            <Avatar
              src={user.photoURL}
              alt={user.displayName || "User Icon"}
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar sx={{ width: 40, height: 40 }}>
              <PersonIcon />
            </Avatar>
          )}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {!user ? (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          ) : (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          )}
        </Menu>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthIcon;
