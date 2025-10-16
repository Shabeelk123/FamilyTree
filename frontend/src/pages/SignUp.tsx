import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useToast } from "../components/ToastProvider";

const Signup = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      showError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const token = await register(form);
      localStorage.setItem("token", token);
      showSuccess(`Welcome ${form.name}! Account created successfully!`);
      navigate("/");
    } catch (error: any) {
      showError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Signup
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
          <Button
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
