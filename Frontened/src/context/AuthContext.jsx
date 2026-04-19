import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('loading');

  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshRes = await API.post('auth/refresh');
        const newAccessToken = refreshRes.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        const profileRes = await API.get('users/me');
        setUser(profileRes.data.user);
        setAuthStatus('authenticated');
      } catch (err) {
        localStorage.removeItem('accessToken');
        setUser(null);
        if (err.response?.status === 401) {
          setAuthStatus('unauthenticated');
        } else {
          setAuthStatus('unauthenticated');
        }
      }
    };

    initAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthStatus('authenticated');
  };

  const logout = async () => {
    try {
      await API.post('auth/logout');
    } catch (_) {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    setAuthStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, authStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
