import {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import Spinner from 'components/spinner'
import {useLoginWithOauth2Mutation} from 'services/auth'

function Oauth2() {
  const [redirect, setRedirect] = useState(false)
  const [query] = useState(() => window.location.href.split('?')[1])
  const [loginWithOauth2, {isLoading}] = useLoginWithOauth2Mutation()

  const saveAndRedirect = data => {
    localStorage.setItem('user', JSON.stringify(data?.data?.user))
    setRedirect(true)
  }

  const emitErrorAndRedirect = () => {
    window.alert('Failed to Login, Something went wrong!')
    setRedirect(true)
  }

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (window.location.href.includes('facebook/redirect')) {
      loginWithOauth2({uri: '/facebook/login', data: query}).then(result => {
        const data = result.data

        if (data?.data?.user) {
          return saveAndRedirect(result.data)
        }

        return emitErrorAndRedirect()
      })
    } else if (window.location.href.includes('google/redirect')) {
      loginWithOauth2({uri: '/google/login', data: query}).then(result => {
        const data = result.data

        if (data?.data?.user) {
          return saveAndRedirect(result.data)
        }

        return emitErrorAndRedirect()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Overlay>
      <Spinner />
      {redirect && <Navigate to="/" />}
    </Overlay>
  )
}

const Overlay = styled.div({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Oauth2
