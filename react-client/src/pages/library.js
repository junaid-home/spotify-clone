/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import {ErrorTooltip} from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'
import CardList from 'components/card-list'

import colors from 'utils/colors'

import {useGetAllLikedItemsQuery} from 'store/api/like'

function Library() {
  const {data, isLoading, isError, error} = useGetAllLikedItemsQuery()

  if (isError) return <ErrorTooltip error={error} />
  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Wrapper>
      <CardList title="Songs" kind="song" data={data?.data?.songs} />
      <CardList title="Artists" kind="artist" data={data?.data?.artists} />
      <CardList
        title="Playlists"
        kind="playlist"
        data={data?.data?.playlists}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  color: colors.white,
  padding: '80px 30px',
  minHeight: '100vh',
})

export default Library
