import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Logout from '../Authentication/Logout';
import AccountMenu from './AccountMenu';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountMenu />
            <Logout />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
