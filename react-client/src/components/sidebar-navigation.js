/** @jsxImportSource @emotion/react */
import * as React from 'react'
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'

import Logo from './logo'
import NavLink from './nav-link'
import Typography from './typography'

import HomeIcon from 'icons/home'
import HomeActiveIcon from 'icons/home-active'
import SearchIcon from 'icons/search'
import SearchActiveIcon from 'icons/search-active'
import LibraryIcon from 'icons/library'
import LibraryActiveIcon from 'icons/library-active'
import PlusIcon from 'icons/plus'
import HeartIcon from 'icons/heart'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

function SidebarNavigation({openMenu, setOpenMenu, setOpenModal, playlists}) {
  return (
    <Wrapper openMenu={openMenu}>
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
        onClick={() => setOpenMenu(false)}
      />
      <NavLink
        icon={SearchIcon}
        activeIcon={SearchActiveIcon}
        text="Search"
        link="/search"
        css={{marginBottom: 8}}
        onClick={() => setOpenMenu(false)}
      />
      <NavLink
        icon={LibraryIcon}
        activeIcon={LibraryActiveIcon}
        text="Your Library"
        link="/library"
        css={{marginBottom: 50}}
        onClick={() => setOpenMenu(false)}
      />
      <NavLink
        icon={PlusFilledIcon}
        activeIcon={PlusFilledIcon}
        text="Create Playlist"
        link="#"
        css={{marginBottom: 8}}
        onClick={() => {
          setOpenModal(true)
          setOpenMenu(false)
        }}
      />
      <NavLink
        icon={HeartFilledIcon}
        activeIcon={HeartFilledIcon}
        text="Liked Songs"
        link="/favorites"
        css={{marginBottom: 18}}
        onClick={() => setOpenMenu(false)}
      />
      <div
        css={{
          width: '80%',
          marginLeft: 20,
          borderBottom: `1px solid ${colors.dark}`,
        }}
      />
      <div css={{color: colors.grey, padding: 20}}>
        {playlists?.data &&
          playlists.data.map(p => (
            <Link key={p.id} to={`/playlist/${p.id}`}>
              <Typography
                css={{cursor: 'pointer', marginBottom: 15}}
                variant="label"
              >
                #{p.name}
              </Typography>
            </Link>
          ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div(
  {
    background: colors.darkest,
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 101,
    minHeight: '100vh',
    overflow: 'hidden',
    width: 242,
    transition: 'left 0.3s ease-in-out',
    userSelect: 'none',
    [mq.md]: {
      left: -242,
    },
  },
  ({openMenu}) =>
    openMenu
      ? {
          [mq.md]: {
            left: 0,
          },
        }
      : null,
)

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

export default React.memo(SidebarNavigation)
