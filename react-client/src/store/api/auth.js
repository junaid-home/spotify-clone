import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    getFbLoginUri: builder.mutation({
      query: () => ({url: '/facebook/uri', method: 'GET'}),
    }),
    getGoogleLoginUri: builder.mutation({
      query: () => ({url: '/google/uri', method: 'GET'}),
    }),
    loginWithOauth2: builder.mutation({
      query: payload => ({
        url: payload.uri,
        method: 'POST',
        body: {query: payload.data},
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
})

export const {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
  useLoginWithOauth2Mutation,
} = authApi
