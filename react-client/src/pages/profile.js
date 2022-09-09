/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import {toast} from 'react-toastify'
import styled from '@emotion/styled/macro'
import {useDispatch, useSelector} from 'react-redux'
import {RadioGroup, ReversedRadioButton} from 'react-radio-buttons'

import Typography from 'components/typography'
import Button from 'components/button'
import FormGroup from 'components/form-group'

import colors from 'utils/colors'

import {useUpdateUserMutation} from 'store/api/auth'
import {updateUser as updateUserInStore} from 'store/reducers/auth'

function Profile() {
  const user = useSelector(s => s.auth.user)
  const dispatch = useDispatch()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [country, setCountry] = useState(user.country)
  const [gender, setGender] = useState(user.gender || 'male')
  const [dob, setDob] = useState(() => {
    if (user.dob) {
      const date = new Date(user.dob).toISOString()
      return date.slice(0, 10)
    } else {
      const now = new Date(Date.now()).toISOString()
      return now.slice(0, 10)
    }
  })
  const [updateUser, {isLoading}] = useUpdateUserMutation()

  const isEmailNotChangeable = Boolean(
    email.endsWith('@facebook.com') || email.endsWith('@google.com'),
  )

  const handleFormSubmission = async e => {
    e.preventDefault()

    const date = dob?.split('-')
    const jsDate = new Date(date[0], date[1], date[2])

    const data = {name, email, country, gender, dob: jsDate.getTime()}

    if (isEmailNotChangeable && email !== user.email) {
      return toast.error("this Email couldn't be changed!")
    }

    const result = await updateUser(data)
    if (result.data.data.user) {
      dispatch(updateUserInStore(result.data.data.user))
      toast.success('User Successfully updated!')
    } else {
      toast.error(result.error?.data?.message || result.error.error)
    }
  }

  return (
    <ContentContainer>
      <Typography variant="h1" css={{color: colors.lightGrey}}>
        Edit Profile
      </Typography>
      <Form onSubmit={handleFormSubmission}>
        <FormGroup
          label="Username"
          placeholder="Enter your profile name."
          type="text"
          css={{marginTop: 12}}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormGroup
          label="Email Address"
          placeholder="Email address or username."
          type="email"
          value={email}
          disabled={isEmailNotChangeable}
          onChange={e => setEmail(e.target.value)}
          css={{
            '&:hover': {
              cursor: isEmailNotChangeable ? 'not-allowed' : 'default',
            },
          }}
        />
        <FormGroup
          label="Country"
          placeholder="Enter your country name."
          type="text"
          css={{marginTop: 12}}
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <Typography
          variant="label"
          as="p"
          css={{marginTop: 12, marginBottom: 5}}
        >
          Gender
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
          label="Date of Birth"
          placeholder="Enter your date of birth."
          type="date"
          css={{marginTop: 12}}
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <Button loading={isLoading} css={{marginTop: 30}}>
          SAVE
        </Button>
      </Form>
    </ContentContainer>
  )
}

const ContentContainer = styled.div({
  color: colors.white,
  userSelect: 'none',
  background: colors.background,
  minHeight: '100vh',
  paddingTop: 80,
  paddingLeft: 40,
  paddingRight: 40,
})

const Form = styled.form({
  textAlign: 'left',
  padding: '15px 0',

  '& input': {
    marginTop: 5,
  },

  '& label': {
    marginTop: 20,
  },
})

export default Profile
