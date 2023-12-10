import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'auth'

const initialState: any = {
  isLoading: false,
  error: null,
  user: [],
}

const slice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    // setSuccess
    getUserSuccess(state, action) {
      state.isLoading = false
      state.user = action.payload
    },

    stopLoading(state) {
      state.isLoading = false
    },

    clearState() {
      return initialState
    },
  },
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

// functions
export function resetUserPassword(email: string, password: string) {
  dispatch(slice.actions.startLoading())
  return async () =>
    await axios
      .post(`${NEXT_PUBLIC_API_URL}${baseUrl}/password/request`, {
        email: email,
      })
      .then(async (res) => {
        let response
        await axios
          .post(`${NEXT_PUBLIC_API_URL}${baseUrl}/password/reset`, {
            email: email,
            password: password,
            token: res.data.data,
          })
          .then((res2) => {
            response = res2.data
            return res2
          })
        return response
      })
      .catch((err) => err)
      .finally(() => dispatch(slice.actions.stopLoading()))
}
