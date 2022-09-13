/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Typography from 'components/typography'
import Button from 'components/button'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

function Account() {
  const navigate = useNavigate()
  const user = useSelector(s => s.auth.user)

  return (
    <ContentContainer>
      <Typography variant="h1" css={{color: colors.lightGrey}}>
        Account overview
      </Typography>
      <Typography variant="h2" css={{marginTop: 20, color: colors.lightGrey}}>
        Profile
      </Typography>
      <List css={{marginTop: 40}}>
        <ListItem>
          <Typography>User Id</Typography>
        </ListItem>
        <ListItem>
          <Typography
            css={{
              color: colors.white,
              maxWidth: '70vw',
              wordWrap: 'break-word',
            }}
          >
            {user.id}
          </Typography>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Typography>Username</Typography>
        </ListItem>
        <ListItem>
          <Typography css={{color: colors.white}}>{user.name}</Typography>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Typography>Email</Typography>
        </ListItem>
        <ListItem>
          <Typography
            css={{
              color: colors.white,
              maxWidth: '70vw',
              wordWrap: 'break-word',
            }}
          >
            {user.email}
          </Typography>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Typography>Date of Birth</Typography>
        </ListItem>
        <ListItem>
          <Typography css={{color: colors.white}}>{user.dob}</Typography>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Typography>Country</Typography>
        </ListItem>
        <ListItem>
          <Typography css={{color: colors.white}}>{user.country}</Typography>
        </ListItem>
      </List>
      <Button
        css={{marginTop: 40, color: colors.white}}
        onClick={() => navigate('/profile')}
      >
        Edit Profile
      </Button>
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  userSelect: 'none',
  minHeight: '100vh',
  paddingTop: 80,
  paddingLeft: 40,
  paddingRight: 40,
})

const List = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${colors.grey}`,
  width: '100%',
  marginTop: 20,

  [mq.sm]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

const ListItem = styled.div({
  padding: 15,
  paddingLeft: 0,
  flex: 1,
  color: colors.grey,
})

export default Account
