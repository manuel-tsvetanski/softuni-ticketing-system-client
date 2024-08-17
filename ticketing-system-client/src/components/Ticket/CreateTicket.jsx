import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { saveTicket } from '../../features/tickets/ticketsSlice';

function CreateTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.tickets);

  const handleSubmit = () => {
    const ticketData = { title, description, status: 'open' };
    dispatch(saveTicket({ ticketData }));
    navigate('/dashboard');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Ticket
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !description.trim()}
          >
            Create Ticket
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

export default CreateTicket;
