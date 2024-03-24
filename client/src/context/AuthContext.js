import React, { useContext, useReducer, useEffect } from 'react'

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
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    console.log("AuthContext", state);
  }, [state]);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);