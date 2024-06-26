import { useAuthContext } from '../context/AuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('email');
    localStorage.removeItem('admin');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}