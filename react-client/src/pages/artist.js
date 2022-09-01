/** @jsxImportSource @emotion/react */
import {useLayoutEffect, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import Tooltip from 'components/tooltip'
import Spinner from 'components/spinner'
import EntityInfo from 'components/entity-info'
import colors from 'utils/colors'
import * as mq from 'utils/media-query'
import SongList from 'components/song-list'
import {useGetArtistByIdQuery} from 'store/api/artist'

function Artist() {
  const location = useLocation()
  const {data, isLoading, isError, error} = useGetArtistByIdQuery(
    location.pathname.split('/')[location.pathname.split('/').length - 1],
  )

  const artist = useMemo(() => data?.data, [data])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    <ContentContainer>
      <EntityInfo data={artist} kind="artist" />
      <SongList data={artist.Songs} />
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
  background: colors.background,
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

export default Artist
