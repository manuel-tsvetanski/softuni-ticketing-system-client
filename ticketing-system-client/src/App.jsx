import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Paper, ThemeProvider, createTheme } from '@mui/material';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import TicketForm from './components/TicketForm';

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
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Global reset to maintain consistency */}
      <Router>
        <Container component="main" maxWidth="sm" sx={{
          display: 'flex', // Use flexbox to center content
          flexDirection: 'column', // Stack children vertically
          minHeight: '100vh', // Minimum height of the viewport
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          width: '100%',
        }}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}> {/* Adjustable width */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<TicketList />} />
                <Route path="ticket/:id" element={<TicketDetails />} />
                <Route path="create-ticket" element={<TicketForm isEdit={false} />} />
                <Route path="edit-ticket/:id" element={<TicketForm isEdit={true} />} />
              </Route>
            </Routes>
          </Paper>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
