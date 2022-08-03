import styled from '@emotion/styled/macro'
import colors from 'styles/colors'

const Typography = styled.p(
  {
    fontFamily: 'Roboto, Arial',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: 400,
    color: colors.black,
  },
  ({variant}) =>
    variant === 'label'
      ? {
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.3,
          color: colors.darkest,
        }
      : null,
  ({variant}) =>
    variant === 'h2'
      ? {
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0.3,
          color: colors.darkest,
        }
      : null,
)

export default Typography
