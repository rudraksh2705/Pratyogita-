import React from "react";
import { Box, Paper, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 6, width: "100%", textAlign: "center" }}>
          <CheckCircleIcon
            sx={{ fontSize: 80, color: "success.main", mb: 3 }}
          />

          <Typography variant="h4" gutterBottom>
            Thank You!
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph>
            Thanks for completing the contest on Pratyogita.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Your answers have been submitted successfully. You can view your
            results from the contests page or check your email for detailed
            feedback.
          </Typography>

          <Box
            sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/contests")}
            >
              Back to Contests
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ThankYou;
