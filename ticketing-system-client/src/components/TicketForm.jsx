import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

function TicketForm({ isEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/tickets/${id}`).then((response) => {
        const ticket = response.data;
        setTitle(ticket.title);
        setDescription(ticket.description);
        setStatus(ticket.status);
      }).catch((error) => {
        console.error("There was an error fetching the ticket!", error);
      });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = { title, description, status };
    
    try {
      if (isEdit && id) {
        await api.put(`/tickets/${id}`, ticketData);
      } else {
        await api.post('/tickets', ticketData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Ticket' : 'Create New Ticket'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        {isEdit && (
          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        )}
        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default TicketForm;
