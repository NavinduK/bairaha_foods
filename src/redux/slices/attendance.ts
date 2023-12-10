import { createSlice } from '@reduxjs/toolkit'
import { AddAttendance, AttendanceState } from '../../types/attendance'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'attendance'

const initialState: AttendanceState = {
  isLoading: false,
  error: null,
  attendance: [],
  employeeAttendance: null,
}

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    stopLoading(state) {
      state.isLoading = false
    },

    // GET ALL
    getAttendance(state, action) {
      state.isLoading = false
      state.attendance = action.payload
    },

    getEmployeeAttendance(state, action) {
      state.isLoading = false
      state.employeeAttendance = action.payload
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

export function checkIn(data: AddAttendance) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}${baseUrl}/check-in`, data)
      .then((res) => {
        dispatch(slice.actions.stopLoading())
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function checkOut(data: AddAttendance) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}${baseUrl}/check-out`, data)
      .then((res) => {
        dispatch(slice.actions.stopLoading())
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function getLastAttendance() {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/fetch`)
      .then((res) => {
        dispatch(slice.actions.getAttendance(res.data.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function getEmployeeAttendance(
  email: string,
  page: number,
  size: number
) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/${email}/history/fetch?page=${page}&size=${size}`)
      .then((res) => {
        dispatch(slice.actions.getEmployeeAttendance(res.data.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
