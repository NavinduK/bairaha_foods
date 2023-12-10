import { combineReducers } from 'redux'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
// slices

import pricingReducer from './slices/pricing'
import machinelogsReducer from './slices/machinelogs'
import contactusReducer from './slices/contactus'
import userReducer from './slices/user'
import roleReducer from './slices/role'
import userAccountReducer from './slices/userAccount'
import attendanceReducer from './slices/attendance'
import sliderReducer from './slices/slider'
import homepageReducer from './slices/homepage'
import reviewReducer from './slices/review'

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null)
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value)
  },
  removeItem(_key: string) {
    return Promise.resolve()
  },
})

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
}

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
}

const rootReducer = combineReducers({
  pricing: pricingReducer,
  machinelogs: machinelogsReducer,
  contactus: contactusReducer,
  slider: sliderReducer,
  homepage: homepageReducer,
  review: reviewReducer,
  user: userReducer,
  role: roleReducer,
  userAccount: userAccountReducer,
  attendance: attendanceReducer,
})

export { rootPersistConfig, rootReducer }
