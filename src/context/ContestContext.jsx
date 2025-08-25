import React, { createContext, useContext, useState, useEffect } from 'react';

const ContestContext = createContext();

export const useContest = () => {
  const context = useContext(ContestContext);
  if (!context) {
    throw new Error('useContest must be used within a ContestProvider');
  }
  return context;
};

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    // Load data from localStorage
    const storedContests = JSON.parse(localStorage.getItem('contests') || '[]');
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const storedResults = JSON.parse(localStorage.getItem('results') || '[]');
    const storedQuestions = JSON.parse(localStorage.getItem('questions') || '{}');

    setContests(storedContests);
    setEnrollments(storedEnrollments);
    setResults(storedResults);
    setQuestions(storedQuestions);
  }, []);

  const enrollInContest = (userId, contestId) => {
    const enrollment = {
      id: Date.now(),
      userId,
      contestId,
      enrolledAt: new Date().toISOString(),
      status: 'enrolled'
    };

    const newEnrollments = [...enrollments, enrollment];
    setEnrollments(newEnrollments);
    localStorage.setItem('enrollments', JSON.stringify(newEnrollments));
    return enrollment;
  };

  const submitContest = (userId, contestId, answers, timeTaken) => {
    const contest = contests.find(c => c.id === contestId);
    const contestQuestions = questions[contestId] || [];
    
    let correctAnswers = 0;
    const detailedAnswers = contestQuestions.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: q.id,
        question: q.question,
        userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Not answered',
        correctAnswer: q.options[q.correctAnswer],
        isCorrect,
        explanation: q.explanation
      };
    });

    const score = (correctAnswers / contestQuestions.length) * 100;
    
    const result = {
      id: Date.now(),
      userId,
      contestId,
      contestTitle: contest.title,
      answers: detailedAnswers,
      score: Math.round(score * 100) / 100,
      totalQuestions: contestQuestions.length,
      correctAnswers,
      timeTaken,
      submittedAt: new Date().toISOString()
    };

    const newResults = [...results, result];
    setResults(newResults);
    localStorage.setItem('results', JSON.stringify(newResults));

    // Update enrollment status
    const newEnrollments = enrollments.map(e => 
      e.userId === userId && e.contestId === contestId 
        ? { ...e, status: 'completed' }
        : e
    );
    setEnrollments(newEnrollments);
    localStorage.setItem('enrollments', JSON.stringify(newEnrollments));

    return result;
  };

  const createContest = (contestData) => {
    const newContest = {
      id: Date.now(),
      ...contestData,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const newContests = [...contests, newContest];
    setContests(newContests);
    localStorage.setItem('contests', JSON.stringify(newContests));
    return newContest;
  };

  const updateContest = (contestId, updates) => {
    const newContests = contests.map(c => 
      c.id === contestId ? { ...c, ...updates } : c
    );
    setContests(newContests);
    localStorage.setItem('contests', JSON.stringify(newContests));
  };

  const addQuestionsToContest = (contestId, newQuestions) => {
    const existingQuestions = questions[contestId] || [];
    const updatedQuestions = {
      ...questions,
      [contestId]: [...existingQuestions, ...newQuestions]
    };
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const getUserEnrollments = (userId) => {
    return enrollments.filter(e => e.userId === userId);
  };

  const getUserResults = (userId) => {
    return results.filter(r => r.userId === userId);
  };

  const getContestParticipants = (contestId) => {
    return enrollments.filter(e => e.contestId === contestId);
  };

  const getContestResults = (contestId) => {
    return results.filter(r => r.contestId === contestId);
  };

  const value = {
    contests,
    enrollments,
    results,
    questions,
    enrollInContest,
    submitContest,
    createContest,
    updateContest,
    addQuestionsToContest,
    getUserEnrollments,
    getUserResults,
    getContestParticipants,
    getContestResults
  };

  return (
    <ContestContext.Provider value={value}>
      {children}
    </ContestContext.Provider>
  );
};
