import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveTicket } from '../../features/tickets/ticketsSlice';
import { statusOptions } from '../../utils/statusUtils';

function TicketPopup({ open, onClose, initialData = {}, isEdit, isView }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'open');
    }
  }, [initialData]);

  const handleSubmit = () => {
    const ticketData = { title, description, status };
    const ticketId = initialData.id || null;
    dispatch(saveTicket({ ticketId, ticketData }));
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
              disabled={loading || isView}
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
              disabled={loading || isView}
            />
            {isEdit && (
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                  disabled={loading}
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
        <Button onClick={onClose} color="primary" disabled={loading}>Close</Button>
        {!isView && (
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading || !title.trim() || !description.trim()} // Validate form inputs
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TicketPopup;
