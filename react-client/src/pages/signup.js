/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RadioGroup, ReversedRadioButton} from 'react-radio-buttons'

import Header from 'components/header'
import Typography from 'components/typography'
import Button from 'components/button'
import SectionSeparator from 'components/section-separator'
import FormGroup from 'components/form-group'
import Tooltip from 'components/tooltip'

import colors from 'utils/colors'

import useSocialLogin from 'hooks/use-social-login'
import useSignup from 'hooks/use-signup'

function Login() {
  const error = useSelector(state => state.auth.error)
  const {loginWithFB, loginWithGoogle, isFbLoggingIn, isGoogleLoggingIn} =
    useSocialLogin()
  const {handleFormSubmission, isSigningUp, data, setData} = useSignup()

  return (
    <div>
      <Header />
      <MainSection>
        <Typography variant="label" css={{marginBottom: 10}}>
          Sign up for free to start listening.
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
          SIGN UP WITH FACEBOOK
        </Button>
        <Button
          onClick={loginWithGoogle}
          loading={isGoogleLoggingIn}
          disabled={isGoogleLoggingIn}
          fullWidth
          variant="google"
          css={{marginTop: 8}}
        >
          SIGN UP WITH GOOGLE
        </Button>
        <SectionSeparator text="or" css={{padding: 12}} />
        <Form onSubmit={handleFormSubmission}>
          <FormGroup
            label="What's your email?"
            placeholder="Email address or username."
            type="email"
            value={data.email}
            onChange={e => setData(prev => ({...prev, email: e.target.value}))}
          />
          <FormGroup
            label="Create a password"
            placeholder="Create a password."
            type="password"
            css={{marginTop: 12}}
            value={data.password}
            onChange={e =>
              setData(prev => ({...prev, password: e.target.value}))
            }
          />
          <FormGroup
            label="What should we call you?"
            placeholder="Enter your profile name."
            type="text"
            css={{marginTop: 12}}
            value={data.name}
            onChange={e => setData(prev => ({...prev, name: e.target.value}))}
          />
          <FormGroup
            label="What are you from?"
            placeholder="Enter your country name."
            type="text"
            css={{marginTop: 12}}
            value={data.country}
            onChange={e =>
              setData(prev => ({...prev, country: e.target.value}))
            }
          />
          <Typography
            variant="label"
            as="p"
            css={{marginTop: 12, marginBottom: 3}}
          >
            What's your gender?
          </Typography>
          <RadioGroup
            value={data.gender}
            onChange={value => setData(prev => ({...prev, gender: value}))}
            horizontal
          >
            <ReversedRadioButton value="male">Male</ReversedRadioButton>
            <ReversedRadioButton value="female">Female</ReversedRadioButton>
          </RadioGroup>
          <FormGroup
            label="What's your date of birth?"
            placeholder="Enter your date of birth."
            type="date"
            css={{marginTop: 12}}
            value={data.dob}
            onChange={e => setData(prev => ({...prev, dob: e.target.value}))}
          />
          <ButtonArea>
            <Button
              disabled={isSigningUp}
              loading={isSigningUp}
              variant="primary"
              fullWidth
            >
              SIGN UP WITH SPOTIFY
            </Button>
          </ButtonArea>
        </Form>
        <Typography
          variant="h2"
          as="h2"
          css={{display: 'inline-block', margin: '20px 0'}}
        >
          Already have an account?
        </Typography>
        <Link to="/login">
          <Button fullWidth css={{marginTop: 8}} type="submit">
            LOG IN WITH SPOTIFY
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
