import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunk to fetch comments
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async({ ticketId, page }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/tickets/${ticketId}/comments?page=${page}`);
            return response.data; // Return the data including pagination details
        } catch (error) {
            return rejectWithValue('Failed to fetch comments');
        }
    }
);

// Async thunk to add a new comment
export const addComment = createAsyncThunk(
    'comments/addComment',
    async({ ticketId, commentData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/tickets/${ticketId}/comments`, commentData);
            return response.data; // Return the newly added comment
        } catch (error) {
            return rejectWithValue('Failed to add comment');
        }
    }
);

// Async thunk to delete a comment
export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async({ commentId }, { rejectWithValue }) => {
        try {
            await api.delete(`/comments/${commentId}`);
            return commentId; // Return the deleted comment's ID
        } catch (error) {
            return rejectWithValue('Failed to delete comment');
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {
        resetComments: (state) => {
            state.comments = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.last_page;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            });
    },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;