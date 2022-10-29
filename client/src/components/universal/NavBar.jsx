import LogoImg from '../assets/wwlogo.png'
import { useAuth } from '../../context/AuthContext'

function NavBar() {
  const { logoutUser, user } = useAuth()
  return (
    <nav>
      <div className='nav-logo'>
        <img className='nav-logo-img' src={LogoImg} alt='Weed Warriors Logo' />
      </div>
      <ul className='nav-links'>
        {user ? (
          <a onClick={() => logoutUser()}>
            <li>Logout</li>
          </a>
        ) : null}
        <a href=''>
          <li>About</li>
        </a>
      </ul>
    </nav>
  )
}

export default NavBar
