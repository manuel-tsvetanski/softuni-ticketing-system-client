import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function TicketList() {
  const [tickets, setTickets] = useState([]);

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

  return (
    <div>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <Link to={`ticket/${ticket.id}`}>{ticket.title}</Link>
            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
            <Link to={`edit-ticket/${ticket.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
