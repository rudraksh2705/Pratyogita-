import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContest } from '../context/ContestContext';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const Exam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { contests, questions, submitContest } = useContest();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewLater, setReviewLater] = useState(new Set());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const contest = contests.find(c => c.id === parseInt(id));
  const contestQuestions = questions[parseInt(id)] || [];

  useEffect(() => {
    if (!contest) {
      navigate('/contests');
      return;
    }

    // Check if user is enrolled
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const isEnrolled = enrollments.some(e => 
      e.userId === currentUser.id && e.contestId === parseInt(id)
    );

    if (!isEnrolled) {
      navigate('/contests');
      return;
    }

    // Check if already completed
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const isCompleted = results.some(r => 
      r.userId === currentUser.id && r.contestId === parseInt(id)
    );

    if (isCompleted) {
      navigate('/contests');
      return;
    }
  }, [contest, currentUser, id, navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSaveNext = () => {
    if (currentQuestionIndex < contestQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSubmitDialog(true);
    }
  };

  const handleReviewLater = () => {
    const currentQuestion = contestQuestions[currentQuestionIndex];
    setReviewLater(prev => new Set([...prev, currentQuestion.id]));
    
    if (currentQuestionIndex < contestQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleClearAnswer = () => {
    const currentQuestion = contestQuestions[currentQuestionIndex];
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    const timeTaken = contest.duration * 60; // In seconds
    const result = submitContest(currentUser.id, parseInt(id), answers, timeTaken);
    setShowSubmitDialog(false);
    navigate('/thank-you');
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    const timeTaken = contest.duration * 60;
    const result = submitContest(currentUser.id, parseInt(id), answers, timeTaken);
    navigate('/thank-you');
  };

  if (!contest) {
    return <Typography>Contest not found</Typography>;
  }

  const currentQuestion = contestQuestions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;
  const reviewedQuestions = reviewLater.size;

  return (
    <Box>
      <Timer duration={contest.duration} onTimeUp={handleTimeUp} />
      
      <Typography variant="h4" gutterBottom>
        {contest.title}
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Progress: {answeredQuestions}/{contestQuestions.length} questions answered
        {reviewedQuestions > 0 && ` • ${reviewedQuestions} marked for review`}
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerChange={handleAnswerChange}
              onSaveNext={handleSaveNext}
              onReviewLater={handleReviewLater}
              onClearAnswer={handleClearAnswer}
              isLastQuestion={currentQuestionIndex === contestQuestions.length - 1}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Question Navigator
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {contestQuestions.map((question, index) => {
                const isAnswered = answers[question.id] !== undefined;
                const isReviewed = reviewLater.has(question.id);
                const isCurrent = index === currentQuestionIndex;

                let color = 'default';
                if (isCurrent) color = 'primary';
                else if (isAnswered) color = 'success';
                else if (isReviewed) color = 'warning';

                return (
                  <Chip
                    key={question.id}
                    label={question.id}
                    color={color}
                    variant={isCurrent ? 'filled' : 'outlined'}
                    onClick={() => handleQuestionNavigation(index)}
                    sx={{ cursor: 'pointer' }}
                  />
                );
              })}
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Legend:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label="Current" color="primary" size="small" />
                <Chip label="Answered" color="success" size="small" variant="outlined" />
                <Chip label="Review" color="warning" size="small" variant="outlined" />
                <Chip label="Unanswered" size="small" variant="outlined" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <DialogTitle>Submit Contest</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your contest? You cannot change your answers after submission.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Answered: {answeredQuestions}/{contestQuestions.length} questions
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit Contest
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Exam;
