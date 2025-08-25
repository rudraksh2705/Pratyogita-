import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContest } from '../context/ContestContext';

const Contests = () => {
  const [tabValue, setTabValue] = useState(0);
  const { currentUser } = useAuth();
  const { 
    contests, 
    enrollments, 
    results, 
    enrollInContest, 
    getUserEnrollments, 
    getUserResults 
  } = useContest();
  const navigate = useNavigate();

  const userEnrollments = getUserEnrollments(currentUser.id);
  const userResults = getUserResults(currentUser.id);

  const activeContests = contests.filter(contest => contest.isActive);
  const pastContests = contests.filter(contest => !contest.isActive);

  const isEnrolled = (contestId) => {
    return userEnrollments.some(e => e.contestId === contestId);
  };

  const hasCompleted = (contestId) => {
    return userResults.some(r => r.contestId === contestId);
  };

  const getResult = (contestId) => {
    return userResults.find(r => r.contestId === contestId);
  };

  const handleEnroll = (contestId) => {
    enrollInContest(currentUser.id, contestId);
  };

  const handleStart = (contestId) => {
    navigate(`/exam/${contestId}`);
  };

  const handleViewResult = (resultId) => {
    navigate(`/results/${resultId}`);
  };

  const ContestCard = ({ contest, showActions = true }) => {
    const enrolled = isEnrolled(contest.id);
    const completed = hasCompleted(contest.id);
    const result = getResult(contest.id);

    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {contest.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {contest.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={contest.category} 
              size="small" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              label={`${contest.duration} min`} 
              size="small" 
              variant="outlined" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              label={`${contest.totalQuestions} questions`} 
              size="small" 
              variant="outlined" 
            />
          </Box>
          {completed && result && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Score: {result.score}% ({result.correctAnswers}/{result.totalQuestions})
            </Alert>
          )}
        </CardContent>
        {showActions && (
          <CardActions>
            {!enrolled ? (
              <Button 
                size="small" 
                variant="contained" 
                onClick={() => handleEnroll(contest.id)}
              >
                Register
              </Button>
            ) : !completed ? (
              <Button 
                size="small" 
                variant="contained" 
                onClick={() => handleStart(contest.id)}
              >
                Start
              </Button>
            ) : (
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleViewResult(result.id)}
              >
                View Result
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contests
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Active Contests" />
          <Tab label="My Contests" />
          <Tab label="Past Contests" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Available Contests
          </Typography>
          {activeContests.length === 0 ? (
            <Alert severity="info">No active contests available at the moment.</Alert>
          ) : (
            <Grid container spacing={3}>
              {activeContests.map((contest) => (
                <Grid item xs={12} sm={6} md={4} key={contest.id}>
                  <ContestCard contest={contest} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            My Contests
          </Typography>
          {userEnrollments.length === 0 ? (
            <Alert severity="info">You haven't enrolled in any contests yet.</Alert>
          ) : (
            <Grid container spacing={3}>
              {userEnrollments.map((enrollment) => {
                const contest = contests.find(c => c.id === enrollment.contestId);
                if (!contest) return null;
                return (
                  <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
                    <ContestCard contest={contest} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Past Contests
          </Typography>
          {pastContests.length === 0 ? (
            <Alert severity="info">No past contests available.</Alert>
          ) : (
            <Grid container spacing={3}>
              {pastContests.map((contest) => (
                <Grid item xs={12} sm={6} md={4} key={contest.id}>
                  <ContestCard contest={contest} showActions={false} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Contests;
