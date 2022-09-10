/** @jsxImportSource @emotion/react */
import {useLayoutEffect, useState} from 'react'
import styled from '@emotion/styled/macro'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Header from 'components/header'
import Button from 'components/button'
import Tooltip from 'components/tooltip'
import Typography from 'components/typography'
import FormGroup from 'components/form-group'
import SectionSeparator from 'components/section-separator'

import colors from 'utils/colors'

import {resetError} from 'store/reducers/auth'
import {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
  useLoginWithEmailAndPasswordMutation,
} from 'store/api/auth'

function Login() {
  const error = useSelector(state => state.auth.error)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()
  const [getFbLoginUri, {isLoading: isLoadingFbUri}] =
    useGetFbLoginUriMutation()
  const [getGoogleLoginUri, {isLoading: isLoadingGoogleUri}] =
    useGetGoogleLoginUriMutation()
  const [loginWithEmailAndPassword, {isLoading: isLoggingIn}] =
    useLoginWithEmailAndPasswordMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()
    dispatch(resetError())

    const result = await loginWithEmailAndPassword({email, password: pass})
    if (result?.data?.data?.user) {
      navigate('/', {replace: true})
    }
  }

  const handleFbLogin = async e => {
    const result = await getFbLoginUri().unwrap()
    window.location.href = result.data
  }

  const handleGoogleLogin = async e => {
    const result = await getGoogleLoginUri().unwrap()
    window.location.href = result.data
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetError())
  }, [dispatch])

  return (
    <div>
      <Header />
      <MainSection>
        <Typography variant="label" css={{marginBottom: 10}}>
          To continue, log in to Spotify.
        </Typography>
        {error && (
          <Tooltip css={{marginBottom: 12}} message={error} type="danger" />
        )}
        <Button
          onClick={handleFbLogin}
          loading={isLoadingFbUri}
          disabled={isLoadingFbUri}
          fullWidth
          variant="fb"
        >
          CONTINUE WITH FACEBOOK
        </Button>
        <Button
          onClick={handleGoogleLogin}
          loading={isLoadingGoogleUri}
          disabled={isLoadingGoogleUri}
          fullWidth
          variant="google"
          css={{marginTop: 8}}
        >
          CONTINUE WITH GOOGLE
        </Button>
        <SectionSeparator text="or" css={{padding: 12}} />
        <Form onSubmit={handleFormSubmission}>
          <FormGroup
            label="Email address or username"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormGroup
            label="Password"
            type="password"
            css={{marginTop: 12}}
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <Typography css={{marginTop: 12}}>Forgot your password?</Typography>
          <ButtonArea>
            <Button
              disabled={isLoggingIn}
              loading={isLoggingIn}
              variant="primary"
            >
              LOG IN
            </Button>
          </ButtonArea>
        </Form>
        <Typography
          variant="h2"
          as="h2"
          css={{display: 'inline-block', margin: '20px 0'}}
        >
          Don't have an account?
        </Typography>
        <Link to="/signup">
          <Button fullWidth css={{marginTop: 8}} type="submit">
            SIGN UP FOR SPOTIFY
          </Button>
        </Link>
      </MainSection>
    </div>
  )
}

const ButtonArea = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '10px 0',
})

const Form = styled.form({
  textAlign: 'left',
  padding: '15px 0',
  borderBottom: `1px solid ${colors.lightGrey}`,
})

const MainSection = styled.div({
  textAlign: 'center',
  padding: '40px 20px',
  margin: '0 auto',
  maxWidth: 500,
})

export default Login
