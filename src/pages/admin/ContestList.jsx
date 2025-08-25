import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Switch
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContest } from '../../context/ContestContext';
import Sidebar from '../../components/Sidebar';

const ContestList = () => {
  const navigate = useNavigate();
  const { contests, updateContest, getContestParticipants } = useContest();
  const [loading, setLoading] = useState({});

  const handleToggleActive = async (contestId, isActive) => {
    setLoading(prev => ({ ...prev, [contestId]: true }));
    try {
      updateContest(contestId, { isActive: !isActive });
    } catch (error) {
      console.error('Error updating contest:', error);
    } finally {
      setLoading(prev => ({ ...prev, [contestId]: false }));
    }
  };

  const handleViewParticipants = (contestId) => {
    navigate(`/admin/participants/${contestId}`);
  };

  const handleViewResults = (contestId) => {
    navigate(`/admin/results/${contestId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Manage Contests
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/create-contest')}
          >
            Create Contest
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Questions</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contests.map((contest) => {
                const participants = getContestParticipants(contest.id);
                return (
                  <TableRow key={contest.id}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {contest.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contest.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={contest.category} size="small" />
                    </TableCell>
                    <TableCell>{contest.duration} min</TableCell>
                    <TableCell>{contest.totalQuestions}</TableCell>
                    <TableCell>
                      <Chip
                        label={contest.isActive ? 'Active' : 'Inactive'}
                        color={contest.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{participants.length}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewParticipants(contest.id)}
                          title="View Participants"
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleViewResults(contest.id)}
                          title="View Results"
                        >
                          <EditIcon />
                        </IconButton>
                        <Switch
                          checked={contest.isActive}
                          onChange={() => handleToggleActive(contest.id, contest.isActive)}
                          disabled={loading[contest.id]}
                          size="small"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {contests.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No contests found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/create-contest')}
              sx={{ mt: 2 }}
            >
              Create Your First Contest
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ContestList;
