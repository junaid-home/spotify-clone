/** @jsxImportSource @emotion/react */
import {useCallback, useState} from 'react'
import styled from '@emotion/styled/macro'
import {css} from '@emotion/react/macro'
import Typography from 'components/typography'
import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'
import ClockIcon from 'icons/clock'
import MoreIcon from 'icons/more'
import HeartIcon from 'icons/heart'
// import HeartOutlineIcon from 'icons/heart-outline'
import colors from 'utils/colors'
import formatDate from 'utils/date-formatter'

function SongList({data}) {
  const [isPlaying, setIsplaying] = useState(false)
  const [focustedSong, setFocusedSong] = useState(null)
  const formatDateMemoized = useCallback(isoString => formatDate(isoString), [])

  const handleSongFocus = index => {
    setFocusedSong(index)
  }
  const handleSongUnFocus = index => {
    setFocusedSong(null)
  }
  return (
    <SongListSection
      css={{
        background: `linear-gradient(0deg, rgba(0,0,0,.9) 20%, ${data.Color.code2} 200%)`,
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
      {data.Songs.map((s, i) => (
        <SongListContainer
          onMouseEnter={() => handleSongFocus(i)}
          onMouseLeave={() => handleSongUnFocus(i)}
          css={{marginBottom: 10}}
          key={s.id}
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
  )
}

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

export default SongList
