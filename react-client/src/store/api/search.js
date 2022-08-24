import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    queryData: builder.mutation({
      query: data => ({
        url: '/search',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
})

export const {useQueryDataMutation} = searchApi
