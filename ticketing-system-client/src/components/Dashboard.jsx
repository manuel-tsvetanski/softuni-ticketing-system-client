// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Outlet } from 'react-router-dom';
import Avatar from './Avatar';
import TicketList from './TicketList';
import { Button , useTheme } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div>
      <Avatar />
      <h1>Dashboard</h1>
      <TicketList />
      <Button
            //variant="outlined"
            onClick={() => navigate(-1)} // Navigate to the previous page
            sx={{ 
              width: 1/4,
              mt: 1,
              backgroundColor: theme.palette.primary.main, // Use theme primary color for background
              color: theme.palette.primary.contrastText, // Use theme primary contrast text color
              '&:hover': {
                backgroundColor: theme.palette.primary.dark, // Darker shade on hover
              }
            }}
          >
            Home
      </Button>
      <Outlet />
    </div>
  );
}

export default Dashboard;
