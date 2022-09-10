/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import Input from './input'
import Typography from './typography'

function FormGroup({label, placeholder, value, onChange, type, ...props}) {
  return (
    <Wrapper>
      <Typography variant="label" as="label" css={{marginBottom: 3}}>
        {label}
      </Typography>
      <Input
        placeholder={placeholder ? placeholder : label}
        value={value}
        type={type}
        onChange={onChange}
        {...props}
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
