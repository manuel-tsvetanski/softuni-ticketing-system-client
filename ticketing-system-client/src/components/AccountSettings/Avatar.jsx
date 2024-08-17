import React, { useEffect } from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Logout from '../Authentication/Logout';
import AccountMenu from './AccountMenu';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserApp } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserApp());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        {/* Account settings on the left */}
        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountMenu />
          </Box>
        )}

        {/* Center space to push content to the sides */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout on the right if authenticated, otherwise Login and Register */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated ? (
            <Logout />
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
