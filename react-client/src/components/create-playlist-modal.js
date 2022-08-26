/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import Modal from 'react-modal'
import {useDropzone} from 'react-dropzone'
import colors from 'utils/colors'
import CloseIcon from 'icons/close'
import Input from './input'
import Button from './button'
import * as mq from 'utils/media-query'
import {useCreatePlaylistMutation} from 'store/api/playlist'
import useDropzoneImage from 'hooks/use-dropzone-image'

function CreatePlaylistModal({open, onClose}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [color1, setColor1] = useState('')
  const [color2, setColor2] = useState('')
  const {onDrop, image, imageSrc} = useDropzoneImage()
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg', '.png'],
    },
  })
  const [createPlaylist, {isLoading, isError}] = useCreatePlaylistMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('name', name)
    formData.append('color1', color1)
    formData.append('color2', color2)
    formData.append('picture', image)

    const result = await createPlaylist(formData)
    if (!isError) {
      navigate(`/playlist/${result.data?.data?.id}`)
    }
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
          <PlaylistImage src={imageSrc} alt="Playlist" css={{marginTop: 20}} />
        ) : null}
        <div css={{flex: 1, paddingRight: 20, [mq.md]: {paddingRight: 0}}}>
          <div>
            <StyledInput
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Playlist Name"
            />
            <StyledInput
              value={color1}
              onChange={e => setColor1(e.target.value)}
              placeholder="Color code 1 (e.g #FFFFFF)"
            />
            <StyledInput
              value={color2}
              onChange={e => setColor2(e.target.value)}
              placeholder="Color code 2 (e.g #000000)"
            />
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
