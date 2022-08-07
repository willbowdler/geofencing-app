import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../../context/AuthContext'

//look for google font quicksand
function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [passCont, setPassCont] = useState('')

  const logData = {
    email,
    password,
    passCont,
  }

  const auth = useAuth()

  return (
    <div>
      <div className='log-flex'>
        <div className='log-image'>
          <h1>GET YOUR FREE ESTIMATE TODAY</h1>
        </div>
        <div className='log-form-cont'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              auth.loginUser(logData)
            }}
            className='log-form'
          >
            <h2>Login</h2>
            <input
              className='auth-input'
              type='email'
              name='email'
              id=''
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='auth-input'
              type='password'
              name='password'
              id=''
              placeholder='Password'
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              className='auth-input'
              type='password'
              id=''
              placeholder='Confirm Password'
              onChange={(e) => {
                setPassCont(e.target.value)
              }}
            />

            <input className='auth-input' type='submit' value='Login' />

            <div className='reg-login-opt'>
              <h5>
                Dont have an account? <Link to='/register'>Register</Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

//todo:
//validation
//authentication
//authorization
