import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/playlist`,
    mode: 'cors',
  }),
  endpoints: builder => ({
    createPlaylist: builder.mutation({
      query: data => ({
        url: '/create',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    getPlaylistById: builder.query({
      query: id => ({
        url: `/get/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    featchPlaylistDataById: builder.mutation({
      query: id => ({
        url: `/get/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getAllMyPlaylists: builder.query({
      query: () => ({
        url: `/get/all`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    addSongToPlaylist: builder.mutation({
      query: data => ({
        url: '/add-song',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    likePlaylist: builder.mutation({
      query: data => ({
        url: '/like',
        method: 'POST',
        body: {playlistId: data},
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useCreatePlaylistMutation,
  useGetPlaylistByIdQuery,
  useAddSongToPlaylistMutation,
  useLikePlaylistMutation,
  useGetAllMyPlaylistsQuery,
  useFeatchPlaylistDataByIdMutation,
} = playlistApi
