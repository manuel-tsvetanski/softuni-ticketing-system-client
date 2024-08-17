import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../../features/comments/commentsSlice';

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
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"  // Increase the size of the dialog to medium
      PaperProps={{
        sx: {
          minHeight: '400px',  // Set a minimum height
        }
      }}
    >
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <ReactQuill 
          value={comment} 
          onChange={setComment} 
          placeholder="Enter your comment..."
          style={{ height: '200px', marginBottom: '20px' }}  // Increase the height of the editor
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
