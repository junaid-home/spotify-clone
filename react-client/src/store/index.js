import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {authApi} from './api/auth'
import {homeApi} from './api/home'
import {searchApi} from './api/search'
import {playlistApi} from './api/playlist'
import authReducer from './reducers/auth'
import searchReducer from './reducers/search'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      homeApi.middleware,
      searchApi.middleware,
      playlistApi.middleware,
    ),
})

setupListeners(store.dispatch)
