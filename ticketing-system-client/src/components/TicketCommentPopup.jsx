// TicketCommentPopup.jsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from '@mui/material';
import api from '../api';

function TicketCommentPopup({ open, onClose, ticketId, onCommentAdded }) {
  const [comment, setComment] = useState('');

  const handleAddComment = async () => {
    try {
      const response = await api.post(`/tickets/${ticketId}/comments`, { comment });
      onCommentAdded(response.data); // Pass the actual comment data
      setComment('');
      onClose();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Comment"
          type="text"
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleAddComment} color="primary" variant="contained">Add Comment</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketCommentPopup;
