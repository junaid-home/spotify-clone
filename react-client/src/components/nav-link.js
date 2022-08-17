/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import Typography from './typography'

function NavLink({icon: Icon, activeIcon: ActiveIcon, text, link, ...props}) {
  const location = useLocation()
  const isActive = location.pathname === link

  return (
    <Link to={link}>
      <Wrapper {...props}>
        {isActive ? <ActiveIcon /> : <Icon />}
        <Typography
          css={{marginLeft: 15, color: isActive ? 'white' : '#aaa'}}
          variant="link"
        >
          {text}
        </Typography>
      </Wrapper>
    </Link>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 22px',
})

export default NavLink
