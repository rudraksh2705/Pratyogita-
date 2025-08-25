import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contests from "./pages/Contests";
import Exam from "./pages/Exam";
import Results from "./pages/Results";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/admin/Dashboard";
import ContestList from "./pages/admin/ContestList";
import CreateContest from "./pages/admin/CreateContest";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {currentUser && <Navbar />}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/contests" /> : <Login />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/contests" /> : <Signup />}
          />

          {/* Protected routes */}
          <Route
            path="/contests"
            element={
              <ProtectedRoute>
                <Contests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:id"
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results/:id"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thank-you"
            element={
              <ProtectedRoute>
                <ThankYou />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/contests"
            element={
              <AdminRoute>
                <ContestList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-contest"
            element={
              <AdminRoute>
                <CreateContest />
              </AdminRoute>
            }
          />

          {/* Default route */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/contests" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
