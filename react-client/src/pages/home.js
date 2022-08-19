/** @jsxImportSource @emotion/react */
import Typography from 'components/typography'
import {useSelector} from 'react-redux'
import Card from 'components/card'
import styled from '@emotion/styled/macro'
import colors from 'utils/colors'
import {artists, playlists, songs} from 'utils/data'

function Home() {
  const user = useSelector(s => s.auth.user)

  return (
    <div css={{color: colors.white}}>
      <Typography variant="h1">Made for {user.name}</Typography>
      <ListContainer>
        <Card data={songs[0]} />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular albums
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Trending now
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Mood
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular new releases
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Late night listenings
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular artists
      </Typography>
      <ListContainer>
        {artists.map(artist => (
          <Card kind="artist" data={artist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        International emerging artists
      </Typography>
      <ListContainer>
        {artists.map(artist => (
          <Card kind="artist" data={artist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Sleep
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Your playlists
      </Typography>
      <ListContainer>
        {playlists.map(playlist => (
          <Card kind="playlist" data={playlist} />
        ))}
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Focus
      </Typography>
      <ListContainer>
        {songs.map(song => (
          <Card data={song} />
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
})

export default Home
