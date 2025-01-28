import { Link } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 4,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
        className="w-full max-w-xl"
      >
        <Typography variant="h2" className="text-gray-800 font-bold mb-4">
          404
        </Typography>
        <Typography variant="h5" className="text-gray-600 mb-6">
          Oh no, this route doesn&apos;t exist!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: 1.5,
            px: 4,
          }}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
