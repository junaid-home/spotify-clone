/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'

import Spinner from './spinner'

import FbIcon from 'icons/fb'
import GoogleIcon from 'icons/google'

import colors from 'utils/colors'

function Button({children, variant, loading, ...props}) {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {!loading && variant === 'fb' && (
        <FbIcon css={{window: 20, height: 20, padding: 0, marginRight: 10}} />
      )}
      {!loading && variant === 'google' && (
        <GoogleIcon
          css={{window: 19, height: 19, padding: 0, marginRight: 10}}
        />
      )}
      {loading ? (
        <Spinner color={variant === 'fb' ? null : colors.black} />
      ) : (
        children
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button(
  {
    position: 'relative',
    fontFamily: 'Roboto, Arial',
    fontSize: 14,
    fontWeight: 'bold',
    padding: '13px 30px ',
    borderRadius: 100,
    letterSpacing: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: `1px solid ${colors.lightGrey}`,
    color: colors.grey,
    '&:hover': {
      borderColor: colors.darkest,
    },
  },
  ({variant}) =>
    variant === 'fb'
      ? {
          color: colors.white,
          background: '#3B5998',
        }
      : null,

  ({variant}) =>
    variant === 'google'
      ? {
          background: colors.white,
        }
      : null,
  ({variant}) =>
    variant === 'primary'
      ? {
          color: colors.darkest,
          background: colors.primary,
        }
      : null,
  ({fullWidth}) =>
    fullWidth
      ? {
          width: '100%',
        }
      : null,
)

export default Button
