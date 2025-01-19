import { useContext } from "react";
import { signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {  GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Context/ContextProvider";
import { onAuthStateChanged } from "firebase/auth";

// import { app } from "../FireBase/FireBase";
import { auth } from "../FireBase/FireBase";

function Login() {
  const {
    setUser,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    error,
    setError,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email, photoURL } = result.user;
      console.log("User signed in via popup:", { displayName, email, photoURL });
      setUser({ displayName, email, photoURL });
      navigate("/display/inbox");
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        console.warn("Popup blocked. Falling back to redirect...");
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
        console.log("Redirect result:", result);
        console.log(window.location.href)
  
        if (result) {
          const { displayName, email, photoURL } = result.user;
          console.log("User details:", { displayName, email, photoURL });
          setUser({ displayName, email, photoURL });
          navigate("/display/inbox");

        } else {
          console.log("No redirect result available.");
        }
      } catch (error) {
        console.error("Error fetching redirect result:", error.message);
      }
    };
  
    fetchRedirectResult();
  }, [setUser, setError, navigate]);
  

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="bg-[#722F37] min-h-screen flex items-center justify-center"
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 4,
          padding: 4,
          boxShadow: 3,
          textAlign: "center",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          className="font-semibold text-gray-800"
        >
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username or Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="bg-gray-200 rounded-lg"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 rounded-lg"
          />
          {error && (
            <Typography color="error" variant="body2" className="mt-2">
              {error}
            </Typography>
          )}

          <div className=" bottomSection flex flex-col items-center justify-center gap-10">
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
            >
              Login
            </Button>

            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <a href="/signup" className="hover:underline">
                Sign Up
              </a>
              <a href="/forgot-password" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* <hr className="my-4" /> */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded"
              onClick={signInWithGoogle}
            >
              Login with Google
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
