import { createContext, useEffect, useReducer, useCallback } from 'react'
import { get, post } from '../utils/axios'
import { isValidToken, jwtDecode, setSession } from './utils'
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
} from './types'
import { useRouter } from 'next/router'
import axios from 'axios'

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REFRESH = 'REFRESH',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

const l_email = process.env.NEXT_PUBLIC_LOGIN_EMAIL
const l_pwd = process.env.NEXT_PUBLIC_LOGIN_PWD

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean
    user: AuthUserType
  }
  [Types.LOGIN]: {
    user: AuthUserType
  }
  [Types.REFRESH]: {
    user: AuthUserType
  }
  [Types.REGISTER]: {
    user: AuthUserType
  }
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    }
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    }
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    }
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    }
  }
  return state
}

export const AuthContext = createContext<JWTContextType | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { push } = useRouter()

  const initialize = useCallback(async () => {
    try {
      const accessToken =
        typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        // const user = await getUser()
        const user = {
          id: 1,
          firstName: 'Bairaha',
          lastName: 'Admin',
          email: 'admin@bairahafood.lk',
          mobileNumber: '0711234567',
          avatarLink: null,
          status: 'ACTIVE',
          role: {
            id: 1,
            name: 'SUPER_ADMIN',
            status: 'ACTIVE',
          },
        }
        if (user) {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        }
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
        push('/login')
      }
    } catch (error) {
      console.error(error)
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      })
      push('/login')
    }
  }, [])

  useEffect(() => {
    initialize()
  }, [initialize])

  // LOGIN
  const login = async (email: string, password: string) => {
    // const data = {
    //   email: email,
    //   password: password,
    // }

    // const response = await post('/login', data)
    // if (response.data.data) {
    //   const { accessToken } = response.data.data
    //   setSession(accessToken)
    //   const decodedJWT = jwtDecode(accessToken)
    //   if (decodedJWT) {
    //     const user = await getUser()
    //     dispatch({
    //       type: Types.LOGIN,
    //       payload: {
    //         user,
    //       },
    //     })
    //   }
    // }

    // Using until Auth Implementation
    if (email == l_email && password == l_pwd) {
      // const response = await axios.post(
      //   'https://api-dev-minimal-v4.vercel.app/api/account/login',
      //   {
      //     email: 'demo@minimals.cc',
      //     password: 'demo1234',
      //   }
      // )
       const user = {
          id: 1,
          firstName: 'Bairaha',
          lastName: 'Admin',
          email: 'email@demo.lk',
          mobileNumber: '0711234567',
          avatarLink: null,
          status: 'ACTIVE',
          role: {
            id: 1,
            name: 'SUPER_ADMIN',
            status: 'ACTIVE',
          },
        }
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        })
      // if (response.data) {
      //   const { accessToken } = response.data
      //   setSession(accessToken)
      //   const decodedJWT = jwtDecode(accessToken)
      //   if (decodedJWT) {
      //     const user = {
      //       id: 1,
      //       firstName: 'Bairaha',
      //       lastName: 'Admin',
      //       email: 'email@demo.lk',
      //       mobileNumber: '0711234567',
      //       avatarLink: null,
      //       status: 'ACTIVE',
      //       role: {
      //         id: 1,
      //         name: 'SUPER_ADMIN',
      //         status: 'ACTIVE',
      //       },
      //     }
      //     dispatch({
      //       type: Types.LOGIN,
      //       payload: {
      //         user,
      //       },
      //     })
      //   }
      // }
    }
  }

  // REFRESH
  const refresh = async (token: string) => {
    const data = {
      refresh_token: token,
    }

    const response = await post('/user/login', data)
    if (response.data.data) {
      const { accessToken } = response.data.data
      setSession(accessToken)
      const decodedJWT = jwtDecode(accessToken)
      if (decodedJWT) {
        // const user = await getUser()
        const user = {
          id: 1,
          firstName: 'Bairaha',
          lastName: 'Admin',
          email: 'admin@bairahafood.lk',
          mobileNumber: '0711234567',
          avatarLink: null,
          status: 'ACTIVE',
          role: {
            id: 1,
            name: 'SUPER_ADMIN',
            status: 'ACTIVE',
          },
        }
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        })
      }
    }
  }

  // REGISTER
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // const response = await post('/api/account/register', {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // })
    // const { accessToken, user } = response.data.data
    // localStorage.setItem('accessToken', accessToken)
    // dispatch({
    //   type: Types.REGISTER,
    //   payload: {
    //     user,
    //   },
    // })
  }

  // LOGOUT
  const logout = async () => {
    setSession(null)
    dispatch({
      type: Types.LOGOUT,
    })
  }

  const getUser = async () => {
    const userResponse = await get('/user/logged')
    const user = userResponse.data.data
    // if (userResponse.data.data.role.id === 4) {
    //   const employeeRes = await get(
    //     `/employee/fetch?uid=${userResponse.data.data.id}`
    //   )
    //   if (employeeRes.status === 200) {
    //     user.employee = employeeRes.data.data.body.data
    //   }
    // }
    return user
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        refresh,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
