import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/comments/commentsSlice';

function TicketCommentPopup({ open, onClose, ticketId }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.comments);

  const handleAddComment = async () => {
    const resultAction = await dispatch(addComment({ ticketId, commentData: { comment } }));
    if (addComment.fulfilled.match(resultAction)) {
      setComment(''); // Clear the input field after successful comment addition
      onClose(); // Close the dialog
    } else {
      console.error("Error adding comment:", resultAction.payload);
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
          disabled={loading} // Disable input if loading
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>Cancel</Button>
        <Button
          onClick={handleAddComment}
          color="primary"
          variant="contained"
          disabled={loading || !comment.trim()} // Disable if loading or comment is empty
        >
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketCommentPopup;
