/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import Input from './input'
import Typography from './typography'

function FormGroup({label, value, onChange, type, ...props}) {
  return (
    <Wrapper {...props}>
      <Typography variant="label" as="label" css={{marginBottom: 3}}>
        {label}
      </Typography>
      <Input
        placeholder={label}
        value={value}
        type={type}
        onChange={onChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
})

export default FormGroup
