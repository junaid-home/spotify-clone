import {createSlice} from '@reduxjs/toolkit'
import {authApi} from '../api/auth'

const initialState = {
  user: {},
  isAuthenticated: false,
  error: null,
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
      state.error = null
    },
    resetError: (state, _action) => {
      state.error = null
    },

    updateUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))

      state.user = action.payload
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
            state.error = null
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
            state.error = null
            state.user = action.payload?.data?.user
          }
        },
      )
      .addMatcher(
        authApi.endpoints.signUpWithPersonalDetails.matchRejected,
        (state, action) => {
          state.error = action.payload.data.message
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
            state.error = null
            state.user = action.payload?.data?.user
          }
        },
      )
      .addMatcher(
        authApi.endpoints.loginWithEmailAndPassword.matchRejected,
        (state, action) => {
          state.error = action.payload.data.message
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        localStorage.removeItem('user')

        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const {restoreUser, resetError, updateUser} = authSlice.actions
export default authSlice.reducer
