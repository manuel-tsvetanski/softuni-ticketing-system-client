import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Thunk to fetch tickets
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async(_, { rejectWithValue }) => {
    try {
        const response = await api.get('/tickets');
        return response.data;
    } catch (error) {
        return rejectWithValue('Failed to fetch tickets');
    }
});

// Thunk to add or edit a ticket
export const saveTicket = createAsyncThunk('tickets/saveTicket', async({ ticketId, ticketData }, { rejectWithValue }) => {
    try {
        if (ticketId) {
            await api.put(`/tickets/${ticketId}`, ticketData);
        } else {
            await api.post('/tickets', ticketData);
        }
        const response = await api.get('/tickets');
        return response.data; // Return the updated list of tickets
    } catch (error) {
        return rejectWithValue('Failed to save ticket');
    }
});

// Thunk to delete a ticket
export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async(ticketId, { rejectWithValue }) => {
    try {
        await api.delete(`/tickets/${ticketId}`);
        return ticketId;
    } catch (error) {
        return rejectWithValue('Failed to delete ticket');
    }
});

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.tickets = action.payload;
                state.loading = false;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(saveTicket.fulfilled, (state, action) => {
                state.tickets = action.payload;
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
            });
    },
});

export default ticketsSlice.reducer;