import React, { createContext, useEffect } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth, rmAuth] = useLocalStorage('@app: auth')
  const [list, setList] = useLocalStorage('@app: list')
  const [cod, setCod] = useLocalStorage('@app: seq_codigo')

  useEffect(() => {
    if (!list) setList([])
    if (!cod) setCod(0)
  }, [auth, list, cod])

  return (
    <AuthContext.Provider value={{
      auth, setAuth, rmAuth,
      list, setList,
      cod, setCod
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext