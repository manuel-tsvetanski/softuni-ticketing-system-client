import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container, Stack, Typography } from '@mui/material';
import Avatar from './AccountSettings/Avatar';

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Accessing user data from Redux

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm">
      <Avatar />
      <Stack spacing={2} direction="column" sx={{ mt: 2 }}>
        <Typography variant="h6">
          {user ? `Welcome, ${user.name}!` : 'Welcome! Please log in to access your dashboard.'}
        </Typography>
        {user && (
          <Button variant="contained" color="primary" onClick={() => handleNavigation('/dashboard')}>
            Dashboard
          </Button>
        )}
        {!user && (
          <Button variant="contained" color="secondary" onClick={() => handleNavigation('/login')}>
            Login
          </Button>
        )}
      </Stack>
    </Container>
  );
}

export default Home;
