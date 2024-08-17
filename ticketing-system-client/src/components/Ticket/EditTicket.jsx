import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { saveTicket, fetchTicketById } from '../../features/tickets/ticketsSlice';
import { statusOptions } from '../../utils/statusUtils';

function EditTicket() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, loading } = useSelector((state) => state.tickets);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    dispatch(fetchTicketById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setStatus(ticket.status);
    }
  }, [ticket]);

  const handleSubmit = () => {
    const ticketData = { title, description, status };
    dispatch(saveTicket({ ticketId: id, ticketData }));
    navigate('/dashboard');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Edit Ticket
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} {option.icon}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !description.trim()}
          >
            Save Changes
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 1 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditTicket;
