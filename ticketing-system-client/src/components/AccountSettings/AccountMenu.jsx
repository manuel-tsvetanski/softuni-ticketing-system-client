import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Avatar as MuiAvatar,
  Box
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const backendBaseUrl = "http://localhost:8000";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Account settings">
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{ borderRadius: 2, '&:hover': { bgcolor: 'grey.300' } }}
        >
          {isAuthenticated && user && user.avatar ? (
            <MuiAvatar
              src={`${backendBaseUrl}/storage/${user.avatar}`}
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
        <MenuItem onClick={() => handleNavigate('/edit-account')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit User Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/change-password')}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default AccountMenu;
