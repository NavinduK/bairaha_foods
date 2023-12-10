import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'pricing'

const initialState: any = {
  isLoading: false,
  error: null,
  pricings: [],
  pricing: null,
  count: 0,
}

const slice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getPricings(state, action) {
      state.isLoading = false
      state.pricings = action.payload.pricing
      state.count = action.payload.count
    },

    // getEmployeeById(state, action) {
    //   state.isLoading = false
    //   state.employee = action.payload
    // },

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

export function createPricing(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}${baseUrl}`, data)
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function getAllPricing(pageNumber: number, rowsPerPage: number) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(
        `${NEXT_PUBLIC_API_URL}${baseUrl}/all/fetch?page=${pageNumber}&size=${rowsPerPage}`
      )
      .then((res) => {
        dispatch(slice.actions.getPricings(res.data.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

// export function searchEmployee(query: string) {
//   return async () => {
//     dispatch(slice.actions.startLoading())
//     return await axios
//       .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/search?query=${query}`)
//       .then((res) => {
//         return res.data.data
//       })
//       .catch((error) => {
//         dispatch(slice.actions.hasError(error))
//         return error
//       })
//   }
// }

// export function getEmployeeById(id: number) {
//   return async () => {
//     dispatch(slice.actions.startLoading())
//     return await axios
//       .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/fetch/${id}`)
//       .then((res) => {
//         dispatch(slice.actions.getEmployeeById(res.data.data.body.data))
//         return res
//       })
//       .catch((error) => {
//         dispatch(slice.actions.hasError(error))
//         return error
//       })
//   }
// }

export function updatePricing(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .patch(`${NEXT_PUBLIC_API_URL}${baseUrl}`, data)
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
