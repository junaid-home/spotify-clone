import {useCallback, useEffect, useState} from 'react'

function useDropzoneImage() {
  const [image, setImage] = useState(null)
  const [imageSrc, setImageSrc] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0])

    const fileReader = new FileReader()
    fileReader.onload = e => {
      setImageSrc(e.target.result)
    }
    fileReader.readAsDataURL(acceptedFiles[0])
  }, [])

  useEffect(() => {
    fetch('/playlist.jpg')
      .then(res => res.blob())
      .then(blob => {
        const imageFile = new File([blob], 'playlist-default-image.jpg', {
          type: 'image/jpeg',
        })
        setImage(imageFile)
        onDrop([imageFile])
      })
  }, [onDrop])

  return {
    image,
    imageSrc,
    setImage,
    setImageSrc,
    onDrop,
  }
}

export default useDropzoneImage
