import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, List, ListItem, ListItemText, IconButton, Box, Typography
} from '@mui/material';
import { Delete as DeleteIcon, AddComment as AddCommentIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import api from '../api';
import useAuth from '../hooks/useAuth';
import TicketCommentPopup from './TicketCommentPopup';
import ConfirmationDialog from './ConfirmationDialogPopup';

function TicketCommentList({ ticketId, open, onClose, onUpdateCommentCount }) {
  const [comments, setComments] = useState([]);
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth();

  const fetchComments = async (page) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/comments?page=${page}`);
      setComments(response.data.data); // Use the 'data' key from pagination
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchComments(currentPage);
    }
  }, [ticketId, currentPage]);

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
    setComments(prevComments => {
      const updatedComments = [...prevComments, newComment];
      return updatedComments;
    });
    onUpdateCommentCount(ticketId, comments.length + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
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
