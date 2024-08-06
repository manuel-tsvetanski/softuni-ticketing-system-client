// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Paper, ThemeProvider, createTheme } from '@mui/material';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

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
      <CssBaseline />
      <Router>
        <Container component="main" maxWidth="sm" sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
