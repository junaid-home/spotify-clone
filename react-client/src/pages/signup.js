/** @jsxImportSource @emotion/react */
import {useState, useLayoutEffect} from 'react'
import styled from '@emotion/styled/macro'
import {RadioGroup, ReversedRadioButton} from 'react-radio-buttons'
import {Link} from 'react-router-dom'
import Header from 'components/header'
import Typography from 'components/typography'
import Button from 'components/button'
import SectionSeparator from 'components/section-separator'
import FormGroup from 'components/form-group'
import colors from 'styles/colors'
import {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
} from 'services/auth'

function Login() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [gender, setGender] = useState('male')
  const [country, setCountry] = useState('')
  const [getFbLoginUri, {isLoading: isLoadingFbUri}] =
    useGetFbLoginUriMutation()
  const [getGoogleLoginUri, {isLoading: isLoadingGoogleUri}] =
    useGetGoogleLoginUriMutation()

  const handleFormSubmission = e => {
    e.preventDefault()

    const date = dob.split('-')
    const jsDate = new Date(date[0], date[1], date[2])
    const timestamp = jsDate.getTime()

    console.log(email, pass, name, gender, country, timestamp)
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
          Sign up for free to start listening.
        </Typography>
        <Button
          onClick={handleFbLogin}
          loading={isLoadingFbUri}
          disabled={isLoadingFbUri}
          fullWidth
          variant="fb"
        >
          SIGN UP WITH FACEBOOK
        </Button>
        <Button
          onClick={handleGoogleLogin}
          loading={isLoadingGoogleUri}
          disabled={isLoadingGoogleUri}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormGroup
            label="Create a password"
            placeholder="Create a password."
            type="password"
            css={{marginTop: 12}}
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <FormGroup
            label="What should we call you?"
            placeholder="Enter your profile name."
            type="text"
            css={{marginTop: 12}}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormGroup
            label="What are you from?"
            placeholder="Enter your country name."
            type="text"
            css={{marginTop: 12}}
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <Typography
            variant="label"
            as="p"
            css={{marginTop: 12, marginBottom: 3}}
          >
            What's your gender?
          </Typography>
          <RadioGroup
            value={gender}
            onChange={value => setGender(value)}
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
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
          <ButtonArea>
            <Button variant="primary" fullWidth>
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
