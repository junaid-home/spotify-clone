/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import styled from '@emotion/styled/macro'
import Typography from 'components/typography'
import Tooltip from 'components/tooltip'
import Spinner from 'components/spinner'
import Card from 'components/card'
import colors from 'utils/colors'
import * as mq from 'utils/media-query'
import {useGetAllLikedItemsQuery} from 'store/api/like'

function Library() {
  const {data, isLoading, isError, error} = useGetAllLikedItemsQuery()

  if (isError)
    return (
      <FixedPositionContent>
        <Tooltip
          type="danger"
          noMargin
          message={error?.data?.message || error.error}
          css={{position: 'fixed', top: 63, left: 242, right: 0}}
        />
      </FixedPositionContent>
    )
  if (isLoading) {
    return (
      <CenteredContent>
        <Spinner />
      </CenteredContent>
    )
  }

  return (
    <Wrapper>
      <Fragment>
        <Typography css={{marginTop: 20}} variant="h1">
          Songs
        </Typography>
        <ListContainer>
          {data?.data?.songs.map(song => (
            <Card key={song.id} data={song} />
          ))}
        </ListContainer>
      </Fragment>
      <Fragment>
        <Typography css={{marginTop: 40}} variant="h1">
          Artists
        </Typography>
        <ListContainer>
          {data?.data?.artists.map(artist => (
            <Card kind="artist" key={artist.id} data={artist} />
          ))}
        </ListContainer>
      </Fragment>
      <Fragment>
        <Typography css={{marginTop: 40}} variant="h1">
          Playlists
        </Typography>
        <ListContainer>
          {data?.data?.playlists.map(playlist => (
            <Card kind="playlist" key={playlist.id} data={playlist} />
          ))}
        </ListContainer>
      </Fragment>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  color: colors.white,
  padding: '80px 30px',
  background: `linear-gradient(0deg, rgba(18,18,18,1) 50%, rgba(33,33,33,1) 95%)`,
  minHeight: '100vh',
})

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

const FixedPositionContent = styled.div({
  background: colors.background,
  minHeight: '120vh',
  color: colors.white,

  [mq.md]: {
    left: 0,
  },
})

const CenteredContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.background,
  minHeight: '100vh',
})

export default Library
