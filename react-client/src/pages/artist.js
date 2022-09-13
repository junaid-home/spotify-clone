/** @jsxImportSource @emotion/react */
import {useLayoutEffect, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'

import Tooltip from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'
import EntityInfo from 'components/entity-info'
import SongList from 'components/song-list'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

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

  if (isError || isLikedError)
    return (
      <FixedPositionContent>
        <Tooltip
          type="danger"
          noMargin
          message={error?.data?.message || error.message}
        />
      </FixedPositionContent>
    )

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

const FixedPositionContent = styled.div({
  background: colors.background,
  minHeight: '120vh',
  color: colors.white,
  left: 242,
  position: 'fixed',
  top: 63,
  right: 0,

  [mq.md]: {
    left: 0,
  },
})

export default Artist
