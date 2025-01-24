import PropTypes from "prop-types";

// import { AuthContext } from "../../Context/ContextProvider";
import AuthIcon from "./AuthIcon";

const Header = ({ toggleSidebar, isCollapsed, arrowRef }) => {
  // const { user, setUser } = useContext(AuthContext);

  // const isMenuOpen = Boolean(anchorEl);

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleLogin = () => {
  //   setAnchorEl(null); // Close the menu
  //   navigate("/login"); // Navigate to login page
  // };

  // const handleLogout = () => {
  //   setUser(null); // Clear user authentication
  //   setAnchorEl(null); // Close the menu
  //   setSnackbarMessage("Successfully logged out!");
  //   setSnackbarOpen(true); // Show snackbar
  // };

  // const handleSnackbarClose = () => {
  //   setSnackbarOpen(false);
  // };

  return (
    <>
      <header data-testid="header">
        <div className="subHeadContainer">
          <div>
            <h1 className="headerTextContent">Plan Your Life</h1>
          </div>
        </div>

        <div className="rightContainer">
          <AuthIcon />
        </div>
      </header>

      {/* Snackbar for notifications */}
      {/* <Snackbar
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
      </Snackbar> */}
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
