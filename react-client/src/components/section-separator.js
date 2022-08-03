/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import colors from 'styles/colors'
import Typography from './typography'

function SectionSeparator({text, ...props}) {
  return (
    <Wrapper {...props}>
      <Line />
      <Typography variant="label" css={{padding: '0 15px'}}>
        {text.toUpperCase()}
      </Typography>
      <Line />
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
const Line = styled.span({
  display: 'inline-block',
  background: colors.lightGrey,
  height: 1,
  width: '100%',
})

export default SectionSeparator
