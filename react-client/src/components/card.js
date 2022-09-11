/** @jsxImportSource @emotion/react */
import {useEffect, useState} from 'react'
import {css, keyframes} from '@emotion/react/macro'
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Typography from './typography'

import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import {useAudioInstance} from 'context/audio-instance'

import {useFetchArtistByIdMutation} from 'store/api/artist'
import {useFeatchPlaylistDataByIdMutation} from 'store/api/playlist'
import {playSong, setPlayingStatus} from 'store/reducers/player'

function Card({data, kind = 'song'}) {
  const audioInstanceRef = useAudioInstance()
  const [displayPlayPause, setDisplayPlayPause] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const dispatch = useDispatch()
  const playing = useSelector(s => s.player.isPlaying)
  const [playlist, setPlaylist] = useState([])
  const playingSrc = useSelector(s => s.player.playingSrc)
  const [getArtistData] = useFetchArtistByIdMutation()
  const [getPlaylistData] = useFeatchPlaylistDataByIdMutation()

  const displayData = getDisplayableData(kind, data)
  const buttonStyles = {display: 'inline-block', opacity: 1}

  const handlePlay = async () => {
    dispatch(
      setPlayingStatus({status: true, src: audioInstanceRef.current.src}),
    )
    setTimeout(() => {
      audioInstanceRef.current.play()
    }, 200)

    if (kind === 'song' || kind === 'artist') {
      const result = await getArtistData(displayData.id)

      let songs = result.data.data.Songs

      setPlaylist(() => songs)
      if (kind === 'song' && songs.length) {
        const sortedSongs = [...result.data.data.Songs]

        const songId = data.id
        const songIndex = sortedSongs.findIndex(x => x.id === songId)

        const temp = sortedSongs[0]
        sortedSongs[0] = sortedSongs[songIndex]
        sortedSongs[songIndex] = temp

        songs = sortedSongs
      }

      dispatch(playSong(songs))
    } else {
      const result = await getPlaylistData(displayData.id)
      const songs = result.data.data.Songs

      setPlaylist(() => songs)
      dispatch(playSong(songs))
    }
  }

  const handlePause = () => {
    dispatch(
      setPlayingStatus({status: false, src: audioInstanceRef.current.src}),
    )
    setTimeout(() => {
      audioInstanceRef.current.pause()
    }, 200)
  }

  useEffect(() => {
    if (kind === 'song') {
      if (data.src === playingSrc && playing) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    } else {
      if (playing && playlist.findIndex(x => x.src === playingSrc) > -1) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }, [audioInstanceRef, data.src, kind, playing, playingSrc, playlist])

  const playPauseIcons = isPlaying ? (
    <FilledPauseIcon
      css={displayPlayPause || isPlaying ? buttonStyles : null}
      onClick={handlePause}
    />
  ) : (
    <FilledPlayIcon
      css={
        displayPlayPause
          ? {...buttonStyles, animation: shouldAnimate && `${slideUpward} 0.5s`}
          : null
      }
      onClick={handlePlay}
    />
  )

  return (
    <Wrapper
      onMouseEnter={() => {
        setDisplayPlayPause(true)
        setTimeout(() => {
          setShouldAnimate(false)
        }, 500)
      }}
      onMouseLeave={() => {
        setDisplayPlayPause(false)
        setShouldAnimate(true)
      }}
    >
      {playPauseIcons}
      <Link to={displayData.link}>
        <Album
          artist={kind === 'artist'}
          src={displayData.picture}
          alt={displayData.title}
        />
        <Typography variant="one-line" css={{marginTop: 15}}>
          {displayData.title}
        </Typography>
        <Typography
          variant="two-line"
          css={{marginTop: 10, color: colors.grey}}
        >
          {displayData.desc}
        </Typography>
      </Link>
    </Wrapper>
  )
}

const formatSongDesc = desc => {
  if (desc.length > 40) return `${desc.slice(0, 39)}...`
  else return desc
}

const getDisplayableData = (kind, data) => {
  const isSong = kind === 'song'
  const isArtist = kind === 'artist'
  const isPlaylist = kind === 'playlist'

  return {
    picture: isSong ? data.thumbnail : data.picture,
    title: isSong ? data.title : isPlaylist ? `#${data.name}` : data.name,
    desc: isSong
      ? formatSongDesc(data.description)
      : isArtist
      ? 'Artist'
      : `By: ${data.User.name}`,
    link: isSong
      ? `/artist/${data.artist_id}`
      : isPlaylist
      ? `/playlist/${data.id}`
      : `/artist/${data.id}`,
    id: isSong ? data.artist_id : isPlaylist ? data.id : data.id,
  }
}

const slideUpward = keyframes`
  0% {
    opacity: 0;
    top: 45%;
  }

  100% {
    opacity: 1;
    top: 40%;
  }
`

const filledPlayPauseStyles = css({
  backgroundColor: colors.primary,
  padding: 12,
  width: 50,
  height: 50,
  borderRadius: 100,
  cursor: 'default',
  boxShadow: '1px 5px 5px rgba(0,0,0,.5)',
  position: 'absolute',
  top: '40%',
  right: '15%',
  display: 'none',
  zIndex: 90,
  opacity: 0,
  transition: 'all 3s ease-in',

  animationIterationCount: 1,
})

const Wrapper = styled.div({
  padding: 20,
  backgroundImage: colors.card,
  display: 'inline-block',
  borderRadius: 5,
  color: colors.white,
  overflow: 'hidden',
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
  transition: 'all 0.3s linear',

  '&:hover': {
    background: colors.black,
  },
})

const Album = styled.img(
  {
    height: 170,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 3,
    boxShadow: '2px 2px 5px rgba(0,0,0,.3)',
  },
  ({artist}) =>
    artist
      ? {
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 1000,
          [mq.lg]: {
            height: 240,
            width: 240,
          },
        }
      : null,
)

const FilledPlayIcon = styled(PlayIcon)(filledPlayPauseStyles)
const FilledPauseIcon = styled(PauseIcon)(filledPlayPauseStyles)

export default Card
