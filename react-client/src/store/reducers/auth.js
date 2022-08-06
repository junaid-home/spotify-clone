import {createSlice} from '@reduxjs/toolkit'
import {authApi} from '../api/auth'

const initialState = {
  user: {},
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreUser: (state, _action) => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        state.isAuthenticated = false
        return
      }

      state.isAuthenticated = true
      state.user = user
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.loginWithOauth2.matchFulfilled,
      (state, action) => {
        if (action?.payload?.data?.user) {
          state.isAuthenticated = true
          state.user = action?.payload?.data?.user
        }
      },
    )
  },
})

export const {restoreUser} = authSlice.actions
export default authSlice.reducer
