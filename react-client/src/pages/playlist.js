/** @jsxImportSource @emotion/react */
import {useMemo, useLayoutEffect} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'

import Tooltip from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'
import SongList from 'components/song-list'
import EntityInfo from 'components/entity-info'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import {useGetAllLikedItemsQuery} from 'store/api/like'
import {
  useGetPlaylistByIdQuery,
  useLikePlaylistMutation,
} from 'store/api/playlist'

function Playlist() {
  const location = useLocation()
  const {data, isLoading, isError, error} = useGetPlaylistByIdQuery(
    location.pathname.split('/')[location.pathname.split('/').length - 1],
  )
  const {
    data: likedData,
    isLoading: isLikedSongs,
    isError: isLikedError,
    refetch: refetchLikes,
  } = useGetAllLikedItemsQuery()
  const [likePlaylist] = useLikePlaylistMutation()

  const playlist = useMemo(() => data?.data, [data])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isError || isLikedError)
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

  if (isLoading || isLikedSongs) return <FullPageSpinner />

  return (
    <ContentContainer>
      <EntityInfo data={playlist} />
      <SongList
        data={playlist}
        color={playlist.Color.code2}
        likedSongs={likedData.data.songs}
        likedEntities={likedData.data.playlists}
        refetchLikes={refetchLikes}
        likeEntity={likePlaylist}
      />
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
})

const FixedPositionContent = styled.div({
  background: colors.background,
  minHeight: '120vh',
  color: colors.white,

  [mq.md]: {
    left: 0,
  },
})

export default Playlist
