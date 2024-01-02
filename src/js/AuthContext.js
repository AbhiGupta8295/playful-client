// AuthContext.js
import React, { useState, useContext } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// export {AuthContext, AuthContextProvider};