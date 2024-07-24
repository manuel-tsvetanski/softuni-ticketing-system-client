import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="create-ticket">Create New Ticket</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Dashboard;
