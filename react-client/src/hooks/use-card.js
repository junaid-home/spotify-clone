import {startTransition, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useAudioInstance} from 'context/audio-instance'

import {useFetchArtistByIdMutation} from 'store/api/artist'
import {useFeatchPlaylistDataByIdMutation} from 'store/api/playlist'
import {playSong, setPlayingId, setPlayingStatus} from 'store/reducers/player'

export default function useCard(kind, playlistId, songId, songSrc) {
  const dispatch = useDispatch()
  const audioInstanceRef = useAudioInstance()

  const [isPlaying, setIsPlaying] = useState(false)

  const playing = useSelector(s => s.player.isPlaying)
  const playingId = useSelector(s => s.player.playingId)
  const playingSrc = useSelector(s => s.player.playingSrc)

  const [getArtistData] = useFetchArtistByIdMutation()
  const [getPlaylistData] = useFeatchPlaylistDataByIdMutation()

  useEffect(() => {
    if (kind === 'song') {
      if (playing && songSrc === playingSrc) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    } else {
      if (playing && playingId === playlistId) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }, [songSrc, playlistId, kind, playing, playingId, playingSrc])

  const handlePlay = async () => {
    dispatch(
      setPlayingStatus({status: true, src: audioInstanceRef.current.src}),
    )
    startTransition(() => {
      audioInstanceRef.current.play()
    })

    if (kind === 'song' || kind === 'artist') {
      const result = await getArtistData(playlistId)

      dispatch(setPlayingId(result.data.data.id))
      let songs = result.data.data.Songs

      if (kind === 'song' && songs.length) {
        const sortedSongs = [...result.data.data.Songs]

        const songIndex = sortedSongs.findIndex(x => x.id === songId)

        const temp = sortedSongs[0]
        sortedSongs[0] = sortedSongs[songIndex]
        sortedSongs[songIndex] = temp

        songs = sortedSongs
      }

      dispatch(playSong(songs))
    } else {
      const result = await getPlaylistData(playlistId)
      const songs = result.data.data.Songs

      dispatch(playSong(songs))
      dispatch(setPlayingId(result.data.data.id))
    }
  }

  const handlePause = () => {
    dispatch(
      setPlayingStatus({status: false, src: audioInstanceRef.current.src}),
    )
    startTransition(() => {
      audioInstanceRef.current.pause()
    })
  }

  return {isPlaying, handlePlay, handlePause}
}
