import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { usersAPI } from './database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка сохраненной сессии при первом рендере
  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const userSession = await SecureStore.getItemAsync('user_session');
        
        if (userSession) {
          const userData = JSON.parse(userSession);
          setUser(userData);
        }
      } catch (err) {
        console.error('Error loading user session:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserSession();
  }, []);

  // Функция входа
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await usersAPI.login(username, password);
      
      // Сохраняем сессию в SecureStore
      await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция регистрации
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = await usersAPI.register(userData);
      return userId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('user_session');
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin: user ? user.is_admin === 1 : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

export default AuthContext; 