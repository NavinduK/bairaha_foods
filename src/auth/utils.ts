// utils
import axios from '../utils/axios'
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(jsonPayload)
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: any) => {
  if (!accessToken) {
    return false
  }
  // const decoded = jwtDecode(accessToken)

  // const currentTime = Date.now() / 1000

  // return decoded.exp > currentTime
  return true
}

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer

  const currentTime = Date.now()

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    toast.warning('Session expired! Please Login again.')

    localStorage.removeItem('accessToken')

    window.location.href = '/login'
  }, timeLeft)
}

// ----------------------------------------------------------------------

export const setSession = (accessToken: any) => {
  if (accessToken) {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))

    // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken) // ~3 days by minimals server
    // tokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
    window.location.href = '/login'
  }
}
