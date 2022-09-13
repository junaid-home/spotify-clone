import React, {Suspense, useState} from 'react'
import styled from '@emotion/styled/macro'
import {Outlet} from 'react-router-dom'

import {AudioInstanceProvider} from 'context/audio-instance'

import * as mq from 'utils/media-query'
import colors from 'utils/colors'

import Header from './header'
import {FullPageSpinner} from './spinner'
const CreatePlaylistModal = React.lazy(() => import('./create-playlist-modal'))
const MusicPlayer = React.lazy(() => import('./music-player'))

function Layout({showPlayer}) {
  const [openModal, setOpenModal] = useState()

  return (
    <AudioInstanceProvider>
      <Suspense fallback={<FullPageSpinner />}>
        <CreatePlaylistModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Suspense>
      <Wrapper>
        <Header setOpenModal={setOpenModal} />
        <MainArea>
          <Outlet />
        </MainArea>
      </Wrapper>
      {showPlayer ? (
        <Suspense fallback={null}>
          <MusicPlayer />
        </Suspense>
      ) : null}
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
  paddingBottom: 80,
  background: colors.background,

  [mq.md]: {
    marginLeft: 0,
  },
})

export default Layout
