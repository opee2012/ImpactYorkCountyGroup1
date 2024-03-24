import React, { useContext, useReducer, useEffect, useState } from 'react'

const initialState = {
  email: null,
  admin: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.payload.email,
        admin: action.payload.admin
      }
    case 'LOGOUT':
      return {
        ...state,
        email: null,
        admin: null
      }
    default:
      return state
  }
}

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const admin = localStorage.getItem('admin');
    
    if (email && admin) {
      dispatch({ type: 'LOGIN', payload: { email, admin } });
    }

    setIsLoading(false);
  }, []);
  
  return (
    <AuthContext.Provider value={{ state, dispatch, isLoading }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);