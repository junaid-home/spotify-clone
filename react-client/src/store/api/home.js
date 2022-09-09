import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    getHomeData: builder.query({
      query: () => ({url: '/home', method: 'GET', credentials: 'include'}),
    }),
  }),
})

export const {useGetHomeDataQuery} = homeApi
