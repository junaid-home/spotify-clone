/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import Logo from 'components/logo'
import colors from 'utils/colors'
import NavLink from './nav-link'
import HomeIcon from 'icons/home'
import HomeActiveIcon from 'icons/home-active'
import SearchIcon from 'icons/search'
import SearchActiveIcon from 'icons/search-active'
import LibraryIcon from 'icons/library'
import LibraryActiveIcon from 'icons/library-active'
import PlusIcon from 'icons/plus'
import HeartIcon from 'icons/heart'

function SidebarNavigator() {
  return (
    <Wrapper>
      <Logo
        variant="light"
        css={{width: 135, alignSelf: 'center', margin: 20}}
      />
      <NavLink
        icon={HomeIcon}
        activeIcon={HomeActiveIcon}
        text="Home"
        link="/"
        css={{marginBottom: 8}}
      />
      <NavLink
        icon={SearchIcon}
        activeIcon={SearchActiveIcon}
        text="Search"
        link="/search"
        css={{marginBottom: 8}}
      />
      <NavLink
        icon={LibraryIcon}
        activeIcon={LibraryActiveIcon}
        text="Your Library"
        link="/library"
        css={{marginBottom: 50}}
      />
      <NavLink
        icon={PlusFilledIcon}
        activeIcon={PlusFilledIcon}
        text="Create Playlist"
        link="/playlist"
        css={{marginBottom: 8}}
      />
      <NavLink
        icon={HeartFilledIcon}
        activeIcon={HeartFilledIcon}
        text="Liked Songs"
        link="/favorites"
        css={{marginBottom: 18}}
      />
      <div
        css={{
          width: '80%',
          marginLeft: 20,
          borderBottom: `1px solid ${colors.dark}`,
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  background: colors.darkest,
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 101,
  width: 242,
  minHeight: '100vh',
  overflow: 'hidden',
})

const PlusFilledIcon = styled(PlusIcon)({
  background: colors.white,
  padding: 5,
  width: 22,
  height: 22,
  borderRadius: 2,
})
const HeartFilledIcon = styled(HeartIcon)({
  backgroundImage:
    'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
  padding: 5,
  width: 22,
  height: 22,
  borderRadius: 2,
})

export default SidebarNavigator
