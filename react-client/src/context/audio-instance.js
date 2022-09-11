import {createContext, useContext, useMemo, useRef} from 'react'

const AudioInstanceContext = createContext(null)

export const AudioInstanceProvider = ({...props}) => {
  const audioInstanceRef = useRef()

  const memoizedAudioInstance = useMemo(
    () => audioInstanceRef,
    [audioInstanceRef],
  )

  return (
    <AudioInstanceContext.Provider value={memoizedAudioInstance} {...props} />
  )
}

export const useAudioInstance = () => {
  const context = useContext(AudioInstanceContext)
  if (!context)
    throw new Error(
      '"useAudioInstance" must be used inside of "AudioInstanceProvider"!',
    )

  return context
}
