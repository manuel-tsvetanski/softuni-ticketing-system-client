import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, IconButton, Badge
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Comment as CommentIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TicketPopup from './TicketPopup';
import ConfirmationDialog from '../ConfirmationDialogPopup';
import TicketCommentList from './TicketCommentList';
import { fetchTickets, saveTicket, deleteTicket } from '../../features/tickets/ticketsSlice';
import { getStatusIcon } from '../../utils/statusUtils';

function TicketList() {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedTicket, setSelectedTicket] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [commentPopupOpen, setCommentPopupOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [viewMode, setViewMode] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleOpenPopup = (ticket, mode) => {
    setSelectedTicket(ticket || {});
    setPopupOpen(true);
    setEditMode(mode === 'edit');
    setViewMode(mode === 'view');
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedTicket(null);
  };

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

  const handleSubmit = async (ticketData) => {
    dispatch(saveTicket({ ticketId: selectedTicket?.id, ticketData }));
    setPopupOpen(false);
    setEditMode(false);
    setViewMode(false);
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
          <Button variant="contained" color="primary" onClick={() => handleOpenPopup(null, 'create')}>
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
                  <Link to="#" onClick={() => handleOpenPopup(ticket, 'view')}>
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
                    <IconButton color="primary" onClick={() => handleOpenPopup(ticket, 'edit')}>
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
      <TicketPopup
        open={popupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
        initialData={selectedTicket}
        isEdit={editMode}
        isView={viewMode}
      />
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
