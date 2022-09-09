import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/song`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    likeSong: builder.mutation({
      query: data => ({
        url: '/like',
        method: 'POST',
        body: {songId: data},
        credentials: 'include',
      }),
    }),
  }),
})

export const {useLikeSongMutation} = songApi
