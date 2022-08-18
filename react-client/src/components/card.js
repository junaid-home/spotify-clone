/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react/macro'
import styled from '@emotion/styled/macro'
import colors from 'utils/colors'
import Typography from './typography'
import PlayIcon from 'icons/play'
import PauseIcon from 'icons/pause'
import {useState} from 'react'

const song = {
  title:
    "Janib (Duet)' FULL AUDIO Song | Arijit Singh | Divyendu Sharma | Dilliwaali Zaalim Girlfriend",
  description:
    'Dilliwaali Zaalim Girlfriend, Janib Duet FULL AUDIO Song, Arijit Singh, Divyendu Sharma',
  thumbnail: '/album.jpg',
}

const artist = {
  name: 'Atif Aslam',
  picture: '/artist.jpg',
}

function Card({type}) {
  const [displayPlayPause, setDisplayPlayPause] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Wrapper
      onMouseEnter={() => setDisplayPlayPause(true)}
      onMouseLeave={() => setDisplayPlayPause(false)}
    >
      {isPlaying ? (
        <FilledPauseIcon
          css={{display: displayPlayPause ? 'inline-block' : 'none'}}
          onClick={() => setIsPlaying(false)}
        />
      ) : (
        <FilledPlayIcon
          css={{display: displayPlayPause ? 'inline-block' : 'none'}}
          onClick={() => setIsPlaying(true)}
        />
      )}
      <Album
        artist={type === 'artist'}
        src={type === 'artist' ? artist.picture : song.thumbnail}
        alt={artist.name}
      />
      <Typography variant="one-line" css={{marginTop: 10}}>
        {type === 'artist' ? artist.name : song.title}
      </Typography>
      <Typography
        variant={type !== 'artist' ? 'two-line' : null}
        css={{marginTop: 10, color: colors.grey}}
      >
        {type === 'artist'
          ? 'Artist'
          : song.description.length > 40
          ? `${song.description.slice(0, 39)}...`
          : song.description}
      </Typography>
    </Wrapper>
  )
}

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

  '&:hover': {
    background: colors.black,
  },
})

const Album = styled.img(
  {
    width: '100%',
    height: 160,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 3,
    boxShadow: '2px 2px 5px rgba(0,0,0,.3)',
  },
  ({artist}) => (artist ? {borderRadius: 100} : null),
)

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
  zIndex: 98,
})

const FilledPlayIcon = styled(PlayIcon)(filledPlayPauseStyles)

const FilledPauseIcon = styled(PauseIcon)(filledPlayPauseStyles)

export default Card
