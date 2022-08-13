import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function RequireAuth() {
  // temp this is testing

  const auth = useAuth()
  return auth.user ? <Outlet /> : <Navigate to='/' replace />
}

export default RequireAuth
