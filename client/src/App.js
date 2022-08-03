import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/universal/NavBar'
// import Footer from './components/universal/Footer'

import LoginPage from './components/pages/LoginPage'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<LoginPage />}></Route>
          {/* <Route exact path='/register' element={<RegisterPage />}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
