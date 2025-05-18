import { useState, useEffect, useContext } from "react";
import { GeneralContext, AuthContext } from "../../Context/ContextProvider";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const { 
    inboxCount, 
    sundayCount, 
    mondayCount, 
    tuesdayCount, 
    completedCount 
  } = useContext(GeneralContext);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const totalTasks = inboxCount + sundayCount + mondayCount + tuesdayCount;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / (totalTasks + completedCount)) * 100) : 0;

  const statCards = [
    { title: "Total Tasks", value: totalTasks, icon: <AssignmentIcon fontSize="large" color="primary" /> },
    { title: "Completion Rate", value: `${completionRate}%`, icon: <CheckCircleIcon fontSize="large" color="success" /> },
    { title: "Tasks for Today", value: inboxCount, icon: <TodayIcon fontSize="large" color="secondary" /> }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      <Typography variant="h4" gutterBottom>
        {greeting}, {user ? user.displayName || user.email.split('@')[0] : "Guest"}
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 140,
                bgcolor: "background.default",
                borderRadius: 2,
                boxShadow: 3
              }}
            >
              {card.icon}
              <Typography variant="h5" sx={{ mt: 1 }}>
                {card.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Overview
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Inbox</Typography>
              <Typography>{inboxCount}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Sunday</Typography>
              <Typography>{sundayCount}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Monday</Typography>
              <Typography>{mondayCount}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Tuesday</Typography>
              <Typography>{tuesdayCount}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Completed</Typography>
              <Typography>{completedCount}</Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate("/display/inbox")}
            >
              Go to Tasks
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mb: 2 }}
              onClick={() => navigate("/display/inbox")}
            >
              View Inbox
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              sx={{ mb: 2 }}
              onClick={() => navigate("/display/project")}
            >
              Manage Projects
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              fullWidth 
              sx={{ mb: 2 }}
              onClick={() => navigate("/display/completed")}
            >
              View Completed Tasks
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome; 