import styled from '@emotion/styled/macro'
import {Outlet} from 'react-router-dom'

import Header from './header'
import CreatePlaylistModal from './create-playlist-modal'

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
          <Outlet />
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

export default Layout
