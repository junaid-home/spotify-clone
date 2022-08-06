/** @jsxImportSource @emotion/react */
import {useLayoutEffect, useState} from 'react'
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import colors from 'utils/colors'
import Header from 'components/header'
import Typography from 'components/typography'
import Button from 'components/button'
import SectionSeparator from 'components/section-separator'
import FormGroup from 'components/form-group'
import {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
} from 'store/api/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [getFbLoginUri, {isLoading: isLoadingFbUri}] =
    useGetFbLoginUriMutation()
  const [getGoogleLoginUri, {isLoading: isLoadingGoogleUri}] =
    useGetGoogleLoginUriMutation()

  const handleFormSubmission = async e => {
    e.preventDefault()
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
  }, [])

  return (
    <div>
      <Header />
      <MainSection>
        <Typography variant="label" css={{marginBottom: 10}}>
          To continue, log in to Spotify.
        </Typography>
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
            <Button variant="primary">LOG IN</Button>
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
