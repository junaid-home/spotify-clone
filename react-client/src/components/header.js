/** @jsxImportSource @emotion/react */
import 'rc-dropdown/assets/index.css'
import {ClassNames} from '@emotion/react/macro'
import styled from '@emotion/styled/macro'
import {useSelector} from 'react-redux'
import Dropdown from 'rc-dropdown'
import Menu, {Item as MenuItem} from 'rc-menu'
import colors from 'utils/colors'
import Logo from 'components/logo'
import LeftArrowIcon from 'icons/left-arrow'
import RightArrowIcon from 'icons/right-arrow'
import ArrowDownIcon from 'icons/arrow-down'
import ArrowUpIcon from 'icons/arrow-up'
import PersonIcon from 'icons/person'
import Typography from './typography'
import {useNavigate} from 'react-router-dom'
import {useLogoutMutation} from 'store/api/auth'
import {useEffect, useState, useDeferredValue} from 'react'

function Header() {
  const navigate = useNavigate()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [solidHeader, setSolidHeader] = useState(false)
  const deferredSolidHeaderValue = useDeferredValue(solidHeader)
  const isAuth = useSelector(s => s.auth.isAuthenticated)
  const user = useSelector(s => s.auth.user)
  const [logout] = useLogoutMutation()

  async function onSelect({key}) {
    if (key !== '/logout') {
      navigate(key)
    }
    await logout().unwrap()
  }

  const menu = (
    <ClassNames>
      {({cx, css}) => {
        const menuStyles = css({
          backgroundColor: `${colors.darkest} !important`,
          color: `${colors.white} !important`,
          boxShadow: `none !important`,
          border: `1px solid ${colors.grey} !important`,
        })

        const menuItemStyles = css({
          padding: `10px !important`,
          fontSize: `12px !important`,
          cursor: `pointer !important`,
          fontFamily: 'inherit !important',
          color: `${colors.lightGrey} !important`,

          '&:not(:last-child)': {
            borderBottom: `1px solid ${colors.grey} !important`,
          },

          '&:hover': {
            backgroundColor: `${colors.dark} !important`,
            color: `${colors.white} !important`,
          },
        })

        return (
          <Menu rootClassName={cx(menuStyles)} onSelect={onSelect}>
            <MenuItem key="/accounts" className={cx(menuItemStyles)}>
              My Account
            </MenuItem>
            <MenuItem key="/profile" className={cx(menuItemStyles)}>
              Profile
            </MenuItem>
            <MenuItem key="/logout" className={cx(menuItemStyles)}>
              Logout
            </MenuItem>
          </Menu>
        )
      }}
    </ClassNames>
  )

  function scrollHandler(e) {
    if (window.scrollY > 60) {
      setSolidHeader(true)
    } else {
      setSolidHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return !isAuth ? (
    <UnAuthWrapper>
      <Logo />
    </UnAuthWrapper>
  ) : (
    <AuthWrapper
      css={{
        background: deferredSolidHeaderValue ? colors.darkest : 'transparent',
      }}
    >
      <div css={{marginLeft: 232}}>
        <FilledLeftArrowIcon css={{marginRight: 25}} />
        <FilledRightArrowIcon />
      </div>
      <Dropdown
        onVisibleChange={() => setIsDropDownOpen(prev => !prev)}
        trigger={['click']}
        overlay={menu}
        animation="slide-up"
      >
        <UserArea>
          <PersonIconContainer>
            <PersonFilledIcon css={{marginRight: 10}} />
            <Typography css={{color: 'white', marginRight: 10}}>
              {user.name.split(' ')[0].toLowerCase()}
            </Typography>
          </PersonIconContainer>
          {isDropDownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </UserArea>
      </Dropdown>
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
  padding: '13px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: colors.white,
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
})

const UserArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: colors.black,
    borderRadius: 100,
  },
})

const PersonIconContainer = styled.span({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const FilledLeftArrowIcon = styled(LeftArrowIcon)({
  backgroundColor: colors.darkest,
  padding: 4,
  borderRadius: 100,
})

const FilledRightArrowIcon = styled(RightArrowIcon)({
  backgroundColor: colors.darkest,
  padding: 4,
  borderRadius: 100,
})

const PersonFilledIcon = styled(PersonIcon)({
  backgroundColor: colors.grey,
  padding: 6,
  borderRadius: 100,
  width: 30,
  height: 30,
})

export default Header
