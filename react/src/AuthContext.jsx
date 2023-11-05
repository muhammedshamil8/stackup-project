import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// Define your initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Define your reducer function to handle authentication actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create an AuthProvider component to wrap your app with the AuthContext
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
