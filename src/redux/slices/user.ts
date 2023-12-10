import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'user'

const initialState: any = {
  isLoading: false,
  error: null,
  users: [],
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getUsers(state, action) {
      state.isLoading = false
      state.users = action.payload
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

export function getAllUsers() {
  return async () => {
    dispatch(slice.actions.startLoading())
    await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/list`)
      .then((res) => {
        dispatch(slice.actions.getUsers(res.data.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function createUser(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}${baseUrl}`, data)
      .then((res) => {
        getAllUsers()
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function approveUser(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}approval/${id}/approve`, {
        remark: 'Admin manually approved',
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error
      })
  }
}

export function rejectUser(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}approval/${id}/reject`, {
        remark: 'Admin manually rejected',
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error
      })
  }
}