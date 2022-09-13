/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import Typography from './typography'

import AlertIcon from 'icons/alert'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

function Tooltip({message, type, noMargin, ...props}) {
  return (
    <Container type={type} {...props} noMargin={noMargin}>
      {type === 'danger' && <AlertIcon />}
      <Typography css={{color: colors.white, marginLeft: 10}}>
        {message}
      </Typography>
    </Container>
  )
}

export const ErrorTooltip = ({error}) => {
  return (
    <FixedPositionContent>
      <Tooltip
        type="danger"
        noMargin
        message={error?.data?.message || error.message}
      />
    </FixedPositionContent>
  )
}

const Container = styled.div(
  {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: 3,
    // textAlign: 'left',
  },
  ({type}) => (type === 'danger' ? {backgroundColor: colors.danger} : null),
  ({noMargin}) => (noMargin ? {borderRadius: 0} : null),
)

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

export default Tooltip
