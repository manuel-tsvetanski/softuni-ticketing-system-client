import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Typography, Tooltip, Avatar as MuiAvatar, Box, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import AccountPopup from './AccountPopup';
import useAuth from '../hooks/useAuth';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupMode, setPopupMode] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const backendBaseUrl = "http://localhost:8000";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPopup = (mode) => {
    setPopupMode(mode);
    setPopupOpen(true);
    handleClose();
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    handleClosePopup();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Welcome, {isAuthenticated ? user.name : 'Guest'}
      </Typography>
      <Tooltip title="Account settings" sx={{ mr : 4}}>
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{ borderRadius: 2,  '&:hover': { bgcolor: 'grey.300' , mr : 4 } }}
        >
          {user && user.avatar ? (
            <MuiAvatar
              src={`${backendBaseUrl}/storage/${user.avatar}`}
              alt={user.name}
              sx={{ width: 40, height: 40 , mr : 4}}
            />
          ) : (
            <AccountCircle fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            '& .MuiList-root': {
              p: 0,
            },
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <MenuItem onClick={() => handleOpenPopup('edit-account')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit User Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpenPopup('change-password')}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
      </Menu>
      <AccountPopup
        open={popupOpen}
        onClose={handleClosePopup}
        mode={popupMode}
        user={user}
        onUserUpdate={handleUserUpdate}
      />
    </Box>
  );
}

export default AccountMenu;
