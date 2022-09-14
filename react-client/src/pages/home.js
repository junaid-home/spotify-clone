/** @jsxImportSource @emotion/react */
import {useSelector} from 'react-redux'
import styled from '@emotion/styled/macro'

import {ErrorTooltip} from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'

import colors from 'utils/colors'

import {useGetHomeDataQuery} from 'store/api/home'
import CardList from 'components/card-list'

function Home() {
  const user = useSelector(s => s.auth.user)
  const {data, isLoading, isError, error} = useGetHomeDataQuery()

  if (isError) return <ErrorTooltip error={error} />
  if (isLoading) return <FullPageSpinner />

  return (
    <Wrapper>
      <CardList
        title={`Made for ${user.name}`}
        data={data?.data.special}
        kind="song"
      />
      <CardList
        title="Popular albums"
        data={data?.data.popular}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Trending now"
        data={data?.data.trending}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Mood"
        data={data?.data.mood}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Popular new releases"
        data={data?.data.newPopular}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Late night listenings"
        data={data?.data.lateNight}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Popular artists"
        data={data?.data.artists}
        kind="artist"
        css={{marginTop: 40}}
      />
      <CardList
        title="International emerging artists"
        data={data?.data.internationalArtists}
        kind="artist"
        css={{marginTop: 40}}
      />
      <CardList
        title="Sleep"
        data={data?.data.sleep}
        kind="song"
        css={{marginTop: 40}}
      />
      <CardList
        title="Your playlists"
        data={data?.data.playlists}
        kind="playlist"
        css={{marginTop: 40}}
      />
      <CardList
        title="Focus"
        data={data?.data.focus}
        kind="song"
        css={{marginTop: 40}}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  color: colors.white,
  padding: '80px 30px',
  background: colors.background,
})

export default Home
