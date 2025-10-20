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
import { login } from "../services/authService";
import { useToast } from "../components/ToastProvider";

const Login = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      showError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const token = await login(form);
      localStorage.setItem("token", token);
      showSuccess("Login successful! Welcome back!");
      navigate("/");
    } catch (error: any) {
      showError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }} style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
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
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
