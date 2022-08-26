/** @jsxImportSource @emotion/react */
import {useState, useDeferredValue, useEffect, Fragment} from 'react'
import styled from '@emotion/styled/macro'
import {useSelector} from 'react-redux'
import Input from 'components/input'
import Typography from 'components/typography'
import Spinner from 'components/spinner'
import Card from 'components/card'
import colors from 'utils/colors'
import * as mq from 'utils/media-query'
import {useQueryDataMutation} from 'store/api/search'

function Search() {
  const [query, setQuery] = useState('')
  const defferedQuery = useDeferredValue(query)
  const {data, isLoading, error} = useSelector(s => s.search)
  const [searchQuery] = useQueryDataMutation()

  useEffect(() => {
    if (defferedQuery.length) {
      searchQuery({query: defferedQuery.toLowerCase()})
    }
  }, [defferedQuery, searchQuery])

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
      {isLoading ? (
        <CenteredContent>
          <Spinner />
        </CenteredContent>
      ) : null}
      {error && query ? (
        <CenteredContent>
          <Typography>{error}</Typography>
        </CenteredContent>
      ) : null}
      {data?.songs?.length ? (
        <Fragment>
          <Typography css={{marginTop: 20}} variant="h1">
            Songs
          </Typography>
          <ListContainer>
            {data.songs.map(song => (
              <Card key={song.id} data={song} />
            ))}
          </ListContainer>
        </Fragment>
      ) : null}
      {data?.artists?.length ? (
        <Fragment>
          <Typography css={{marginTop: 40}} variant="h1">
            Artists
          </Typography>
          <ListContainer>
            {data.artists.map(artist => (
              <Card kind="artist" key={artist.id} data={artist} />
            ))}
          </ListContainer>
        </Fragment>
      ) : null}
      {data?.playlists?.length ? (
        <Fragment>
          <Typography css={{marginTop: 40}} variant="h1">
            Playlists
          </Typography>
          <ListContainer>
            {data.playlists.map(playlist => (
              <Card kind="playlist" key={playlist.id} data={playlist} />
            ))}
          </ListContainer>
        </Fragment>
      ) : null}
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

const CenteredContent = styled.div({
  width: '100%',
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Search
