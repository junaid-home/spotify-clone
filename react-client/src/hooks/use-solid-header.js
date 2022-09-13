import {useState, useEffect} from 'react'

export default function useSolidHeader() {
  const [solidHeader, setSolidHeader] = useState(false)

  useEffect(() => {
    function scrollHandler(e) {
      e.preventDefault()

      if (window.scrollY > 65) {
        setSolidHeader(true)
      } else {
        setSolidHeader(false)
      }
    }
    window.document.addEventListener('scroll', scrollHandler)

    return () => window.document.removeEventListener('scroll', scrollHandler)
  }, [])

  return solidHeader
}
