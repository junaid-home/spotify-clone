/** @jsxImportSource @emotion/react */
import Typography from 'components/typography'
import {useSelector} from 'react-redux'
import Card from 'components/card'
import styled from '@emotion/styled/macro'
import colors from 'utils/colors'

function Home() {
  const user = useSelector(s => s.auth.user)

  return (
    <div css={{color: colors.white}}>
      <Typography variant="h1">Made for {user.name}</Typography>
      <ListContainer>
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular albums
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Trending now
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Mood
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular new releases
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Late night listenings
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Popular artists
      </Typography>
      <ListContainer>
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        International emerging artists
      </Typography>
      <ListContainer>
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
        <Card type="artist" />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Sleep
      </Typography>
      <ListContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Your playlists
      </Typography>
      <ListContainer>
        <Card />
        <Card />
      </ListContainer>
      <Typography css={{marginTop: 40}} variant="h1">
        Focus
      </Typography>
      <ListContainer>
        <Card />
        <Card />
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
