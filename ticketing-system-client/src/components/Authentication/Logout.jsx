import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ConfirmationDialog from '../ConfirmationDialogPopup';
import { logout } from '../../features/auth/authSlice'; // Adjust the import path based on your project structure

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
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
