/**
 * Reducer function for handling authentication state changes.
 * @param {Object} state - The current state of the authentication context.
 * @param {Object} action - The action to be processed, containing the type and payload.
 * @returns {Object} The updated state after applying the action.
 */
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

// The initial state for the authentication context.
const initialState = {
  email: null,
  admin: null
};

// The React context for authentication.
const AuthContext = React.createContext();

/**
 * Provider component for the AuthContext, managing the authentication state and providing it to child components.
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 * @returns {React.Component} The AuthContext.Provider component with the authentication state.
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to initialize the authentication state from local storage.
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
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the AuthContext.
 * @returns {Object} The context value containing the authentication state and dispatch function.
 */
export const useAuthContext = () => useContext(AuthContext);