import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContest } from '../../context/ContestContext';
import Sidebar from '../../components/Sidebar';
import Papa from 'papaparse';

const CreateContest = () => {
  const navigate = useNavigate();
  const { createContest, addQuestionsToContest } = useContest();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
    startDate: '',
    endDate: ''
  });
  
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Programming',
    'Frontend',
    'Backend',
    'Database',
    'Computer Science',
    'Mathematics',
    'General Knowledge'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError('Error parsing CSV file');
            return;
          }
          
          const questions = results.data.map((row, index) => ({
            id: index + 1,
            question: row.question || row.Question || '',
            options: [
              row.option1 || row.Option1 || '',
              row.option2 || row.Option2 || '',
              row.option3 || row.Option3 || '',
              row.option4 || row.Option4 || ''
            ].filter(option => option.trim() !== ''),
            correctAnswer: parseInt(row.correctAnswer || row.CorrectAnswer || 0),
            explanation: row.explanation || row.Explanation || ''
          })).filter(q => q.question.trim() !== '');

          setCsvData(questions);
          setSuccess(`Successfully loaded ${questions.length} questions from CSV`);
        },
        error: (error) => {
          setError('Error reading CSV file');
        }
      });
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.duration || formData.duration <= 0) {
      setError('Duration must be greater than 0');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const contestData = {
        ...formData,
        duration: parseInt(formData.duration),
        totalQuestions: csvData.length || 0
      };

      const newContest = createContest(contestData);
      
      if (csvData.length > 0) {
        addQuestionsToContest(newContest.id, csvData);
      }

      setSuccess('Contest created successfully!');
      setTimeout(() => {
        navigate('/admin/contests');
      }, 2000);
    } catch (error) {
      setError('Error creating contest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
        <Typography variant="h4" gutterBottom>
          Create New Contest
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contest Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Upload Questions (CSV)
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Upload a CSV file with columns: question, option1, option2, option3, option4, correctAnswer, explanation
                </Typography>
                <input
                  accept=".csv"
                  type="file"
                  onChange={handleFileUpload}
                  style={{ marginBottom: '16px' }}
                />
              </Grid>

              {csvData.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Preview Questions ({csvData.length} loaded)
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Question</TableCell>
                          <TableCell>Options</TableCell>
                          <TableCell>Correct Answer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {csvData.slice(0, 5).map((question, index) => (
                          <TableRow key={index}>
                            <TableCell>{question.question}</TableCell>
                            <TableCell>
                              {question.options.map((option, optIndex) => (
                                <Chip
                                  key={optIndex}
                                  label={option}
                                  size="small"
                                  variant={optIndex === question.correctAnswer ? 'filled' : 'outlined'}
                                  color={optIndex === question.correctAnswer ? 'success' : 'default'}
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={`Option ${question.correctAnswer + 1}`}
                                color="success"
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {csvData.length > 5 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Showing first 5 questions. Total: {csvData.length} questions
                    </Typography>
                  )}
                </Grid>
              )}

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Contest'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/contests')}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateContest;
