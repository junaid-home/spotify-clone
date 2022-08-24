import {createSlice} from '@reduxjs/toolkit'
import {searchApi} from '../api/search'

const initialState = {
  data: [],
  isLoading: false,
  error: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(
        searchApi.endpoints.queryData.matchFulfilled,
        (state, action) => {
          state.data = action.payload.data
          state.error = null
          state.isLoading = false
        },
      )
      .addMatcher(
        searchApi.endpoints.queryData.matchRejected,
        (state, action) => {
          state.isLoading = false
          state.error = action.payload.data.message || action.payload.error
        },
      )
      .addMatcher(
        searchApi.endpoints.queryData.matchPending,
        (state, action) => {
          state.isLoading = true
        },
      )
  },
})

export default searchSlice.reducer
