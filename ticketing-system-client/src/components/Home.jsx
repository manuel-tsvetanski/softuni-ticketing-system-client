import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import Avatar from './AccountSettings/Avatar';

function Home() {
  const navigate = useNavigate();
  const user = null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm">
      <Avatar />
      <Stack spacing={2} direction="column" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleNavigation('/dashboard')}>
          Dashboard
        </Button>
      </Stack>
    </Container>
  );
}

export default Home;
