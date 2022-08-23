/** @jsxImportSource @emotion/react */
import {useState, useDeferredValue, useEffect} from 'react'
import styled from '@emotion/styled/macro'
// import {useSelector} from 'react-redux'
import Input from 'components/input'
import Typography from 'components/typography'
import Card from 'components/card'
import {songs, artists, playlists} from 'utils/data'
import colors from 'utils/colors'
import * as mq from 'utils/media-query'

function Search() {
  const [query, setQuery] = useState('')
  const defferedQuery = useDeferredValue(query, {})
  //   const data = useSelector(s => s.search.data)

  useEffect(() => {
    console.log('running agina...')
  }, [defferedQuery])

  return (
    <div css={{color: colors.white}}>
      <Input
        value={query}
        variant="search"
        placeholder="Songs, Artists, or Playlists"
        onChange={e => setQuery(e.target.value)}
        css={{
          display: 'none',
          [mq.md]: {
            display: 'flex',
          },
        }}
      />
      <Typography css={{marginTop: 20}} variant="h1">
        Songs
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Artists
      </Typography>
      <ListContainer>
        {artists.map(artist => (
          <Card kind="artist" key={artist.id} data={artist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Playlists
      </Typography>
      <ListContainer>
        {playlists.map(playlist => (
          <Card kind="playlist" key={playlist.id} data={playlist} />
        ))}
      </ListContainer>
    </div>
  )
}

const ListContainer = styled.div({
  paddingTop: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 20,

  [mq.xl]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [mq.lg]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [mq.md]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [mq.sm]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export default Search
