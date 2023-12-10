import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'slider'

const initialState: any = {
  isLoading: false,
  error: null,
  sliders: [],
  slider: null,
}

const slice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getSliders(state, action) {
      state.isLoading = false
      state.sliders = action.payload.data.slice(0, 3)
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

export function get3Sliders() {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/all/fetch`)
      .then((res) => {
        dispatch(slice.actions.getSliders(res.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function updateSlider(data: any, id: number) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .put(`${NEXT_PUBLIC_API_URL}${baseUrl}/${id}`, data)
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function updateImage(image: any) {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .post(`${NEXT_PUBLIC_API_URL}image`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}
