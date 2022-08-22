import styled from '@emotion/styled'
import {Outlet} from 'react-router-dom'
import Header from 'components/header'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

function Layout() {
  return (
    <Wrapper>
      <Header />
      <MainArea>
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainArea>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
})

const MainArea = styled.div({
  flex: 1,
  position: 'relative',
  marginLeft: 242,

  [mq.md]: {
    marginLeft: 0,
  },
})

const ContentArea = styled.div({
  padding: '80px 30px',
  background: colors.background,
  minHeight: '120vh',
})

export default Layout
