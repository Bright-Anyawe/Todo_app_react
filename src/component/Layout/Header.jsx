import { useState,  useContext } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextProvider";

const Header = ({ toggleSidebar, isCollapsed, arrowRef }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null); // For menu
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null); // Close the menu
    navigate("/login"); // Navigate to login page
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
      <header data-testid="header">
        <div className="subHeadContainer">
          <div>
            <h1 className="headerTextContent">Plan Your Life</h1>
          </div>
        </div>

        <div className="rightContainer">
          {/* Sidebar Toggle */}
          <div
            className="arrowLeftContainer"
            style={{ position: "absolute", top: "20px", right: "70px" }}
          >
            <svg
              ref={arrowRef}
              style={{
                transform: !isCollapsed ? "rotate(-180deg)" : "",
                transition: "transform 0.5s ease-in-out",
              }}
              className="arrow left"
              onClick={toggleSidebar}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>arrow-left</title>
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
          </div>

          {/* User Icon with Menu */}
          <div
            style={{ position: "absolute", top: "20px", right: "10px" }}
          >
            <IconButton
              aria-label="User Menu"
              onClick={handleMenuOpen}
            >
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

            {/* Menu */}
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
        </div>
      </header>

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

export default Header;

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  arrowRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
