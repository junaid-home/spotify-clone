/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import styled from '@emotion/styled/macro'

import Typography from 'components/typography'
import {FullPageSpinner} from 'components/spinner'
import Card from 'components/card'
import {ErrorTooltip} from 'components/tooltip'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import {useGetLikedSongsQuery} from 'store/api/like'

function Favourites() {
  const {data, isLoading, isError, error} = useGetLikedSongsQuery()

  if (isError) return <ErrorTooltip error={error} />
  if (isLoading) {
    return <FullPageSpinner />
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
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.background,
  minHeight: '100vh',
  textAlign: 'center',
})

export default Favourites
