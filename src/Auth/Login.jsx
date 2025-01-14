
import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";

function Login() {
  const { email, password, setEmail, setPassword, error, app } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/homepage");
    } catch (error) {
      console.error("Error signing in:", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form style={{ width: "100%", marginTop: "1rem" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>

      <Typography sx={{ mt: 2, textAlign: "center" }}>OR</Typography>

      {/* Google Sign-In Button */}
      <Button
        onClick={signInWithGoogle}
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#4285F4",
          color: "#fff",
          textTransform: "none",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#357ae8",
          },
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google logo"
          style={{
            width: "20px",
            height: "20px",
            marginRight: "8px",
          }}
        />
        Continue with Google
      </Button>
    </Container>
  );
}

export default Login;
