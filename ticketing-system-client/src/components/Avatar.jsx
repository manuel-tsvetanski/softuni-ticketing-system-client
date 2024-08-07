import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Logout from './Logout';
import AccountMenu from './AccountMenu';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountMenu />
        </Box>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Logout />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
