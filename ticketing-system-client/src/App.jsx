import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Paper, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';

import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard';
import EditAccount from './components/AccountSettings/EditAccount';
import ChangePassword from './components/AccountSettings/ChangePassword';
import CreateTicket from './components/Ticket/CreateTicket';
import EditTicket from './components/Ticket/EditTicket';
import ViewTicket from './components/Ticket/ViewTicket';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#fff',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Container 
            component="main" 
            maxWidth="sm" 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mt: 3, 
                width: '100%', 
                maxHeight: '80%', 
                maxWidth: 600 
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Login route, accessible only to unauthenticated users */}
                <Route 
                  path="/login" 
                  element={
                    <ProtectedRoute isAuthRequired={false} redirectTo="/dashboard">
                      <Login />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Register route, accessible only to unauthenticated users */}
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute isAuthRequired={false} redirectTo="/dashboard">
                      <Register />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Dashboard route, accessible only to authenticated users */}
                <Route 
                  path="/dashboard/*" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* Edit Account route, accessible only to authenticated users */}
                <Route 
                  path="/edit-account" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <EditAccount />
                    </ProtectedRoute>
                  } 
                />

                {/* Change Password route, accessible only to authenticated users */}
                <Route 
                  path="/change-password" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <ChangePassword />
                    </ProtectedRoute>
                  } 
                />

                {/* Ticket Management Routes */}
                <Route 
                  path="/create-ticket" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <CreateTicket />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/edit-ticket/:id" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <EditTicket />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/view-ticket/:id" 
                  element={
                    <ProtectedRoute isAuthRequired={true} redirectTo="/login">
                      <ViewTicket />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Paper>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
