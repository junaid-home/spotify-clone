import {useState} from 'react'
import styled from '@emotion/styled/macro'
import {Outlet} from 'react-router-dom'

import Header from './header'
import CreatePlaylistModal from './create-playlist-modal'
import MusicPlayer from './music-player'

import {AudioInstanceProvider} from 'context/audio-instance'

import * as mq from 'utils/media-query'

function Layout() {
  const [openModal, setOpenModal] = useState()

  return (
    <AudioInstanceProvider>
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
      <MusicPlayer />
    </AudioInstanceProvider>
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
