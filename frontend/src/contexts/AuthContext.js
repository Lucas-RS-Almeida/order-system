import { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import api from '../services/api';

export const Context = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getMe() {
      try {
        const token = (localStorage.getItem('@ordersystem.token') !== null)
          ? JSON.parse(localStorage.getItem('@ordersystem.token'))
          : '';

        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;

        if (user) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setIsAuthenticated(true);
          setUser(user);
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          return toast.error('Server error, try again lather');
        }

        handleLogout();
      } finally {
        setIsLoading(false);
      }
    }

    getMe();
  }, []);

  async function handleSignIn({ email, password }) {
    try {
      setIsLoading(true);

      const response = await api.post('/auth/sign-in', { email, password });

      const { user, token } = response.data;

      localStorage.setItem('@ordersystem.user', JSON.stringify(user));
      localStorage.setItem('@ordersystem.token', JSON.stringify(token));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUp({ username, email, password }) {
    try {
      setIsLoading(true);

      await api.post('/auth/sign-up', { username, email, password });

      toast.success('Conta criada com sucesso');

      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({});
  }

  return (
    <Context.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      onSignIn: handleSignIn,
      onSignUp: handleSignUp,
      onSignOut: handleLogout,
    }}>
      {children}
    </Context.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
