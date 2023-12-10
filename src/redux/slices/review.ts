import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'review'

const initialState: any = {
  isLoading: false,
  error: null,
  reviews: [],
}

const slice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getReviews(state, action) {
      state.isLoading = false
      state.reviews = action.payload.data.slice(0, 9)
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

export function getReviews() {
  return async () => {
    dispatch(slice.actions.startLoading())
    return await axios
      .get(`${NEXT_PUBLIC_API_URL}${baseUrl}/all/fetch`)
      .then((res) => {
        dispatch(slice.actions.getReviews(res.data))
        return res
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error))
        return error
      })
  }
}

export function updateReview(data: any) {
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

export function updateReviewImage(image: any) {
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
