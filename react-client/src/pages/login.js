/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Header from 'components/header'
import Button from 'components/button'
import Tooltip from 'components/tooltip'
import Typography from 'components/typography'
import FormGroup from 'components/form-group'
import SectionSeparator from 'components/section-separator'

import colors from 'utils/colors'

import useLogin from 'hooks/use-login'
import useSocialLogin from 'hooks/use-social-login'

function Login() {
  const error = useSelector(state => state.auth.error)
  const {email, setEmail, pass, setPass, handleFormSubmission, isLoggingIn} =
    useLogin()
  const {loginWithFB, loginWithGoogle, isFbLoggingIn, isGoogleLoggingIn} =
    useSocialLogin()

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
          onClick={loginWithFB}
          loading={isFbLoggingIn}
          disabled={isFbLoggingIn}
          fullWidth
          variant="fb"
        >
          CONTINUE WITH FACEBOOK
        </Button>
        <Button
          onClick={loginWithGoogle}
          loading={isGoogleLoggingIn}
          disabled={isGoogleLoggingIn}
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
