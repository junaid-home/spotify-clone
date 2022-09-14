import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import {useAudioInstance} from 'context/audio-instance'

import {playSong, setPlayingId, setPlayingStatus} from 'store/reducers/player'

export default function useSongList(data, refetchLikes) {
  const songInstanceRef = useAudioInstance()
  const dispatch = useDispatch()

  const [isPlaying, setIsplaying] = useState(false)

  const playingId = useSelector(s => s.player.playingId)
  const playing = useSelector(s => s.player.isPlaying)

  useEffect(() => {
    if (playing && playingId === data.id) {
      setIsplaying(true)
    } else {
      setIsplaying(false)
    }
  }, [data.id, playingId, playing])

  const handlePlay = (index = 0) => {
    dispatch(setPlayingId(data.id))
    dispatch(setPlayingStatus({status: true, src: data.Songs[0].id}))
    dispatch(playSong(data.Songs))

    setTimeout(() => {
      songInstanceRef.current.play()
      songInstanceRef.current.updatePlayIndex(index)
    }, 200)
  }

  const handlePause = () => {
    dispatch(setPlayingStatus({status: false, src: data.Songs[0].id}))
    setTimeout(() => {
      songInstanceRef.current.pause()
    }, 200)
  }

  const handleLike = async (func, id) => {
    const result = await func(id)
    if (result.data.data) {
      toast.success(result.data.data.message)
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }

    refetchLikes()
  }

  return {isPlaying, handleLike, handlePause, handlePlay}
}
