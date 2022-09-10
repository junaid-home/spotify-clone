/** @jsxImportSource @emotion/react */
import {useSelector} from 'react-redux'
import styled from '@emotion/styled/macro'
import Typography from 'components/typography'
import Card from 'components/card'
import colors from 'utils/colors'
import {useGetHomeDataQuery} from 'store/api/home'
import Tooltip from 'components/tooltip'
import Spinner from 'components/spinner'
import {Fragment} from 'react'
import * as mq from 'utils/media-query'

function Home() {
  const user = useSelector(s => s.auth.user)
  const {data, isLoading, isError, error} = useGetHomeDataQuery()

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
  if (isLoading)
    return (
      <CenteredContent>
        <Spinner />
      </CenteredContent>
    )

  return (
    <div
      css={{
        color: colors.white,
        padding: '80px 30px',
        background: colors.background,
      }}
    >
      <Typography variant="h2">Made for {user.name}</Typography>
      <ListContainer>
        {data.data.special.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Popular albums
      </Typography>
      <ListContainer>
        {data.data.popular.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Trending now
      </Typography>
      <ListContainer>
        {data.data.trending.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Mood
      </Typography>
      <ListContainer>
        {data.data.mood.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Popular new releases
      </Typography>
      <ListContainer>
        {data.data.newPopular.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Late night listenings
      </Typography>
      <ListContainer>
        {data.data.lateNight.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Popular artists
      </Typography>
      <ListContainer>
        {data.data.artists.map(artist => (
          <Card key={artist.id} kind="artist" data={artist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        International emerging artists
      </Typography>
      <ListContainer>
        {data.data.internationalArtists.map(artist => (
          <Card key={artist.id} kind="artist" data={artist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h2">
        Sleep
      </Typography>
      <ListContainer>
        {data.data.sleep.map(song => (
          <Card key={song.id} data={song} />
        ))}
      </ListContainer>
      {data.data?.playlists?.length ? (
        <Fragment>
          <Typography css={{marginTop: 40}} variant="h2">
            Your playlists
          </Typography>
          <ListContainer>
            {data.data.playlists.map(playlist => (
              <Card key={playlist.id} kind="playlist" data={playlist} />
            ))}
          </ListContainer>
        </Fragment>
      ) : null}
      <Typography css={{marginTop: 40}} variant="h2">
        Focus
      </Typography>
      <ListContainer>
        {data.data.focus.map(song => (
          <Card key={song.id} data={song} />
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

const CenteredContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.background,
  minHeight: '100vh',
})

const FixedPositionContent = styled.div({
  background: colors.background,
  minHeight: '120vh',
  color: colors.white,

  [mq.md]: {
    left: 0,
  },
})

export default Home
