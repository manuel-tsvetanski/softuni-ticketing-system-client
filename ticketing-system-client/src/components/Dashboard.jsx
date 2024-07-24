import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { fetchUser } from '../api';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.name}!</p>}
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
