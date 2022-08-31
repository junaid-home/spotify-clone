/** @jsxImportSource @emotion/react */
import {ClassNames, css} from '@emotion/react/macro'
import Menu, {Item as MenuItem} from 'rc-menu'
import PlusIcon from 'icons/plus'
import Dropdown from 'rc-dropdown'
import colors from 'utils/colors'

function SongMenuDropdown({children}) {
  async function onSelect({key}) {}

  const menu = (
    <ClassNames>
      {({cx, css}) => (
        <Menu rootClassName={cx(css(menuStyles))} onSelect={onSelect}>
          <MenuItem
            key="/accounts"
            disabled
            className={cx(css(menuItemStyles))}
          >
            <PlusIcon
              fill="#FFF"
              width={16}
              height={16}
              css={{marginRight: 10}}
            />{' '}
            Add To Playlist
          </MenuItem>
        </Menu>
      )}
    </ClassNames>
  )

  return (
    <Dropdown trigger={['click']} overlay={menu} animation="slide-up">
      {children}
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
  justifyContent: 'center',
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
