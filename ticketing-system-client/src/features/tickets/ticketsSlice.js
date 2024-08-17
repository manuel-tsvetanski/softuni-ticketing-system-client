import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Thunk to fetch all tickets
export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async(_, { rejectWithValue }) => {
        try {
            const response = await api.get('/tickets');
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch tickets');
        }
    }
);

// Thunk to fetch a single ticket by ID
export const fetchTicketById = createAsyncThunk(
    'tickets/fetchTicketById',
    async(ticketId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/tickets/${ticketId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch ticket');
        }
    }
);

// Thunk to save a ticket (create or update)
export const saveTicket = createAsyncThunk(
    'tickets/saveTicket',
    async({ ticketId, ticketData }, { rejectWithValue }) => {
        try {
            if (ticketId) {
                // Update existing ticket
                await api.put(`/tickets/${ticketId}`, ticketData);
            } else {
                // Create new ticket
                await api.post('/tickets', ticketData);
            }

            // Fetch updated list of tickets after save
            const response = await api.get('/tickets');
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to save ticket');
        }
    }
);

// Thunk to delete a ticket
export const deleteTicket = createAsyncThunk(
    'tickets/deleteTicket',
    async(ticketId, { rejectWithValue }) => {
        try {
            await api.delete(`/tickets/${ticketId}`);
            return ticketId; // Return the ID of the deleted ticket
        } catch (error) {
            return rejectWithValue('Failed to delete ticket');
        }
    }
);

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        ticket: null, // Holds a single ticket for viewing/editing
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch all tickets
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

        // Fetch a single ticket by ID
        .addCase(fetchTicketById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTicketById.fulfilled, (state, action) => {
                state.ticket = action.payload;
                state.loading = false;
            })
            .addCase(fetchTicketById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

        // Save a ticket (create/update)
        .addCase(saveTicket.fulfilled, (state, action) => {
                state.tickets = action.payload;
                state.loading = false;
            })
            .addCase(saveTicket.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

        // Delete a ticket
        .addCase(deleteTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default ticketsSlice.reducer;