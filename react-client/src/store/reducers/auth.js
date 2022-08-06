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
    builder
      .addMatcher(
        authApi.endpoints.loginWithOauth2.matchFulfilled,
        (state, action) => {
          if (action.payload?.data?.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(action.payload?.data?.user),
            )

            state.isAuthenticated = true
            state.user = action?.payload?.data?.user
          }
        },
      )
      .addMatcher(
        authApi.endpoints.signUpWithPersonalDetails.matchFulfilled,
        (state, action) => {
          if (action.payload?.data?.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(action.payload?.data?.user),
            )

            state.isAuthenticated = true
            state.user = action.payload?.data?.user
          }
        },
      )
      .addMatcher(
        authApi.endpoints.loginWithEmailAndPassword.matchFulfilled,
        (state, action) => {
          if (action.payload?.data?.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(action.payload?.data?.user),
            )

            state.isAuthenticated = true
            state.user = action.payload?.data?.user
          }
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        localStorage.removeItem('user')

        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const {restoreUser} = authSlice.actions
export default authSlice.reducer
