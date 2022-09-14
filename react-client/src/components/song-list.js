/** @jsxImportSource @emotion/react */
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import styled from '@emotion/styled/macro'
import {useDispatch, useSelector} from 'react-redux'
import {css} from '@emotion/react/macro'
import {toast} from 'react-toastify'

import Typography from 'components/typography'
import SongMenuDropdown from 'components/song-menu-dropdown'

import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'
import ClockIcon from 'icons/clock'
import HeartIcon from 'icons/heart'
import HeartOutlineIcon from 'icons/heart-outline'

import colors from 'utils/colors'
import formatDate from 'utils/date-formatter'
import * as mq from 'utils/media-query'

import {useAudioInstance} from 'context/audio-instance'

import {useLikeSongMutation} from 'store/api/song'
import {playSong, setPlayingId, setPlayingStatus} from 'store/reducers/player'

function SongList({
  color = '#7367F0',
  data,
  likedSongs,
  refetchLikes,
  likedEntities,
  likeEntity,
}) {
  const songInstanceRef = useAudioInstance()
  const dispatch = useDispatch()
  const playingId = useSelector(s => s.player.playingId)
  const playing = useSelector(s => s.player.isPlaying)
  const playingSrc = useSelector(s => s.player.playingSrc)
  const [isPlaying, setIsplaying] = useState(false)
  const [focustedSong, setFocusedSong] = useState(null)
  const [likeSong] = useLikeSongMutation()

  const formatDateMemoized = useCallback(isoString => formatDate(isoString), [])
  const isLiked = useCallback(
    (items, item) => items.some(x => x.id === item.id),
    [],
  )

  const handleLike = async (func, id) => {
    const result = await func(id)
    if (result.data.data) {
      toast.success(result.data.data.message)
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }

    refetchLikes()
  }

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

  useEffect(() => {
    if (playing && playingId === data.id) {
      setIsplaying(true)
    } else {
      setIsplaying(false)
    }
  }, [data.id, playingId, playing, data.Songs])

  return (
    <SongListSection
      css={{
        background: `linear-gradient(0deg, rgba(0,0,0,.9) 20%, ${color} 200%)`,
      }}
    >
      <IconsContainer>
        {isPlaying ? (
          <PauseFilledIcon onClick={handlePause} />
        ) : (
          <PlayFilledIcon onClick={handlePlay} />
        )}
        {isLiked(likedEntities, data) ? (
          <HeartFilledIcon onClick={() => handleLike(likeEntity, data.id)} />
        ) : (
          <HeartOutlineFilledIcon
            onClick={() => handleLike(likeEntity, data.id)}
          />
        )}
      </IconsContainer>

      <SongListContainer
        css={{
          marginTop: 40,
          [mq.xl]: {opacity: 0},
        }}
      >
        <SongListIndexItem>
          <Typography variant="label">#</Typography>
        </SongListIndexItem>
        <SongListTitleItem>
          <Typography variant="label">TITLE</Typography>
        </SongListTitleItem>
        <SongListTypeItem>
          <Typography variant="label">ALBUM</Typography>
        </SongListTypeItem>
        <SongListDateItem>
          <Typography variant="label">TIME ADDED</Typography>
        </SongListDateItem>
        <SongListDurationItem>
          <ClockIcon css={{marginRight: 40}} />
        </SongListDurationItem>
      </SongListContainer>
      <div
        css={{
          width: '100%',
          marginBottom: 20,
          height: 1,
          borderBottom: '1px solid #999',
        }}
      />
      {data.Songs.map((s, i) => (
        <Fragment key={s.id}>
          <SongListContainer
            onMouseEnter={() => setFocusedSong(i)}
            onMouseLeave={() => setFocusedSong(null)}
            css={{marginBottom: 10, [mq.xl]: {marginBottom: 0}}}
          >
            <SongListIndexItem css={{[mq.lg]: {display: 'inline-block'}}}>
              {focustedSong === i ? (
                data.Songs.findIndex(x => x.src === playingSrc) ===
                  focustedSong && playing ? (
                  <PauseIcon
                    onClick={() => handlePause()}
                    css={{fill: 'white', cursor: 'pointer'}}
                  />
                ) : (
                  <PlayIcon
                    onClick={() => handlePlay(i)}
                    css={{fill: 'white', cursor: 'pointer'}}
                  />
                )
              ) : (
                <Typography variant="label">{i + 1}</Typography>
              )}
            </SongListIndexItem>
            <SongListTitleItem>
              <SongImage loading="lazy" src={s.thumbnail} alt={s.title} />
              <div css={{marginLeft: 15}}>
                <Typography
                  variant="link"
                  css={{
                    marginBottom: 5,
                    maxWidth: '80%',
                  }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="one-line"
                  css={{
                    fontWeight: 'normal',
                    maxWidth: 350,
                    [mq.xl]: {maxWidth: '55vw'},
                  }}
                >
                  {s.description}
                </Typography>
              </div>
            </SongListTitleItem>
            <SongListTypeItem>
              <Typography variant="label">Playlist</Typography>
            </SongListTypeItem>
            <SongListDateItem>
              <Typography variant="label">
                {formatDateMemoized(s.createdAt)}
              </Typography>
            </SongListDateItem>
            <SongListDurationItem>
              {isLiked(likedSongs, s) ? (
                <HeartIcon
                  css={{marginRight: 25}}
                  onClick={() => handleLike(likeSong, s.id)}
                />
              ) : (
                <HeartOutlineIcon
                  css={{marginRight: 25}}
                  onClick={() => handleLike(likeSong, s.id)}
                />
              )}
              <Typography variant="label">{s.duration}</Typography>
              <SongMenuDropdown
                song={s.id}
                focustedSong={focustedSong}
                isFocused={focustedSong === i}
              />
            </SongListDurationItem>
          </SongListContainer>
          <MobileButtonsContainer>
            <MobileButton
              onClick={() => handleLike(likeSong, s.id)}
              css={{marginRight: 5}}
            >
              {isLiked(likedSongs, s) ? <HeartIcon /> : <HeartOutlineIcon />}
            </MobileButton>
            <MobileButton css={{marginLeft: 5}}>
              <SongMenuDropdown
                song={s.id}
                focustedSong={focustedSong}
                isFocused
              />
            </MobileButton>
          </MobileButtonsContainer>
        </Fragment>
      ))}
    </SongListSection>
  )
}

const MobileButtonsContainer = styled.div({
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: 20,

  [mq.xl]: {
    display: 'flex',
  },
})

const MobileButton = styled.div({
  flex: 1,
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.2)',
  padding: 10,
  borderRadius: 3,
})

