import { useContext, useEffect } from "react";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/ContextProvider";
import { auth } from "../FireBase/FireBase";

function Login() {
  const { setUser, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email, photoURL } = result.user;
      setUser({ displayName, email, photoURL });
      navigate("/display/inbox");
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
      } else {
        console.error("Error signing in:", error.message);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const { displayName, email, photoURL } = result.user;
          setUser({ displayName, email, photoURL });
          navigate("/display/inbox");
        }
      } catch (error) {
        console.error("Error fetching redirect result:", error.message);
        setError(error.message);
      }
    };

    fetchRedirectResult();
  }, [setUser, setError, navigate]);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sign in with your Google account to continue.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="error"
          sx={{
            mt: 3,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: 2,
          }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
