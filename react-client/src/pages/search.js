/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import styled from '@emotion/styled/macro'
import {useSelector} from 'react-redux'

import Card from 'components/card'
import Input from 'components/input'
import Spinner from 'components/spinner'
import Typography from 'components/typography'

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
      <CardList title="Songs" kind="song" data={data.songs} />
      <CardList title="Artists" kind="artist" data={data.artists} />
      <CardList title="Playlists" kind="playlist" data={data.playlists} />
    </Wrapper>
  )
}

function CardList({title, kind, data}) {
  return data?.length ? (
    <Fragment>
      <Typography css={{marginTop: 40}} variant="h2">
        {title}
      </Typography>
      <ListContainer>
        {data.map(x => (
          <Card kind={kind} key={x.id} data={x} />
        ))}
      </ListContainer>
    </Fragment>
  ) : null
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
})

export default Search
