/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import styled from '@emotion/styled/macro'

import Typography from 'components/typography'
import Spinner from 'components/spinner'
import Card from 'components/card'
import Tooltip from 'components/tooltip'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import {useGetLikedSongsQuery} from 'store/api/like'

function Favourites() {
  const {data, isLoading, isError, error} = useGetLikedSongsQuery()

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
  if (isLoading) {
    return (
      <CenteredContent>
        <Spinner />
      </CenteredContent>
    )
  }

  return (
    <Wrapper>
      <Fragment>
        <ListContainer>
          {data?.data.map(song => (
            <Card key={song.id} data={song} />
          ))}
          {!data?.data?.length && (
            <CenteredContent>
              <Typography>You didn't liked any songs!</Typography>
            </CenteredContent>
          )}
        </ListContainer>
      </Fragment>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  color: colors.white,
  padding: '60px 30px',
  background: `linear-gradient(0deg, rgba(18,18,18,1) 50%, rgba(33,33,33,1) 95%)`,
  minHeight: '100vh',
})

const ListContainer = styled.div({
  paddingTop: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 20,

  [mq.xl]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [mq.lg]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [mq.md]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [mq.sm]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

const CenteredContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.background,
  minHeight: '100vh',
})

const FixedPositionContent = styled.div({
  background: colors.background,
  minHeight: '120vh',
  color: colors.white,

  [mq.md]: {
    left: 0,
  },
})

export default Favourites
