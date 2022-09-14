import {useEffect, useRef, useState, useTransition} from 'react'
import {Navigate} from 'react-router-dom'
import styled from '@emotion/styled/macro'

import Spinner from 'components/spinner'

import colors from 'utils/colors'

import {useLoginWithOauth2Mutation} from 'store/api/auth'

function Oauth2() {
  const requested = useRef(false)
  const [, startTransition] = useTransition()
  const [redirect, setRedirect] = useState(false)
  const [query] = useState(() => window.location.href.split('?')[1])
  const [loginWithOauth2] = useLoginWithOauth2Mutation()

  const __saveAndRedirect = result => {
    const data = result.data
    if (data?.data?.user) {
      return setRedirect(true)
    }
    startTransition(() => {
      window.alert('Failed to Login, Something went wrong!')
      setRedirect(true)
    })
  }

  useEffect(() => {
    if (!requested.current) {
      if (window.location.href.includes('facebook/redirect')) {
        loginWithOauth2({uri: '/facebook/login', data: query}).then(result =>
          __saveAndRedirect(result),
        )
      } else if (window.location.href.includes('google/redirect')) {
        loginWithOauth2({uri: '/google/login', data: query}).then(result =>
          __saveAndRedirect(result),
        )
      }
    }

    requested.current = true
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
  height: '100vh',
  overflow: 'hidden',
  background: colors.background,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Oauth2
