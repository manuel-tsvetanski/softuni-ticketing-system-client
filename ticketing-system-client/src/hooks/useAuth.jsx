// useAuth.js
import { useState, useEffect } from 'react';
import { fetchUser } from '../api'; // Adjust the import path as needed

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async() => {
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null); // Ensure user is null if fetching fails
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const isAuthenticated = !!user;

    return { user, loading, isAuthenticated };
}

export default useAuth;