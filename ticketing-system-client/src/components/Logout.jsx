// Logout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ConfirmationDialog from './ConfirmationDialog';


function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/logout');
      console.log(response.data.message); // Successfully logged out
      localStorage.removeItem('token'); // Remove the stored token
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} startIcon={<ExitToAppIcon />}>
        Logout
      </Button>
      <ConfirmationDialog
        open={open}
        title="Confirm Logout"
        description="Are you sure you want to logout from the application? All unsaved changes will be lost."
        onConfirm={handleLogout}
        onCancel={handleClose}
        confirmButtonText="Logout"
        cancelButtonText="Cancel"
        confirmButtonColor="error"
        confirmButtonIcon={<ExitToAppIcon />}
      />
    </>
  );
}

export default Logout;
