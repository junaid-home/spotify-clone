/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {useSelector} from 'react-redux'

import Input from 'components/input'
import Spinner from 'components/spinner'
import Typography from 'components/typography'
import CardList from 'components/card-list'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import useSearchQuery from 'hooks/use-search-query'

function Search() {
  const [query, setQuery] = useSearchQuery()
  const {data, isLoading, error} = useSelector(s => s.search)

  return (
    <Wrapper>
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
      <CardList
        title="Songs"
        kind="song"
        data={data.songs}
        css={{marginTop: 40}}
      />
      <CardList
        title="Artists"
        kind="artist"
        data={data.artists}
        css={{marginTop: 40}}
      />
      <CardList
        title="Playlists"
        kind="playlist"
        data={data.playlists}
        css={{marginTop: 40}}
      />
    </Wrapper>
  )
}

const CenteredContent = styled.div({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
  textAlign: 'center',
})

const Wrapper = styled.div({
  color: colors.white,
  padding: '80px 30px',
  minHeight: '100vh',
})

export default Search
