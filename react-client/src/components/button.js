/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import colors from 'styles/colors'
import FbIcon from 'icons/fb'
import GoogleIcon from 'icons/google'

function Button({children, variant, ...props}) {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {variant === 'fb' && (
        <FbIcon css={{window: 20, height: 20, padding: 0, marginRight: 10}} />
      )}
      {variant === 'google' && (
        <GoogleIcon
          css={{window: 19, height: 19, padding: 0, marginRight: 10}}
        />
      )}
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.p(
  {
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
)

export default Button
