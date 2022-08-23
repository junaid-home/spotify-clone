/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react/macro'
import styled from '@emotion/styled/macro'
import colors from 'utils/colors'
import Typography from './typography'
import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'
import {useState} from 'react'
import * as mq from 'utils/media-query'

function Card({data, kind = 'song'}) {
  const [displayPlayPause, setDisplayPlayPause] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)

  const displayData = getDisplayableData(kind, data)
  const buttonStyles = {display: 'inline-block', opacity: 1}

  const handlePlay = () => {
    setIsPlaying(true)
  }
  const handlePause = () => {
    setIsPlaying(false)
  }

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
      <Album
        artist={kind === 'artist'}
        src={displayData.picture}
        alt={displayData.title}
      />
      <Typography variant="one-line" css={{marginTop: 15}}>
        {displayData.title}
      </Typography>
      <Typography variant="two-line" css={{marginTop: 10, color: colors.grey}}>
        {displayData.desc}
      </Typography>
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
    picture: isSong || isPlaylist ? data.thumbnail : data.picture,
    title: isSong ? data.title : isPlaylist ? `#${data.name}` : data.name,
    desc: isSong
      ? formatSongDesc(data.description)
      : isArtist
      ? 'Artist'
      : `By: ${data.owner}`,
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
