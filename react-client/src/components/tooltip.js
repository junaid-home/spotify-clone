/** @jsxImportSource @emotion/react */
import AlertIcon from 'icons/alert'
import styled from '@emotion/styled/macro'
import colors from 'utils/colors'
import Typography from './typography'

function Tooltip({message, type, ...props}) {
  return (
    <Container type={type} {...props}>
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
)

export default Tooltip
