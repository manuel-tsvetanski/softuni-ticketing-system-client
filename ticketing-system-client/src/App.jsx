import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
