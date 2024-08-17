import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrors({ confirmNewPassword: 'New password and confirmation do not match.' });
      return;
    }

    try {
      const response = await api.post('/change-password', {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmNewPassword,
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || { general: error.response.data.error });
      } else {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errors.general && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {errors.general}
            </Alert>
          )}
          {successMessage && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {successMessage}
          </Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={formData.currentPassword}
            onChange={handleChange}
            error={!!errors.current_password}
            helperText={errors.current_password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.new_password}
            helperText={errors.new_password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            autoComplete="new-password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
        {user && (
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 1 }}
            onClick={() => handleNavigation('/dashboard')}>
                Dashboard
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default ChangePassword;
