import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'; // Ensure Button is imported here
import Logout from './Logout';
import AccountMenu from './AccountMenu';
import useAuth from '../hooks/useAuth';
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
            <AccountMenu />
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
