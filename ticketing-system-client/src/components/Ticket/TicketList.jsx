import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, IconButton, Badge
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Comment as CommentIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from '../ConfirmationDialogPopup';
import TicketCommentList from './Comment/TicketCommentList';
import { fetchTickets, deleteTicket } from '../../features/tickets/ticketsSlice';
import { getStatusIcon } from '../../utils/statusUtils';

function TicketList() {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = React.useState(null);
  const [commentPopupOpen, setCommentPopupOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleOpenComments = (ticket) => {
    setSelectedTicket(ticket || {});
    setCommentPopupOpen(true);
  };

  const handleCloseComments = () => {
    setCommentPopupOpen(false);
    setSelectedTicket(null);
  };

  const handleDeleteClick = (ticket) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    dispatch(deleteTicket(selectedTicket.id));
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const updateCommentCount = (ticketId, newCount) => {
    // Use a Redux action to update the comment count if needed
    // Assuming the Redux store holds this state and it should be updated in a proper reducer
  };

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <div>
      {isAuthenticated && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/create-ticket')}>
            Create New Ticket
          </Button>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Comments</TableCell>
              {isAuthenticated && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Link to={`/view-ticket/${ticket.id}`}>
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell>{getStatusIcon(ticket.status)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenComments(ticket)}>
                    <Badge badgeContent={ticket.comments_count} color="primary">
                      <CommentIcon />
                    </Badge>
                  </IconButton>
                </TableCell>
                {isAuthenticated && (
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => navigate(`/edit-ticket/${ticket.id}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(ticket)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TicketCommentList
        ticketId={selectedTicket?.id}
        open={commentPopupOpen}
        onClose={handleCloseComments}
        onUpdateCommentCount={updateCommentCount} // Pass the function to update comments count
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete the ticket titled "${selectedTicket?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonColor="error"
        confirmButtonIcon={<DeleteIcon />}
      />
    </div>
  );
}

export default TicketList;
