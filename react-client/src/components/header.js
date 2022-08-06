import styled from '@emotion/styled/macro'
import Logo from 'components/logo'
import colors from 'utils/colors'

function Header(props) {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  minWidth: '100%',
  borderBottom: `1px solid ${colors.lightGrey}`,
  padding: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Header
