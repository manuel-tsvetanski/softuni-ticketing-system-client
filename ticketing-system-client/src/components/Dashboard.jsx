// Dashboard.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Avatar from './Avatar';
import TicketList from './TicketList';

function Dashboard() {
  return (
    <div>
      <Avatar />
      <h1>Dashboard</h1>
      <TicketList />
      <Outlet />
    </div>
  );
}

export default Dashboard;
