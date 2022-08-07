import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import NavBar from './components/universal/NavBar'
// import Footer from './components/universal/Footer'
import LoginPage from './components/pages/publicRoutes/LoginPage'
import RegisterPage from './components/pages/publicRoutes/RegisterPage/RegisterPage'

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
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
