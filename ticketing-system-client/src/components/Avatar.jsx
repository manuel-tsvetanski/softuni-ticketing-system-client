// Avatar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Logout from './Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Avatar({ user }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {user ? user.name : 'Guest'}
        </Typography>
        {user ? (
          <div>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Logout />
          </div>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
