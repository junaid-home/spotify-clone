/** @jsxImportSource @emotion/react */
import {useCallback, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {createSelector} from '@reduxjs/toolkit'
import styled from '@emotion/styled/macro'
import {css} from '@emotion/react/macro'
import Typography from 'components/typography'
import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'
import ClockIcon from 'icons/clock'
import MoreIcon from 'icons/more'
import HeartIcon from 'icons/heart'
import HeartOutlineIcon from 'icons/heart-outline'
import colors from 'utils/colors'
import formatDate from 'utils/date-formatter'
import {songs} from 'utils/data'

function Playlist() {
  const location = useLocation()
  const state = useSelector(s => s)
  const [isPlaying, setIsplaying] = useState(false)
  const [focustedSong, setFocusedSong] = useState(null)

  const selectPlaylists = state => state.auth.user.playlists
  const selectPlaylistId = _state =>
    location.pathname.split('/')[location.pathname.split('/').length - 1]
  const playlistSelector = createSelector(
    selectPlaylists,
    selectPlaylistId,
    (playlists, playlistId) => playlists.find(x => x.id === playlistId),
  )

  const playlist = playlistSelector(state)
  const formatDateMemoized = useCallback(isoString => formatDate(isoString), [])

  const handleSongFocus = index => {
    setFocusedSong(index)
  }
  const handleSongUnFocus = index => {
    setFocusedSong(null)
  }

  return (
    <ContentContainer>
      <MainWrapper
        css={{
          background: `linear-gradient(0deg, ${playlist.Color.code2} 20%, ${playlist.Color.code1} 110%)`,
        }}
      >
        <PlaylistImage src={playlist.picture} alt={playlist.name} />
        <div css={{marginLeft: 30}}>
          <Typography css={{marginLeft: 5}} variant="label">
            PLAYLIST
          </Typography>
          <Typography variant="h0">{playlist.name}</Typography>
          <Typography css={{marginTop: 30, marginLeft: 5}} variant="label">
            {playlist.User.name} - 0 songs
          </Typography>
        </div>
      </MainWrapper>
      <SongListSection
        css={{
          background: `linear-gradient(0deg, rgba(0,0,0,.9) 20%, ${playlist.Color.code2} 200%)`,
        }}
      >
        {isPlaying ? (
          <PauseFilledIcon onClick={() => setIsplaying(false)} />
        ) : (
          <PlayFilledIcon onClick={() => setIsplaying(true)} />
        )}
        <SongListContainer
          css={{
            borderBottom: '1px solid #999',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <SongListIndexItem>
            <Typography variant="label">#</Typography>
          </SongListIndexItem>
          <SongListTitleItem css={{flex: 12}}>
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
        {songs.map((s, i) => (
          <SongListContainer
            onMouseEnter={() => handleSongFocus(i)}
            onMouseLeave={() => handleSongUnFocus(i)}
            css={{marginBottom: 10}}
          >
            <SongListIndexItem>
              {focustedSong === i ? (
                <PlayIcon css={{fill: 'white', cursor: 'pointer'}} />
              ) : (
                <Typography variant="label">{i + 1}</Typography>
              )}
            </SongListIndexItem>
            <SongListTitleItem>
              <SongImage src={s.thumbnail} alt={s.title} />
              <div css={{marginLeft: 15}}>
                <Typography variant="link" css={{marginBottom: 5}}>
                  {s.title}
                </Typography>
                <Typography
                  variant="one-line"
                  css={{fontWeight: 'normal', width: '85%'}}
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
              <HeartIcon css={{marginRight: 25}} />
              <Typography variant="label">{s.duration}</Typography>
              <MoreIcon
                css={{
                  marginLeft: 20,
                  cursor: 'pointer',
                  opacity: focustedSong === i ? 1 : 0,
                }}
              />
            </SongListDurationItem>
          </SongListContainer>
        ))}
      </SongListSection>
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
})

const MainWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  padding: '80px 30px 30px 30px',
  userSelect: 'none',
})

const SongListSection = styled.div({
  flex: 1,
  padding: 30,
})

const PlaylistImage = styled.img({
  width: 220,
  height: 220,
  boxShadow: `0px 0px 10px rgba(0,0,0,1)`,
})

const playPauseIconStyles = css({
  backgroundColor: colors.primary,
  padding: 12,
  width: 60,
  height: 60,
  borderRadius: 100,
  cursor: 'pointer',
})

const PlayFilledIcon = styled(PlayIcon)(playPauseIconStyles)
const PauseFilledIcon = styled(PauseIcon)(playPauseIconStyles)

const SongListContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8,
  color: colors.lightGrey,
})
const SongListIndexItem = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
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
})
const SongListDateItem = styled.div({
  flex: 3,
  display: 'flex',
  alignItems: 'center',
})
const SongListDurationItem = styled.div({
  flex: 4,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const SongImage = styled.img({
  width: 45,
  height: 45,
})

export default Playlist
