import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/liked`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    getLikedSongs: builder.query({
      query: () => ({url: '/songs', method: 'GET', credentials: 'include'}),
    }),

    getAllLikedItems: builder.query({
      query: () => ({url: '/all', method: 'GET', credentials: 'include'}),
    }),
  }),
})

export const {useGetLikedSongsQuery, useGetAllLikedItemsQuery} = likeApi
