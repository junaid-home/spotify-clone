import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {authApi} from './api/auth'
import {homeApi} from './api/home'
import authReducer from './reducers/auth'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, homeApi.middleware),
})

setupListeners(store.dispatch)
