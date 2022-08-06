import styled from '@emotion/styled/macro'
import colors from 'utils/colors'

const Input = styled.input({
  outline: 'none',
  border: `1px solid ${colors.lightGrey}`,
  width: '100%',
  fontSize: 16,
  padding: 15,
  color: colors.grey,
  fontFamily: 'Roboto, Arial',
  borderRadius: 5,

  '&:focus': {
    border: `3px solid ${colors.black}`,
    padding: 13,
  },
})

export default Input
