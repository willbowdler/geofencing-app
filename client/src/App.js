import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/universal/NavBar'
// import Footer from './components/universal/Footer'

import RegisterPage from './components/pages/RegisterPage'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<RegisterPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
