import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/react/macro'
import colors from 'utils/colors'

function Spinner(props) {
  return (
    <Wrapper {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  )
}

export const FullPageSpinner = ({whiteBg}) => {
  return (
    <CenteredContent color={!whiteBg ? colors.black : colors.white}>
      <Spinner color={!whiteBg ? colors.white : colors.black} />
    </CenteredContent>
  )
}

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`

const Wrapper = styled.div(({color}) => ({
  display: 'inline-block',
  position: 'relative',
  left: -30,
  width: 15,
  height: 16,

  '& div': {
    position: 'absolute',
    top: 0,
    width: 13,
    height: 13,
    borderRadius: '50%',
    background: color ? color : '#fff',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
  },

  '& div:nth-of-type(1)': {
    left: '8px',
    animation: `${ellipsis1} 0.6s infinite`,
  },

  '& div:nth-of-type(2)': {
    left: '8px',
    animation: `${ellipsis2} 0.6s infinite`,
  },

  '& div:nth-of-type(3)': {
    left: '32px',
    animation: `${ellipsis2} 0.6s infinite`,
  },

  '& div:nth-of-type(4)': {
    left: '56px',
    animation: `${ellipsis3} 0.6s infinite`,
  },
}))

const CenteredContent = styled.data(
  {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  ({color}) => ({background: color}),
)

export default Spinner
