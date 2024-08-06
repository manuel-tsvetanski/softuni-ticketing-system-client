import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, IconButton
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import api from '../api';
import TicketPopup from './TicketPopup';
import ConfirmationDialog from './ConfirmationDialogPopup';
import useAuth from '../hooks/useAuth';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    api.get('/tickets').then((response) => {
      console.log(response.data);
      setTickets(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the tickets!", error);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tickets/${id}`);
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error("There was an error deleting the ticket!", error);
    }
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Link to="#" onClick={() => handleOpenPopup(ticket, 'view')}>{ticket.title}</Link>
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
