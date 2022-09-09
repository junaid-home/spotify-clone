/** @jsxImportSource @emotion/react */
import 'rc-dropdown/assets/index.css'
import {useEffect, useState, useDeferredValue, Fragment} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import LeftArrowIcon from 'icons/left-arrow'
import RightArrowIcon from 'icons/right-arrow'
import MenuIcon from 'icons/menu'
import Input from './input'
import SidebarNavigation from './sidebar-navigation'
import UserMenuDropDown from './user-menu-dropdown'
import Logo from './logo'
import colors from 'utils/colors'
import * as mq from 'utils/media-query'
import {useQueryDataMutation} from 'store/api/search'

function Header({setOpenModal}) {
  const location = useLocation()

  const isAuth = useSelector(s => s.auth.isAuthenticated)
  const playlists = useSelector(s => s.auth.user.playlists)

  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [solidHeader, setSolidHeader] = useState(false)
  const deferredSolidHeaderValue = useDeferredValue(solidHeader)
  const [query, setQuery] = useState('')
  const defferedQuery = useDeferredValue(query)
  const [searchQuery] = useQueryDataMutation()

  useEffect(() => {
    searchQuery({query: defferedQuery.toLowerCase()})
  }, [defferedQuery, searchQuery])

  useEffect(() => {
    function scrollHandler(e) {
      if (window.scrollY > 60) {
        setSolidHeader(true)
      } else {
        setSolidHeader(false)
      }
    }
    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return !isAuth ? (
    <UnAuthWrapper>
      <Logo />
    </UnAuthWrapper>
  ) : (
    <Fragment>
      <Overlay open={openSideMenu} onClick={() => setOpenSideMenu(false)} />
      <SidebarNavigation
        openMenu={openSideMenu}
        setOpenMenu={setOpenSideMenu}
        setOpenModal={setOpenModal}
        playlists={playlists}
      />
      <AuthWrapper
        css={{
          background: deferredSolidHeaderValue ? colors.darkest : 'transparent',
        }}
      >
        <ContentContainer>
          <MenuFilledIcon onClick={() => setOpenSideMenu(true)} />
          <FilledLeftArrowIcon css={{marginRight: 25}} />
          <FilledRightArrowIcon />
          {location.pathname === '/search' && (
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              variant="search"
              placeholder="Artists, Songs, or Playlists"
              css={{
                marginLeft: 30,
                flex: 1,
                maxWidth: '55%',
                [mq.md]: {
                  display: 'none',
                },
              }}
            />
          )}
        </ContentContainer>
        <UserMenuDropDown />
      </AuthWrapper>
    </Fragment>
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
  zIndex: 98,
  width: '100%',
  userSelect: 'none',

  [mq.md]: {
    padding: '13px 30px',
  },
})

const ContentContainer = styled.div({
  marginLeft: 232,
  display: 'flex',
  flex: 1,
  [mq.md]: {marginLeft: 0},
})

const FilledLeftArrowIcon = styled(LeftArrowIcon)({
  backgroundColor: colors.darkest,
  padding: 4,
  borderRadius: 100,
  display: 'inline-block',

  [mq.md]: {
    display: 'none',
  },
})

const FilledRightArrowIcon = styled(RightArrowIcon)({
  backgroundColor: colors.darkest,
  padding: 4,
  borderRadius: 100,
  display: 'inline-block',

  [mq.md]: {
    display: 'none',
  },
})

const MenuFilledIcon = styled(MenuIcon)({
  backgroundColor: colors.darkest,
  padding: 6,
  borderRadius: 100,
  width: 36,
  height: 36,
  display: 'none',
  WebkitTapHighlightColor: 'transparent',
  [mq.md]: {
    display: 'inline-block',
  },
})

const Overlay = styled.div(({open}) =>
  open
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
        background: 'rgba(255,255,255,.5)',
        transition: 'background .5s ease-in',
      }
    : null,
)

export default Header
