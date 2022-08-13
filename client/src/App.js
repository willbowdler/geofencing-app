import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import NavBar from './components/universal/NavBar'
import RequireAuth from './components/RequireAuth'
// import Footer from './components/universal/Footer'
import LoginPage from './components/pages/publicRoutes/LoginPage'
import RegisterPage from './components/pages/publicRoutes/RegisterPage/RegisterPage'
import Dashboard from './components/pages/privateRoutes/DashboardPage/Dashboard'
import EstimatePage from './components/pages/privateRoutes/EstimatePage/EstimatePage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<LoginPage />}></Route>
          <Route exact path='/register' element={<RegisterPage />}></Route>

          {/* Private Routes */}
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
          <Route exact path='/estimate' element={<EstimatePage />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
