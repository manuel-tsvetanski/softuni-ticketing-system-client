import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`).then((response) => {
      setTicket(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the ticket details!", error);
    });
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
    </div>
  );
}

export default TicketDetails;
