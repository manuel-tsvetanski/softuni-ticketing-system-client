import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async action to handle user login
export const loginUser = createAsyncThunk('auth/loginUser', async(credentials, { rejectWithValue }) => {
    try {
        const response = await api.post('/login', credentials);
        localStorage.setItem('token', response.data.token);
        return response.data.user;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error);
        }
        return rejectWithValue('An error occurred. Please try again.');
    }
});

// Async action to handle user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async(_, { rejectWithValue }) => {
    try {
        const response = await api.post('/logout');
        localStorage.removeItem('token');
        return response.data.message;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue('Logout failed. Please try again.');
        }
        return rejectWithValue('An error occurred. Please try again.');
    }
});

// Async action to handle user registration
export const registerUser = createAsyncThunk('auth/registerUser', async(userData, { rejectWithValue }) => {
    try {
        await api.post('/register', userData);
        return 'Registration successful';
    } catch (error) {
        if (error.response && error.response.status === 422) {
            return rejectWithValue(error.response.data.errors);
        }
        return rejectWithValue('An error occurred. Please try again.');
    }
});

// Async action to fetch the current user's data
// Async action to fetch the current user's data
export const fetchUserApp = createAsyncThunk('auth/fetchUserApp', async(_, { rejectWithValue }) => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return rejectWithValue('Unauthorized');
        }
        return rejectWithValue('Failed to fetch user data');
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        errorMessage: null,
        registrationErrors: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.errorMessage = action.payload || null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.errorMessage = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.errorMessage = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.registrationErrors = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.registrationErrors = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.registrationErrors = action.payload;
            })
            .addCase(fetchUserApp.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(fetchUserApp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(fetchUserApp.rejected, (state, action) => {
                state.errorMessage = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;