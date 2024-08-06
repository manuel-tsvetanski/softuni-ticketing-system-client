// Avatar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import Logout from './Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuth from '../hooks/useAuth'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Welcome, {isAuthenticated ? user.name : 'Guest'}
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Logout />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
