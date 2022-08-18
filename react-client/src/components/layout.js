/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import {Outlet} from 'react-router-dom'
import Header from 'components/header'
import SidebarNavigator from 'components/sidebar-navigator'
import colors from 'utils/colors'

function Layout() {
  return (
    <Wrapper>
      <SideBar>
        <SidebarNavigator />
      </SideBar>
      <MainArea>
        <Header />
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
})

const SideBar = styled.div({
  width: 242,
  position: 'relative',
})

const ContentArea = styled.div({
  padding: '80px 30px',
  background: colors.background,
  minHeight: '120vh',
})

export default Layout
