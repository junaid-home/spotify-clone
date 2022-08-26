import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/playlist`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    createPlaylist: builder.mutation({
      query: data => ({
        url: '/create',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        credentials: 'include',
      }),
    }),
  }),
})

export const {useCreatePlaylistMutation} = playlistApi
