import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import { Delete as DeleteIcon, AddComment as AddCommentIcon } from '@mui/icons-material';
import api from '../api';
import useAuth from '../hooks/useAuth';
import TicketCommentPopup from './TicketCommentPopup';
import ConfirmationDialog from './ConfirmationDialogPopup';

function TicketCommentList({ ticketId, open, onClose, onUpdateCommentCount }) {
  const [comments, setComments] = useState([]);
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (ticketId) {
      api.get(`/tickets/${ticketId}/comments`).then((response) => {
        setComments(response.data);
      }).catch((error) => {
        console.error("Error fetching comments:", error);
      });
    }
  }, [ticketId]);

  const handleAddComment = () => {
    setCommentPopupOpen(true);
  };

  const handleCloseCommentPopup = () => {
    setCommentPopupOpen(false);
  };

  const handleDeleteClick = (commentId) => {
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/comments/${selectedCommentId}`);
      const updatedComments = comments.filter(comment => comment.id !== selectedCommentId);
      setComments(updatedComments);
      onUpdateCommentCount(ticketId, updatedComments.length);
      setDeleteDialogOpen(false);
      setSelectedCommentId(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedCommentId(null);
  };

  const handleCommentAdded = (newComment) => {
    console.log("New comment to be added:", newComment);
    console.log("Previous comments state before update:", comments);
    
    // Update the comments state with the new comment
    setComments(prevComments => {
      const updatedComments = [...prevComments, newComment];
      console.log("Updating comments state with:", updatedComments);
      return updatedComments;
    });
    
    // Update the comment count (with a correct length)
    onUpdateCommentCount(ticketId, comments.length + 1);
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List>
          {comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText 
              primary={comment.comment} 
              secondary={`by ${comment.user_name} at ${new Date(comment.created_at).toLocaleString()}`}
              />
              {isAuthenticated && (
                <IconButton onClick={() => handleDeleteClick(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        {isAuthenticated && (
          <Button startIcon={<AddCommentIcon />} onClick={handleAddComment} color="primary">
            Add Comment
          </Button>
        )}
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
      <TicketCommentPopup
        open={commentPopupOpen}
        onClose={handleCloseCommentPopup}
        ticketId={ticketId}
        onCommentAdded={handleCommentAdded} // Use the handler to add a comment
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonColor="error"
        confirmButtonIcon={<DeleteIcon />}
      />
    </Dialog>
  );
}

export default TicketCommentList;
