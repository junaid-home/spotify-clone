import styled from '@emotion/styled/macro'

import Typography from './typography'
import Card from './card'

import * as mq from 'utils/media-query'

function CardList({title, kind, data, ...rest}) {
  return data?.length ? (
    <div {...rest}>
      <Typography css={{marginTop: 40}} variant="h2">
        {title}
      </Typography>
      <ListContainer>
        {data.map(x => (
          <Card kind={kind} key={x.id} data={x} />
        ))}
      </ListContainer>
    </div>
  ) : null
}

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

export default CardList
