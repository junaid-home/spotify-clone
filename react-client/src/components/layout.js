import styled from '@emotion/styled/macro'
import {Outlet} from 'react-router-dom'
import Header from './header'
import CreatePlaylistModal from './create-playlist-modal'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'
import {Fragment, useState} from 'react'

function Layout() {
  const [openModal, setOpenModal] = useState()

  return (
    <Fragment>
      <CreatePlaylistModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Wrapper>
        <Header setOpenModal={setOpenModal} />
        <MainArea>
          <ContentArea>
            <Outlet />
          </ContentArea>
        </MainArea>
      </Wrapper>
    </Fragment>
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
