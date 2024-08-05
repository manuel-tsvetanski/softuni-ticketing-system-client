import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Stack } from '@mui/material';
import Avatar from './Avatar'; // Ensure this is correctly imported

function Home() {
  const navigate = useNavigate();

  // Mock user data, replace or integrate with actual user state management logic
  const user = {
    name: 'John Doe',
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm">
      <Avatar user={user} />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Welcome to the Ticketing System
      </Typography>
      <Stack spacing={2} direction="column">
        <Button variant="contained" color="primary" onClick={() => handleNavigation('/login')}>
          Login
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleNavigation('/register')}>
          Register
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleNavigation('/dashboard')}>
          Dashboard
        </Button>
      </Stack>
    </Container>
  );
}

export default Home;
