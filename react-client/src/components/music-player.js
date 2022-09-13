import 'react-jinke-music-player/assets/index.css'

import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import {ClassNames} from '@emotion/react'

import {useAudioInstance} from 'context/audio-instance'

import {setPlayingStatus} from 'store/reducers/player'

function MusicPlayer() {
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)
  const audioLists = useSelector(s => s.player.playing)
  const audioInstanceRef = useAudioInstance()

  useEffect(() => {
    if (document.body.clientWidth < 587) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  return (
    <ClassNames>
      {({cx, css}) => (
        <ReactJkMusicPlayer
          mode={isMobile ? 'mini' : 'full'}
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
          defaultPosition={{bottom: 15, right: 15}}
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
  '& .music-player-panel .panel-content .img-content': {
    backgroundSize: 'cover',
  },
  '& .react-jinke-music-player-mobile-cover .cover': {
    height: '100%',
  },
  '& .music-player-controller': {
    backgroundSize: 'cover',
  },
}

export default MusicPlayer
