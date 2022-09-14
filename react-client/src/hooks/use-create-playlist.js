import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {useCreatePlaylistMutation} from 'store/api/playlist'

export default function useCreatePlaylist(image, onClose) {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    color1: '#FFFFFF',
    color2: '#CCCCCC',
  })

  const [createPlaylist, {isLoading, isError, error}] =
    useCreatePlaylistMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('code1', data.color1)
    formData.append('code2', data.color2)
    formData.append('picture', image)

    const result = await createPlaylist(formData)
    if (result.data?.data.id) {
      setData({name: '', color1: '', color2: ''})
      toast.success('Song added to the playlist')
      onClose()
      navigate(`/playlist/${result.data?.data?.id}`)
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }
  }

  return {
    handleFormSubmission,
    isLoading,
    isError,
    error,
    data,
    setData,
  }
}
