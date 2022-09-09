/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import Typography from 'components/typography'
import * as mq from 'utils/media-query'

function EntityInfo({kind = 'playlist', data}) {
  const displayData = getDisplayableData(kind, data)

  return (
    <Wrapper
      css={{
        background: `linear-gradient(0deg, ${displayData.code2} 20%, ${displayData.code1} 110%)`,
      }}
    >
      <PlaylistImage src={displayData.picture} alt={displayData.title} />
      <div
        css={{
          paddingLeft: 30,
          width: '100%',
          [mq.md]: {paddingLeft: 0, marginTop: 35},
        }}
      >
        <Typography css={{marginLeft: 5}} variant="label">
          PLAYLIST
        </Typography>
        <Typography variant="h0">{displayData.title}</Typography>
        <Typography css={{marginTop: 30, marginLeft: 5}} variant="label">
          {displayData.title.split(' ')[0]} - {data.Songs.length} songs
        </Typography>
      </div>
    </Wrapper>
  )
}

const getDisplayableData = (kind, data) => {
  const isArtist = kind === 'artist'
  const isPlaylist = kind === 'playlist'

  return {
    picture: data.picture,
    title: isPlaylist ? `#${data.name}` : data.name,
    desc: isArtist ? 'Artist' : `By: ${data.User.name}`,
    code1: isPlaylist ? data.Color.code1 : '#CE9FFC',
    code2: isPlaylist ? data.Color.code2 : '#7367F0',
  }
}

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '80px 30px 30px 30px',
  userSelect: 'none',
  [mq.lg]: {
    flexDirection: 'column',
  },
})

const PlaylistImage = styled.img({
  width: 220,
  height: 220,
  boxShadow: `0px 0px 10px rgba(0,0,0,1)`,

  [mq.md]: {
    marginTop: 40,
  },
})

export default EntityInfo
