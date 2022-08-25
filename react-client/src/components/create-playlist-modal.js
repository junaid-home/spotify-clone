/** @jsxImportSource @emotion/react */
import {useCallback} from 'react'
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
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  const customStyles = {
    content: {
      background: colors.dark,
      color: colors.white,
      padding: 20,
      inset: 20,
    },
    overlay: {
      zIndex: 1000,
    },
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <FilledCloseIcon onClick={() => onClose()} />
      <DropZoneSection css={{marginTop: 30}}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the playlist image file here ...</p>
          ) : (
            <p>Drop the playlist image file here, or click to select image</p>
          )}
        </div>
      </DropZoneSection>
      <BottomContainer>
        <FilledPlaylistIcon css={{marginTop: 40}} />
        <div css={{flex: 1, paddingRight: 20, [mq.md]: {paddingRight: 0}}}>
          <Input
            placeholder="Playlist Name"
            css={{marginTop: 40, marginLeft: 20, [mq.md]: {marginLeft: 0}}}
          />
          <Input
            placeholder="Color code 1 (e.g #FFFFFF)"
            css={{marginTop: 20, marginLeft: 20, [mq.md]: {marginLeft: 0}}}
          />
          <Input
            placeholder="Color code 2 (e.g #000000)"
            css={{marginTop: 20, marginLeft: 20, [mq.md]: {marginLeft: 0}}}
          />
        </div>
      </BottomContainer>
      <Button variant="primary" css={{marginTop: 20}}>
        Save
      </Button>
    </Modal>
  )
}

const FilledCloseIcon = styled(CloseIcon)({
  width: 30,
  height: 30,
  background: colors.lightGrey,
  borderRadius: 100,
  padding: 8,
  position: 'absolute',
  right: 10,
  top: 10,
  cursor: 'pointer',
})

const DropZoneSection = styled.section({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: colors.lightGrey,
  borderStyle: 'dashed',
  backgroundColor: colors.grey,
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
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

export default CreatePlaylistModal
