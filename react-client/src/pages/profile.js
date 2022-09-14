/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {RadioGroup, ReversedRadioButton} from 'react-radio-buttons'

import Typography from 'components/typography'
import Button from 'components/button'
import FormGroup from 'components/form-group'

import colors from 'utils/colors'
import useProfileUpdate from 'hooks/use-update-profile'

function Profile() {
  const {data, setData, isEmailNotChangeable, isLoading, handleFormSubmission} =
    useProfileUpdate()

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
          value={data.name}
          onChange={e => setData(prev => ({...prev, name: e.target.value}))}
        />
        <FormGroup
          label="Email Address"
          placeholder="Email address or username."
          type="email"
          value={data.email}
          disabled={isEmailNotChangeable}
          onChange={e => setData(prev => ({...prev, email: e.target.value}))}
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
          value={data.country}
          onChange={e => setData(prev => ({...prev, country: e.target.value}))}
        />
        <Typography
          variant="label"
          as="p"
          css={{marginTop: 12, marginBottom: 5}}
        >
          Gender
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
          label="Date of Birth"
          placeholder="Enter your date of birth."
          type="date"
          css={{marginTop: 12}}
          value={data.dob}
          onChange={e => setData(prev => ({...prev, dob: e.target.value}))}
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
