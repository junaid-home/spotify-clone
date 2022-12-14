/** @jsxImportSource @emotion/react */
import Modal from 'react-modal'
import styled from '@emotion/styled/macro'
import {useDropzone} from 'react-dropzone'

import Input from './input'
import Button from './button'
import Tooltip from './tooltip'

import CloseIcon from 'icons/close'

import colors from 'utils/colors'
import * as mq from 'utils/media-query'

import useDropzoneImage from 'hooks/use-dropzone-image'
import useCreatePlaylist from 'hooks/use-create-playlist'

function CreatePlaylistModal({open, onClose}) {
  const {onDrop, image, imageSrc} = useDropzoneImage()
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1,
  })
  const {handleFormSubmission, isLoading, isError, error, data, setData} =
    useCreatePlaylist(image, onClose)

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {isError ? (
        <Tooltip
          type="danger"
          message={error?.data?.message || error.message}
        />
      ) : null}
      <FilledCloseIcon onClick={() => onClose()} />
      <DropZoneSection css={{marginTop: isError ? 10 : 30}}>
        <div {...getRootProps()} css={{padding: '120px 20px'}}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the playlist image file here ...</p>
          ) : (
            <p>Drop the playlist image file here, or click to select image</p>
          )}
        </div>
      </DropZoneSection>
      <Form onSubmit={handleFormSubmission}>
        {imageSrc ? (
          <PlaylistImage
            loading="lazy"
            src={imageSrc}
            alt="Playlist"
            css={{marginTop: 20}}
          />
        ) : null}
        <div css={{flex: 1, paddingRight: 20, [mq.md]: {paddingRight: 0}}}>
          <div>
            <StyledInput
              value={data.name}
              onChange={e => setData(prev => ({...prev, name: e.target.value}))}
              placeholder="Playlist Name"
              css={{marginTop: 20}}
            />
            <InputContainer>
              <StyledInput
                value={data.color1}
                onChange={e =>
                  setData(prev => ({...prev, color1: e.target.value}))
                }
                placeholder="Color code 1 (e.g #ABC123)"
                css={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 'none',
                }}
              />
              <ColorDisplay css={{background: data.color1}} />
            </InputContainer>
            <InputContainer>
              <StyledInput
                value={data.color2}
                onChange={e =>
                  setData(prev => ({...prev, color2: e.target.value}))
                }
                placeholder="Color code 2 (e.g #DEF345)"
                css={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 'none',
                }}
              />
              <ColorDisplay css={{background: data.color2}} />
            </InputContainer>
          </div>
          <Button
            type="submit"
            loading={isLoading}
            variant="primary"
            css={{marginTop: 20, marginLeft: 20}}
          >
            Save
          </Button>
        </div>
      </Form>
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

const InputContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  marginTop: 20,
})

const ColorDisplay = styled.span({
  display: 'inline-block',
  width: 60,
  zIndex: 10,
  color: '#FFF',
  marginRight: -20,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderColor: colors.lightGrey,
  borderStyle: 'solid',
  borderWidth: 1,
  borderLeft: 'none',

  [mq.md]: {
    marginRight: 0,
  },
})
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
  flex: 1,
  marginLeft: 20,
  color: colors.lightGrey,
  [mq.md]: {marginLeft: 0},

  '&:focus': {
    borderColor: colors.white,
  },
})

const Form = styled.form({
  display: 'flex',
  alignItems: 'flex-start',

  [mq.md]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const PlaylistImage = styled.img({
  height: 200,
  width: 199,
  borderRadius: 3,
})

export default CreatePlaylistModal
