import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // Import Outlet here
import { useSelector } from 'react-redux';
import Avatar from './AccountSettings/Avatar';
import TicketList from './Ticket/TicketList';
import { Button, useTheme, Box, Typography } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Example of using Redux state directly in Dashboard, if needed
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ padding: 2 }}>
      <Avatar user={user} />
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, rgba(85,108,214,1) 0%, rgba(25,133,123,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          animation: 'fadeIn 2s ease-in-out',
        }}
      >
        {user
          ? `Welcome, to your dashboard ${user.name}!`
          : 'Welcome! Please log in to access your dashboard.'}
      </Typography>
      <TicketList />
      <Button
            variant="outlined" 
            color="primary" 
            sx={{ mt: 1 }}
            onClick={() => navigate('/')}
          >
            Back to Home
        </Button>
      <Outlet /> {/* This will render nested routes if any */}
    </Box>
  );
}

export default Dashboard;
