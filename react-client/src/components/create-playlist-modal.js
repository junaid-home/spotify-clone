/** @jsxImportSource @emotion/react */
import {useCallback, useState} from 'react'
import styled from '@emotion/styled/macro'
import Modal from 'react-modal'
import {useDropzone} from 'react-dropzone'
import colors from 'utils/colors'
import CloseIcon from 'icons/close'
import PlaylistIcon from 'icons/playlist'
import Input from './input'
import Button from './button'
import * as mq from 'utils/media-query'

function CreatePlaylistModal({open, onClose}) {
  const [, setImage] = useState(null)
  const [imageSrc, setImageSrc] = useState('')
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0])

    const fileReader = new FileReader()
    fileReader.onload = e => {
      setImageSrc(e.target.result)
    }
    fileReader.readAsDataURL(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <FilledCloseIcon onClick={() => onClose()} />
      <DropZoneSection css={{marginTop: 30}}>
        <div {...getRootProps()} css={{padding: '120px 20px'}}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the playlist image file here ...</p>
          ) : (
            <p>Drop the playlist image file here, or click to select image</p>
          )}
        </div>
      </DropZoneSection>
      <BottomContainer>
        {imageSrc ? (
          <PlaylistImage src={imageSrc} alt="Playlist" css={{marginTop: 30}} />
        ) : (
          <FilledPlaylistIcon css={{marginTop: 30}} />
        )}
        <div css={{flex: 1, paddingRight: 20, [mq.md]: {paddingRight: 0}}}>
          <StyledInput placeholder="Playlist Name" />
          <StyledInput placeholder="Color code 1 (e.g #FFFFFF)" />
          <StyledInput placeholder="Color code 2 (e.g #000000)" />
        </div>
      </BottomContainer>
      <Button variant="primary" css={{marginTop: 20}}>
        Save
      </Button>
    </Modal>
  )
}

const customStyles = {
  content: {
    background: colors.dark,
    color: colors.white,
    padding: 20,
    inset: 10,
    borderColor: colors.darkest,
    borderWidth: 2,
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
}

const FilledCloseIcon = styled(CloseIcon)({
  width: 30,
  height: 30,
  background: colors.grey,
  borderRadius: 100,
  padding: 5,
  position: 'absolute',
  right: 10,
  top: 10,
  cursor: 'pointer',
  border: `2px solid ${colors.darkest}`,
})

const DropZoneSection = styled.section({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'grab',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: colors.lightGrey,
  borderStyle: 'dashed',
  backgroundColor: colors.grey,
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
})

const StyledInput = styled(Input)({
  marginTop: 20,
  marginLeft: 20,
  color: colors.lightGrey,
  [mq.md]: {marginLeft: 0},

  '&:focus': {
    borderColor: colors.white,
  },
})

const BottomContainer = styled.div({
  display: 'flex',
  alignItems: 'center',

  [mq.md]: {
    flexDirection: 'column',
  },
})

const FilledPlaylistIcon = styled(PlaylistIcon)({
  background: colors.darkest,
  height: 200,
  width: 199,
  padding: 40,
  borderRadius: 3,
})

const PlaylistImage = styled.img({
  height: 200,
  width: 199,
  borderRadius: 3,
})

export default CreatePlaylistModal
