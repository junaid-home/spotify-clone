/** @jsxImportSource @emotion/react */
import {useLayoutEffect, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'

import {ErrorTooltip} from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'
import EntityInfo from 'components/entity-info'
import SongList from 'components/song-list'

import colors from 'utils/colors'

import {useGetArtistByIdQuery, useLikeArtistMutation} from 'store/api/artist'
import {useGetAllLikedItemsQuery} from 'store/api/like'

function Artist() {
  const location = useLocation()
  const {data, isLoading, isError, error} = useGetArtistByIdQuery(
    location.pathname.split('/')[location.pathname.split('/').length - 1],
  )
  const {
    data: likedData,
    isLoading: isLikedSongs,
    isError: isLikedError,
    refetch: refetchLikes,
  } = useGetAllLikedItemsQuery()
  const [likeArtist] = useLikeArtistMutation()

  const artist = useMemo(() => data?.data, [data])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isError || isLikedError) return <ErrorTooltip error={error} />
  if (isLoading || isLikedSongs) return <FullPageSpinner />

  return (
    <ContentContainer>
      <EntityInfo data={artist} kind="artist" />
      <SongList
        data={artist}
        likedSongs={likedData.data.songs}
        likedEntities={likedData.data.artists}
        refetchLikes={refetchLikes}
        likeEntity={likeArtist}
      />
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  userSelect: 'none',
})

export default Artist
