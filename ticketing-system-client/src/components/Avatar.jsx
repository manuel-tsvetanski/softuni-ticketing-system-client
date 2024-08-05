// Avatar.jsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Stack } from '@mui/material';
import Logout from './Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { fetchUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

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
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => handleNavigation('/login')}>Login</Button>
            <Button color="inherit" onClick={() => handleNavigation('/register')}>Register</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Avatar;
