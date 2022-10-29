import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('1')
  const [passCont, setPassCont] = useState('2')

  const regData = {
    firstName,
    lastName,
    email,
    password,
  }

  const auth = useAuth()

  return (
    <div className='reg-form-cont'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          auth.registerUser(regData)
        }}
        className='reg-form'
      >
        <h2>Register</h2>
        <div className='flex-sb'>
          <input
            className='auth-input input-49'
            type='text'
            id=''
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='auth-input input-49'
            type='text'
            id=''
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className='auth-input'
          type='email'
          id=''
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='auth-input'
          type='password'
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
            console.log(regData)
          }}
        />

        <input
          disabled={password !== passCont ? true : false}
          onClick={() => auth.registerUser()}
          className='auth-submit'
          type='submit'
          value='Register'
        />

        <div className='reg-login-opt'>
          <h5>
            Already have an account? <Link to='/'>Login</Link>
          </h5>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
