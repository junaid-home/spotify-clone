import styled from '@emotion/styled/macro'
import colors from 'utils/colors'

const Typography = styled.p(
  {
    fontFamily: 'Roboto, Arial',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: 400,
    color: 'inherit',
  },
  ({variant}) =>
    variant === 'label'
      ? {
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0.3,
        }
      : null,
  ({variant}) =>
    variant === 'h0'
      ? {
          fontSize: 90,
          fontWeight: 900,
          letterSpacing: 0.3,
          color: 'inherit',
        }
      : null,
  ({variant}) =>
    variant === 'h1'
      ? {
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 0.3,
          color: 'inherit',
        }
      : null,
  ({variant}) =>
    variant === 'h2'
      ? {
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0.3,
          color: 'inherit',
        }
      : null,
  ({variant}) =>
    variant === 'link'
      ? {
          fontWeight: 'bold',
          fontSize: 14,

          '&:hover': {
            color: colors.white,
          },
        }
      : null,
  ({variant}) =>
    variant === 'one-line'
      ? {
          fontSize: 15,
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : null,
  ({variant}) =>
    variant === 'two-line'
      ? {
          lineHeight: '1.5em',
          height: '3em',
          fontSize: 13,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : null,
)

export default Typography
