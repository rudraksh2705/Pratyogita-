import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContest } from '../context/ContestContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { results } = useContest();

  const result = results.find(r => r.id === parseInt(id));

  if (!result) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Result Not Found
        </Typography>
        <Button onClick={() => navigate('/contests')}>
          Back to Contests
        </Button>
      </Box>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contest Results
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {result.contestTitle}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h3" color={getScoreColor(result.score)}>
                {result.score}%
              </Typography>
              <Box>
                <Typography variant="h6">
                  {getScoreLabel(result.score)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.correctAnswers} out of {result.totalQuestions} correct
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body1" gutterBottom>
                <strong>Time Taken:</strong> {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Submitted:</strong> {new Date(result.submittedAt).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Detailed Analysis
      </Typography>

      {result.answers.map((answer, index) => (
        <Accordion key={answer.questionId} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="subtitle1">
                Question {index + 1}
              </Typography>
              <Chip
                label={answer.isCorrect ? 'Correct' : 'Incorrect'}
                color={answer.isCorrect ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="body1" paragraph>
                <strong>Question:</strong> {answer.question}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Your Answer:</strong> {answer.userAnswer}
              </Typography>
              
              <Typography variant="body2" color="success.main" paragraph>
                <strong>Correct Answer:</strong> {answer.correctAnswer}
              </Typography>
              
              {answer.explanation && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Explanation:</strong> {answer.explanation}
                </Typography>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/contests')}
        >
          Back to Contests
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Results;
