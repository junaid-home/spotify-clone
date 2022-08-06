import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {authApi} from './api/auth'
import authReducer from './reducers/auth'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)
