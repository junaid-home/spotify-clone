/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styled from '@emotion/styled/macro'
import {ClassNames, css} from '@emotion/react/macro'
import Menu, {Item as MenuItem} from 'rc-menu'
import Dropdown from 'rc-dropdown'
import PersonIcon from 'icons/person'
import ArrowDownIcon from 'icons/arrow-down'
import ArrowUpIcon from 'icons/arrow-up'
import Typography from './typography'
import colors from 'utils/colors'
import {useLogoutMutation} from 'store/api/auth'

function UserMenuDropDown() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const user = useSelector(s => s.auth.user)

  async function onSelect({key}) {
    if (key !== '/logout') {
      navigate(key)
    }
    await logout().unwrap()
  }

  const menu = (
    <ClassNames>
      {({cx, css}) => (
        <Menu rootClassName={cx(css(menuStyles))} onSelect={onSelect}>
          <MenuItem key="/accounts" className={cx(css(menuItemStyles))}>
            My Account
          </MenuItem>
          <MenuItem key="/profile" className={cx(css(menuItemStyles))}>
            Profile
          </MenuItem>
          <MenuItem key="/logout" className={cx(css(menuItemStyles))}>
            Logout
          </MenuItem>
        </Menu>
      )}
    </ClassNames>
  )

  return (
    <Dropdown
      onVisibleChange={() => setOpen(prev => !prev)}
      trigger={['click']}
      overlay={menu}
      animation="slide-up"
    >
      <UserArea>
        <PersonIconContainer>
          {user.picture ? (
            <PersonImage
              src={user.picture}
              alt={user.name}
              css={{marginRight: 10}}
            />
          ) : (
            <PersonFilledIcon css={{marginRight: 10}} />
          )}
          <Typography css={{color: 'white', marginRight: 10}}>
            {user.name.split(' ')[0].toLowerCase()}
          </Typography>
        </PersonIconContainer>
        {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </UserArea>
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

  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.grey} !important`,
  },

  '&:hover': {
    backgroundColor: `${colors.dark} !important`,
    color: `${colors.white} !important`,
  },
})

const UserArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',

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

const PersonFilledIcon = styled(PersonIcon)({
  backgroundColor: colors.grey,
  padding: 6,
  borderRadius: 100,
  width: 30,
  height: 30,
})

const PersonImage = styled.img({
  borderRadius: 100,
  width: 30,
  height: 30,
})

export default UserMenuDropDown
