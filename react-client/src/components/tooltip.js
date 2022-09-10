/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import Typography from './typography'

import AlertIcon from 'icons/alert'

import colors from 'utils/colors'

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

export default Tooltip
