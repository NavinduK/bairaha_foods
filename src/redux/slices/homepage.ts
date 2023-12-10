import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'homepage'

const initialState: any = {
  isLoading: false,
  error: null,
  homepage: [],
}

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getHomepageData(state, action) {
      state.isLoading = false
      state.homepage = action.payload.data
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

// export function createPricing(data: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading())
//     return await axios
//       .post(`${NEXT_PUBLIC_API_URL}${baseUrl}`, data)
//       .then((res) => {
//         return res
//       })
//       .catch((error) => {
//         dispatch(slice.actions.hasError(error))
//         return error
//       })
//   }
// }

export function getAllHomepageData() {
  console.log("getting");
  
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/all/fetch`)
      .then((res) => {
        dispatch(slice.actions.getHomepageData(res.data))
        console.log(res)

        return res
      })
      .catch((error) => {
        console.log(error)
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function updateHomepageItem(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .put(`${NEXT_PUBLIC_API_URL}${baseUrl}`, data)
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
