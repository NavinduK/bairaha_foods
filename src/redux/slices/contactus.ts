import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'contactus'

const initialState: any = {
  isLoading: false,
  error: null,
  contactus: [],
  count: 0,
}

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getContactUs(state, action) {
      state.isLoading = false
      state.contactus = action.payload.data.contactus
      state.count = action.payload.data.count
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

// Reducer
// export const {} = slice.actions

export default slice.reducer

// ----------------------------------------------------------------------

export function getAllContactUs(pageNumber: number, rowsPerPage: number) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(
        `${NEXT_PUBLIC_API_URL}${baseUrl}/all/fetch?page=${pageNumber}&size=${rowsPerPage}`
      )
      .then((res) => {
        dispatch(slice.actions.getContactUs(res.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
