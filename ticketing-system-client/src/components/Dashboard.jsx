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
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
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
