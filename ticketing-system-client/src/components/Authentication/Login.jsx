import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { loginUser } from '../../features/auth/authSlice';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errorMessage, isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true); // Set form as submitted
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (hasSubmitted) {
    }
  }, [errorMessage, hasSubmitted]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {hasSubmitted && errorMessage && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ mt: 1 }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
