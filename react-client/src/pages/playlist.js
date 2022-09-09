/** @jsxImportSource @emotion/react */
import {useMemo, useLayoutEffect} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import Tooltip from 'components/tooltip'
import Spinner from 'components/spinner'
import EntityInfo from 'components/entity-info'
import colors from 'utils/colors'
import {useGetPlaylistByIdQuery} from 'store/api/playlist'
import {useGetLikedSongsQuery} from 'store/api/like'
import * as mq from 'utils/media-query'
import SongList from 'components/song-list'

function Playlist() {
  const location = useLocation()
  const {data, isLoading, isError, error} = useGetPlaylistByIdQuery(
    location.pathname.split('/')[location.pathname.split('/').length - 1],
  )
  const {
    data: likedSongs,
    isLoading: isLikedSongs,
    isError: isLikedError,
    refetch: refetchLikedSongs,
  } = useGetLikedSongsQuery()

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

  if (isLoading || isLikedSongs)
    return (
      <CenteredContent>
        <Spinner />
      </CenteredContent>
    )

  return (
    <ContentContainer>
      <EntityInfo data={playlist} />
      <SongList
        data={playlist.Songs}
        color={playlist.Color.code2}
        likedSongs={likedSongs.data}
        refetchLikedSongs={refetchLikedSongs}
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

const CenteredContent = styled.div({
  width: '100%',
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
