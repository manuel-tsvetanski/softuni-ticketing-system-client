import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Container, Typography, Box
} from '@mui/material';
import api from '../api';

function AccountPopup({ open, onClose, mode, user }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const isEditAccountMode = mode === 'edit-account';
  const isChangePasswordMode = mode === 'change-password';

  useEffect(() => {
    if (isEditAccountMode && user) {
      // Prefill the form with user data
      setName(user.name);
      setEmail(user.email);
    }
  }, [isEditAccountMode, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditAccountMode) {
        // Call API to update user account
        await api.put('/update-account', { email, name });
      } else if (isChangePasswordMode) {
        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
          alert("New password and confirmation do not match.");
          return;
        }
        // Call API to change password
        await api.post('/change-password', { current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmNewPassword });
      }
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error("There was an error processing your request!", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DialogTitle>
            <Typography component="h1" variant="h5">
              {isEditAccountMode ? 'Edit User Account' : 'Change Password'}
            </Typography>
          </DialogTitle>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isEditAccountMode && (
              <>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            {isChangePasswordMode && (
              <>
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </>
            )}
            <DialogActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                {isEditAccountMode ? 'Save Changes' : 'Change Password'}
              </Button>
              <Button onClick={onClose} color="primary">Cancel</Button>
            </DialogActions>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AccountPopup;
