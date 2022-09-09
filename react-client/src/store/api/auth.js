import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/auth`,
    mode: 'cors',
  }),
  endpoints: builder => {
    return {
      getFbLoginUri: builder.mutation({
        query: () => ({
          url: '/facebook/uri',
          method: 'GET',
        }),
      }),

      getGoogleLoginUri: builder.mutation({
        query: () => ({
          url: '/google/uri',
          method: 'GET',
        }),
      }),

      loginWithOauth2: builder.mutation({
        query: payload => {
          return {
            url: payload.uri,
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {query: payload.data},
          }
        },
      }),

      loginWithEmailAndPassword: builder.mutation({
        query: data => {
          return {
            url: '/login',
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          }
        },
      }),

      signUpWithPersonalDetails: builder.mutation({
        query: data => {
          return {
            url: '/signup',
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          }
        },
      }),

      logout: builder.mutation({
        query: () => ({url: '/logout', method: 'GET'}),
      }),

      updateUser: builder.mutation({
        query: data => ({
          method: 'PUT',
          url: '/update/user',
          credentials: 'include',
          body: data,
        }),
      }),
    }
  },
})

export const {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
  useLoginWithOauth2Mutation,
  useLoginWithEmailAndPasswordMutation,
  useSignUpWithPersonalDetailsMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = authApi
