/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import SearchIcon from 'icons/search'

import colors from 'utils/colors'

function Input({variant, placeholder, onChange, value, ...props}) {
  return variant === 'search' ? (
    <SearchContainer {...props}>
      <SearchIcon css={{marginLeft: 10}} />
      <Input
        round
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </SearchContainer>
  ) : (
    <StyledInput
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  )
}

const StyledInput = styled.input(
  {
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
  },
  ({round}) =>
    round && {
      width: '100%',
      borderRadius: 100,
      fontSize: 13,
      background: colors.white,
      padding: 10,
      border: 'none',

      '&:focus': {
        border: 'none',
        padding: 10,
      },
    },
)

const SearchContainer = styled.div({
  background: colors.white,
  borderRadius: 100,
  width: '100%',
  alignItems: 'center',
  display: 'flex',
})

export default Input
