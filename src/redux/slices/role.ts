import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'role'

const initialState: any = {
  isLoading: false,
  error: null,
  roles: [],
}

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getRoles(state, action) {
      state.isLoading = false
      state.roles = action.payload
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    // setSuccess
    clearState() {
      return initialState
    },
  },
})

export default slice.reducer

// ----------------------------------------------------------------------

export function getAllRoles() {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/list`)
      .then((res) => {
        dispatch(slice.actions.getRoles(res.data.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
