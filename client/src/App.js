import { useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import NavBar from './components/universal/NavBar'
import { useAuth } from './context/AuthContext'
import LoginPage from './components/pages/publicRoutes/LoginPage'
import RegisterPage from './components/pages/publicRoutes/RegisterPage/RegisterPage'
import AboutPage from './components/pages/publicRoutes/AboutPage/AboutPage'
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
        <Route exact path='/about' element={<AboutPage />}></Route>

        {/* Private Routes */}
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
