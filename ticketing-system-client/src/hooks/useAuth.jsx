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
        if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized error specifically without logging
          setIsAuthenticated(false);
        } else {
          // Log other errors based on environment
          if (process.env.NODE_ENV === 'development') {
            console.error("Unexpected error fetching user data: ", error);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, loading, isAuthenticated };
};

export default useAuth;
