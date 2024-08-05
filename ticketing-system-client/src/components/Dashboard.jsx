import { Link, Outlet } from 'react-router-dom';
import Avatar from './Avatar';

function Dashboard() {
  return (
    <div>
      <Avatar />
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
