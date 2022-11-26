import { Link } from 'react-router-dom'

import LogoutModal from './LogoutModal'

import LogoImg from '../assets/wwlogo.png'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

function NavBar() {
  const { user } = useAuth()
  const [logModalShown, setLogModalShown] = useState(false)

  return (
    <>
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
              <a onClick={() => setLogModalShown(true)}>
                <li>Logout</li>
              </a>
            </>
          ) : null}
        </ul>
      </nav>
      {logModalShown ? (
        <LogoutModal setLogModalShown={setLogModalShown} />
      ) : null}
    </>
  )
}

export default NavBar
