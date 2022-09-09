import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/artist`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    getArtistById: builder.query({
      query: id => ({
        url: `/get/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    likeArtist: builder.mutation({
      query: data => ({
        url: '/like',
        method: 'POST',
        body: {artistId: data},
        credentials: 'include',
      }),
    }),
  }),
})

export const {useGetArtistByIdQuery, useLikeArtistMutation} = artistApi
