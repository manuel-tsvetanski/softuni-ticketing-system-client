import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container, Stack, Typography } from '@mui/material';
import Avatar from './AccountSettings/Avatar';
import TicketList from './Ticket/TicketList'; // Import TicketList

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
          {user ? `Welcome, ${user.name}!` : 'Welcome Guest! Please log in to access your dashboard.'}
        </Typography>
        {user && (
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 1 }}
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </Button>
        )}
        {!user && (
          <>
            <Typography
            variant="h4" // Change to a larger variant for more emphasis
            sx={{
              mt: 2,
              fontWeight: 'bold', // Make the text bold
              textAlign: 'center', // Center-align the text
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
              WebkitBackgroundClip: 'text', // Use the gradient as the text color
              WebkitTextFillColor: 'transparent', // Make the background visible as text color
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add a subtle shadow for depth
            }}
          >
            Browse Tickets
          </Typography>
          <TicketList /> {/* Show TicketList only for guest users */}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Home;
