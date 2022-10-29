import { useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import NavBar from './components/universal/NavBar'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './context/AuthContext'
// import Footer from './components/universal/Footer'
import LoginPage from './components/pages/publicRoutes/LoginPage'
import RegisterPage from './components/pages/publicRoutes/RegisterPage/RegisterPage'
import Dashboard from './components/pages/privateRoutes/DashboardPage/Dashboard'
import EstimatePage from './components/pages/privateRoutes/EstimatePage/EstimatePage'

function App() {
  useEffect(() => !user && persistLogin(), [])

  const { user, persistLogin } = useAuth()
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route
          exact
          path='/'
          element={user ? <Navigate to='/estimate' /> : <LoginPage />}
        ></Route>
        <Route
          exact
          path='/register'
          element={user ? <Navigate to='/estimate' /> : <RegisterPage />}
        ></Route>

        {/* Private Routes */}
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route
          exact
          path='/estimate'
          element={user ? <EstimatePage /> : <Navigate to='/' />}
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
