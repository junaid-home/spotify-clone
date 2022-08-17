/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import Logo from 'components/logo'
import {useSelector} from 'react-redux'
import colors from 'utils/colors'
import LeftArrowIcon from 'icons/left-arrow'
import RightArrowIcon from 'icons/right-arrow'
import ArrowDownIcon from 'icons/arrow-down'
import PersonIcon from 'icons/person'
import Typography from './typography'

function Header() {
  const isAuth = useSelector(s => s.auth.isAuthenticated)
  const user = useSelector(s => s.auth.user)

  return !isAuth ? (
    <UnAuthWrapper>
      <Logo />
    </UnAuthWrapper>
  ) : (
    <AuthWrapper>
      <div>
        <LeftArrowIcon css={{marginRight: 20}} />
        <RightArrowIcon />
      </div>
      <UserArea>
        <PersonIconContainer>
          <PersonFilledIcon css={{marginRight: 10}} />
          <Typography css={{color: 'white', marginRight: 10}}>
            {user.name.split(' ')[0].toLowerCase()}
          </Typography>
        </PersonIconContainer>
        <ArrowDownIcon />
      </UserArea>
    </AuthWrapper>
  )
}

const UnAuthWrapper = styled.div({
  minWidth: '100%',
  borderBottom: `1px solid ${colors.lightGrey}`,
  padding: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const AuthWrapper = styled.div({
  minWidth: '100%',
  padding: '13px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.dark,
  color: colors.white,
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 100,
})

const UserArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: colors.darkest,
    borderRadius: 100,
  },
})

const PersonIconContainer = styled.span({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const PersonFilledIcon = styled(PersonIcon)({
  backgroundColor: colors.grey,
  padding: 6,
  borderRadius: 100,
  width: 30,
  height: 30,
})

export default Header
