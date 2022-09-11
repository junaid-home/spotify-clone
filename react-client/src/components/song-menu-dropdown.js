/** @jsxImportSource @emotion/react */
import {toast} from 'react-toastify'
import {ClassNames, css} from '@emotion/react/macro'
import Menu, {Item as MenuItem} from 'rc-menu'

import PlusIcon from 'icons/plus'
import Dropdown from 'rc-dropdown'
import MoreIcon from 'icons/more'

import colors from 'utils/colors'

import {
  useAddSongToPlaylistMutation,
  useGetAllMyPlaylistsQuery,
} from 'store/api/playlist'

function SongMenuDropdown({isFocused, song}) {
  const {data: playlists} = useGetAllMyPlaylistsQuery()
  const [addSongToPlaylist] = useAddSongToPlaylistMutation()

  async function onSelect({key}) {
    const result = await addSongToPlaylist({songId: song, playlistId: key})
    if (result.data?.data?.PlaylistId === key) {
      toast.success('Song added to the playlist')
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }
  }

  const menu = (
    <ClassNames>
      {({cx, css}) => (
        <Menu rootClassName={cx(css(menuStyles))} onSelect={onSelect}>
          <MenuItem
            key="/accounts"
            disabled
            className={cx(css(menuItemStyles, {backgroundColor: colors.black}))}
          >
            <PlusIcon
              fill="#FFF"
              width={16}
              height={16}
              css={{marginRight: 10}}
            />{' '}
            Add To Playlist
          </MenuItem>
          {playlists.data.map(p => (
            <MenuItem key={p.id} className={cx(css(menuItemStyles))}>
              {p.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </ClassNames>
  )

  return (
    <Dropdown trigger={['click']} overlay={menu} animation="slide-up">
      <span
        css={{
          marginLeft: 20,
          cursor: 'pointer',
          opacity: isFocused ? 1 : 0,
        }}
      >
        <MoreIcon />
      </span>
    </Dropdown>
  )
}

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
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.grey} !important`,
  },

  '&:hover': {
    backgroundColor: `${colors.dark} !important`,
    color: `${colors.white} !important`,
  },
})

export default SongMenuDropdown
