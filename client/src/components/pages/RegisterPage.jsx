import { useState } from 'react'

import registerUser from '../../utils/registerUser'

//look for google font quicksand
function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passCont, setPassCont] = useState('')

  const regData = {
    firstName,
    lastName,
    email,
    pass,
  }

  return (
    <div>
      <div className='reg-flex'>
        <div className='reg-image'>
          <h1>GET YOUR FREE ESTIMATE TODAY</h1>
        </div>
        <div className='reg-form-cont'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              registerUser(regData)
            }}
            className='reg-form'
          >
            <h2>Register</h2>
            <div className='flex-sb'>
              <input
                className='reg-input input-49'
                type='text'
                id=''
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className='reg-input input-49'
                type='text'
                id=''
                placeholder='Last Name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              className='reg-input'
              type='email'
              id=''
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='reg-input'
              type='password'
              id=''
              placeholder='Password'
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              className='reg-input'
              type='password'
              id=''
              placeholder='Confirm Password'
              onChange={(e) => {
                setPassCont(e.target.value)
                console.log(regData)
              }}
            />

            <input className='reg-input' type='submit' value='Submit' />

            <div className='reg-login-opt'>
              <h5>
                Already Have An Account? <a href=''>Login</a>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

//todo:
//validation
//authentication
//authorization
