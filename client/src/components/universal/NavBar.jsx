import { Link } from 'react-router-dom'

import LogoImg from '../assets/wwlogo.png'
import { useAuth } from '../../context/AuthContext'

function NavBar() {
  const { logoutUser, user } = useAuth()
  return (
    <nav>
      <Link to='/'>
        <div className='nav-logo'>
          <img
            className='nav-logo-img'
            src={LogoImg}
            alt='Weed Warriors Logo'
          />
        </div>
      </Link>
      <ul className='nav-links'>
        <Link to='/about'>
          <li>About</li>
        </Link>
        {user ? (
          <>
            <Link to='/estimate'>Your Estimate</Link>
            <a onClick={() => logoutUser()}>
              <li>Logout</li>
            </a>
          </>
        ) : null}
      </ul>
    </nav>
  )
}

export default NavBar
