import 'react-jinke-music-player/assets/index.css'

import {useDispatch, useSelector} from 'react-redux'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import {ClassNames} from '@emotion/react'

import {useAudioInstance} from 'context/audio-instance'

import {setPlayingStatus} from 'store/reducers/player'

function MusicPlayer() {
  const dispatch = useDispatch()
  const audioLists = useSelector(s => s.player.playing)
  const audioInstanceRef = useAudioInstance()

  return (
    <ClassNames>
      {({cx, css}) => (
        <ReactJkMusicPlayer
          mode="full"
          preload="auto"
          glassBg
          spaceBar
          showMediaSession
          clearPriorAudioLists
          showReload={false}
          showDownload={false}
          showPlayMode={false}
          showThemeSwitch={false}
          showLyric={false}
          showDestroy={false}
          showMiniProcessBar={false}
          autoPlayInitLoadPlayList={false}
          audioLists={audioLists}
          className={cx(css(playerPanelStyles))}
          getAudioInstance={instance => {
            audioInstanceRef.current = instance
          }}
          onAudioPause={info => {
            dispatch(setPlayingStatus({status: false, src: info.musicSrc}))
          }}
          onAudioPlay={info => {
            dispatch(setPlayingStatus({status: true, src: info.musicSrc}))
          }}
        />
      )}
    </ClassNames>
  )
}

const playerPanelStyles = {
  '& .music-player-panel': {zIndex: 1000},
}

export default MusicPlayer
