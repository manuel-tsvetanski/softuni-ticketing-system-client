import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Tooltip, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import AccountPopup from './AccountPopup'; // Import the popup component
import useAuth from '../hooks/useAuth'; // Import the useAuth hook if needed

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupMode, setPopupMode] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useAuth(); // Get user data from context

  // Define the base URL for your backend server
  const backendBaseUrl = "http://localhost:8000"; // Change to your backend URL

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

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{ 
            borderRadius: 2, 
            mr: 2,
            '&:hover': { bgcolor: 'grey.300' } 
          }}
        >
          {user && user.avatar ? (
            <Avatar 
              src={`${backendBaseUrl}/storage/${user.avatar}`} // Construct the full URL
              alt={user.name}
              sx={{ width: 40, height: 40 }}
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
        user={user} // Pass user data as a prop
      />
    </>
  );
}

export default AccountMenu;
