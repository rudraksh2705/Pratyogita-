import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContest } from "../../context/ContestContext";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { contests, enrollments, results } = useContest();

  const activeContests = contests.filter((c) => c.isActive);
  const totalParticipants = enrollments.length;
  const totalResults = results.length;
  const averageScore =
    results.length > 0
      ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(
          1
        )
      : 0;

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card
      elevation={3}
      sx={{
        cursor: onClick ? "pointer" : "default",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: onClick ? "translateY(-4px)" : "none",
          boxShadow: 6,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color={color}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: color }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Sidebar />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            ml: "100px",
            backgroundColor: "#f9fafb",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Admin Dashboard
          </Typography>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Contests"
                value={activeContests.length}
                icon={<QuizIcon sx={{ fontSize: 40 }} />}
                color="primary.main"
                onClick={() => navigate("/admin/contests")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Participants"
                value={totalParticipants}
                icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                color="success.main"
                onClick={() => navigate("/admin/participants")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Completed Tests"
                value={totalResults}
                icon={<AssessmentIcon sx={{ fontSize: 40 }} />}
                color="info.main"
                onClick={() => navigate("/admin/results")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Average Score"
                value={`${averageScore}%`}
                icon={<AssessmentIcon sx={{ fontSize: 40 }} />}
                color="warning.main"
              />
            </Grid>
          </Grid>

          {/* Quick Actions + Recent Activity */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/admin/create-contest")}
                  >
                    Create New Contest
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/admin/contests")}
                  >
                    Manage Contests
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/admin/results")}
                  >
                    View All Results
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Activity
                </Typography>
                {results.slice(0, 5).map((result) => (
                  <Box
                    key={result.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {result.contestTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Score: {result.score}% •{" "}
                      {new Date(result.submittedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
                {results.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No recent activity
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
