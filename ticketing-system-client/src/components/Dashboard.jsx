import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { fetchUser } from '../api';
import Avatar from './Avatar';

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
      <Avatar user={user} />
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
