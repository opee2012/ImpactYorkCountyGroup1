import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { email: action.payload }
    case 'LOGOUT':
      return { email: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    email: null
  })

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email'))

    if (email) {
      dispatch({ type: 'LOGIN', payload: email }) 
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}