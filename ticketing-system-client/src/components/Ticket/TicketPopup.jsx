// TicketPopup.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { statusOptions } from '../../utils/statusUtils'; // Import the status options

function TicketPopup({ open, onClose, onSubmit, initialData = {}, isEdit, isView }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'open');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ title, description, status });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isView ? "View Ticket" : isEdit ? "Edit Ticket" : "Create Ticket"}</DialogTitle>
      <DialogContent>
        {isView ? (
          <>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1" gutterBottom>{description}</Typography>
            <Typography variant="caption" display="block" gutterBottom>Status: {status}</Typography>
          </>
        ) : (
          <>
            <TextField
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isView}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              disabled={isView}
            />
            {isEdit && (
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} {option.icon}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        {!isView && <Button onClick={handleSubmit} color="primary" variant="contained">
          {isEdit ? "Update" : "Create"}
        </Button>}
      </DialogActions>
    </Dialog>
  );
}

export default TicketPopup;
