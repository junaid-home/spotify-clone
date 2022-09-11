import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  playing: [],
  isPlaying: false,
  playingSrc: null,
  playingId: null,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    restorePlaying: (state, action) => {
      const playing = JSON.parse(localStorage.getItem('playing'))
      if (!playing) {
        state.playing = []
        return
      }

      state.playing = playing
    },
    playSong: (state, action) => {
      const formatedSongList = action.payload.map(song => ({
        name: song.title,
        musicSrc: song.src,
        cover: song.thumbnail,
        singer: song.description,
      }))

      state.playing = formatedSongList

      localStorage.setItem('playing', JSON.stringify(formatedSongList))
    },

    setPlayingStatus: (state, action) => {
      state.isPlaying = action.payload.status
      state.playingSrc = action.payload.src
    },

    setPlayingId: (state, action) => {
      state.playingId = action.payload
    },
  },
  extraReducers: builder => {},
})

export const {restorePlaying, playSong, setPlayingStatus, setPlayingId} =
  playerSlice.actions
export default playerSlice.reducer
