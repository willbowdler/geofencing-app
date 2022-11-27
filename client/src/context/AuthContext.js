import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  const persistLogin = () => {
    fetch('/api/auth/persistLogin')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err.message))
  }

  const registerUser = (data) => {
    console.log(data)
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => {
        setUser(null)
        console.log(err)
      })
  }

  const loginUser = (logData) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrMsg(data.error)
        }
        setUser(data.user)
      })
      .catch((err) => {
        console.log(err)
        setUser(null)
      })
  }

  const logoutUser = () => {
    fetch('/api/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        persistLogin,
        registerUser,
        loginUser,
        logoutUser,
        user,
        errMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
