import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, List, ListItem, ListItemText, IconButton, Box, Typography
} from '@mui/material';
import { Delete as DeleteIcon, AddComment as AddCommentIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, deleteComment } from '../../../features/comments/commentsSlice';
import TicketCommentPopup from './TicketCommentPopup';
import ConfirmationDialog from '../../ConfirmationDialogPopup';

function TicketCommentList({ ticketId, open, onClose, onUpdateCommentCount }) {
  const dispatch = useDispatch();
  const { comments, currentPage, totalPages, loading } = useSelector((state) => state.comments);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [commentPopupOpen, setCommentPopupOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedCommentId, setSelectedCommentId] = React.useState(null);

  useEffect(() => {
    if (ticketId && open) {
      dispatch(fetchComments({ ticketId, page: currentPage }));
    }
  }, [ticketId, currentPage, open, dispatch]);

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

  const handleDeleteConfirm = () => {
    dispatch(deleteComment({ commentId: selectedCommentId }));
    setDeleteDialogOpen(false);
    setSelectedCommentId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedCommentId(null);
  };

  const handleCommentAdded = (newComment) => {
    dispatch(addComment({ ticketId, commentData: newComment }));
    setCommentPopupOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchComments({ ticketId, page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchComments({ ticketId, page: currentPage + 1 }));
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
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 1 || loading}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
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
