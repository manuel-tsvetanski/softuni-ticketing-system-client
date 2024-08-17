import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function EditAccount() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    avatar: null,
  });
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const backendBaseUrl = "http://localhost:8000";

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        avatar: null,
      });
      if (user.avatar) {
        setPreviewAvatar(`${backendBaseUrl}/storage/${user.avatar}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('name', formData.name);
      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await api.post('/update-account', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Account updated successfully!');
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
          Edit User Account
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
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            {previewAvatar && (
              <img
                src={previewAvatar}
                alt="avatar preview"
                style={{ width: 60, height: 60, borderRadius: '50%', marginRight: 10 }}
              />
            )}
            <Button variant="contained" component="label">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
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

export default EditAccount;