const SongListSection = styled.div({
  flex: 1,
  padding: 30,
})

const playPauseIconStyles = css({
  backgroundColor: colors.primary,
  padding: 12,
  width: 60,
  height: 60,
  borderRadius: 100,
  cursor: 'pointer',
})

const heartIconStyles = css({
  width: 30,
  height: 30,
})

const PlayFilledIcon = styled(PlayIcon)(playPauseIconStyles)
const PauseFilledIcon = styled(PauseIcon)(playPauseIconStyles)
const HeartFilledIcon = styled(HeartIcon)(heartIconStyles)
const HeartOutlineFilledIcon = styled(HeartOutlineIcon)(heartIconStyles)

const SongListContainer = styled.div({
  display: 'flex',
  width: '100%',
  padding: 8,
  alignItems: 'center',
  color: colors.lightGrey,
})
const SongListIndexItem = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [mq.xl]: {
    display: 'none',
  },
})
const SongListTitleItem = styled.div({
  flex: 9,
  display: 'flex',
  alignItems: 'center',
})
const SongListTypeItem = styled.div({
  flex: 3,
  display: 'flex',
  alignItems: 'center',

  [mq.xl]: {
    display: 'none',
  },
})
const SongListDateItem = styled.div({
  flex: 3,
  display: 'flex',
  alignItems: 'center',

  [mq.xl]: {
    display: 'none',
  },
})
const SongListDurationItem = styled.div({
  flex: 4,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  [mq.xl]: {
    display: 'none',
  },
})

const SongImage = styled.img({
  width: 45,
  height: 45,
})

const IconsContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 20,
  paddingRight: 20,
})

export default React.memo(SongList)
