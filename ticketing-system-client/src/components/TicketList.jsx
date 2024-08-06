// TicketList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, IconButton
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import api from '../api';
import TicketPopup from './TicketPopup';
import ConfirmationDialog from './ConfirmationDialog';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tickets').then((response) => {
      setTickets(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the tickets!", error);
    });
  }, []);

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

  const handleDeleteClick = (ticket) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/tickets/${selectedTicket.id}`);
      setTickets(tickets.filter(ticket => ticket.id !== selectedTicket.id));
      setDeleteDialogOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("There was an error deleting the ticket!", error);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const handleSubmit = async (ticketData) => {
    try {
      if (editMode) {
        await api.put(`/tickets/${selectedTicket.id}`, ticketData);
      } else {
        await api.post('/tickets', ticketData);
      }
      setPopupOpen(false);
      setEditMode(false);
      setViewMode(false);
      setSelectedTicket(null);
      // Refresh ticket list
      const response = await api.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error("There was an error submitting the ticket!", error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenPopup(null, 'create')}>
          Create New Ticket
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Link to="#" onClick={() => handleOpenPopup(ticket, 'view')}>{ticket.title}</Link>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenPopup(ticket, 'edit')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(ticket)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
