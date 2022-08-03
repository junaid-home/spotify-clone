/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import Logo from 'components/logo'
import styled from '@emotion/styled/macro'
import colors from 'styles/colors'
import Typography from 'components/typography'
import Button from 'components/button'
import SectionSeparator from 'components/section-separator'
import FormGroup from 'components/form-group'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleFormSubmission = e => {
    e.preventDefault()

    console.log(email, pass)
  }

  return (
    <div>
      <Header>
        <Logo />
      </Header>
      <MainSection>
        <Typography variant="label" css={{marginBottom: 10}}>
          To continue, log in to Spotify.
        </Typography>
        <Button fullWidth variant="fb">
          CONTINUE WITH FACEBOOK
        </Button>
        <Button fullWidth variant="google" css={{marginTop: 8}}>
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
        <Button fullWidth css={{marginTop: 8}} type="submit">
          SIGN UP FOR SPOTIFY
        </Button>
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

const Header = styled.div({
  minWidth: '100%',
  borderBottom: `1px solid ${colors.lightGrey}`,
  padding: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Login
