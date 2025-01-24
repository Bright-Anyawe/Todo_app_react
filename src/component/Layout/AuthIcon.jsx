import { Avatar, IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextProvider";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext,useState } from "react";


const AuthIcon = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's mobile screen size

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

  const handleLogout = () => {
    setUser(null); // Clear user authentication
    setAnchorEl(null); // Close the menu
    setSnackbarMessage("Successfully logged out!");
    setSnackbarOpen(true); // Show snackbar
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Conditionally render AuthIcon in Sidebar or Header */}
      {isMobile ? (
        // Render in Sidebar for mobile
        <div style={{ position: "absolute", top: "20px", right: "10px" }}>
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
      ) : (
        // Render in Header for desktop
        <div style={{ position: "absolute", top: "20px", right: "10px" }}>
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
      )}

      {/* Snackbar for notifications */}
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
