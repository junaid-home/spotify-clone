/** @jsxImportSource @emotion/react */
import {useMemo, useLayoutEffect} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'

import {ErrorTooltip} from 'components/tooltip'
import {FullPageSpinner} from 'components/spinner'
import SongList from 'components/song-list'
import EntityInfo from 'components/entity-info'

import colors from 'utils/colors'

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
  const color = useMemo(() => playlist?.Color?.code2, [playlist])
  const likedSongs = useMemo(() => likedData?.data?.songs, [likedData])
  const likedEntities = useMemo(() => likedData?.data?.playlists, [likedData])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isError || isLikedError) return <ErrorTooltip error={error} />
  if (isLoading || isLikedSongs) return <FullPageSpinner />

  return (
    <ContentContainer>
      <EntityInfo data={playlist} />
      <SongList
        data={playlist}
        color={color}
        likedSongs={likedSongs}
        likedEntities={likedEntities}
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

export default Playlist
