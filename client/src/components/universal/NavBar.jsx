import LogoImg from '../assets/wwlogo.png'

function NavBar() {
  return (
    <nav>
      <div className='nav-logo'>
        <img className='nav-logo-img' src={LogoImg} alt='Weed Warriors Logo' />
      </div>
      <ul className='nav-links'>
        <a href=''>
          <li>Login</li>
        </a>
        <a href=''>
          <li>About</li>
        </a>
      </ul>
    </nav>
  )
}

export default NavBar
