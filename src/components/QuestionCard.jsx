import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  ButtonGroup
} from '@mui/material';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerChange, 
  onSaveNext, 
  onReviewLater, 
  onClearAnswer,
  isLastQuestion = false 
}) => {
  const handleAnswerChange = (event) => {
    onAnswerChange(question.id, parseInt(event.target.value));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Question {question.id}
        </Typography>
        <Typography variant="body1" paragraph>
          {question.question}
        </Typography>
        
        <RadioGroup
          value={selectedAnswer !== undefined ? selectedAnswer.toString() : ''}
          onChange={handleAnswerChange}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index.toString()}
              control={<Radio />}
              label={option}
              sx={{ 
                mb: 1, 
                p: 1, 
                border: '1px solid #e0e0e0', 
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <ButtonGroup variant="outlined">
            <Button onClick={onClearAnswer}>
              Clear Answer
            </Button>
            <Button onClick={onReviewLater}>
              Review Later
            </Button>
          </ButtonGroup>
          
          <Button
            variant="contained"
            onClick={onSaveNext}
            disabled={selectedAnswer === undefined}
          >
            {isLastQuestion ? 'Submit' : 'Save & Next'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
