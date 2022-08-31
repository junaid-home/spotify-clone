import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/artist`,
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
  }),
})

export const {useGetArtistByIdQuery} = artistApi
