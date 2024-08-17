import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, Button } from '@mui/material';
import { fetchTicketById } from '../../features/tickets/ticketsSlice';

function ViewTicket() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, loading } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTicketById(id));
  }, [dispatch, id]);

  if (loading || !ticket) return null;

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {ticket.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {ticket.description}
        </Typography>
        <Typography variant="caption" sx={{ mt: 2 }}>
          Status: {ticket.status}
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 3 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default ViewTicket;
