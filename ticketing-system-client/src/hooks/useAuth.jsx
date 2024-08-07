import { useState, useEffect } from 'react';
import api from '../api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, loading, isAuthenticated };
};

export default useAuth;
