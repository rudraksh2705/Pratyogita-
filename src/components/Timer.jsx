import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  useEffect(() => {
    const progressPercent = (timeLeft / (duration * 60)) * 100;
    setProgress(progressPercent);
  }, [timeLeft, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getColor = () => {
    if (progress > 50) return 'primary';
    if (progress > 25) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" color={getColor()}>
          Time Remaining: {formatTime(timeLeft)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Math.round(progress)}% remaining
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        color={getColor()}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};

export default Timer;
