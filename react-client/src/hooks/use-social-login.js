import {
  useGetFbLoginUriMutation,
  useGetGoogleLoginUriMutation,
} from 'store/api/auth'

export default function useSocialLogin() {
  const [getFbLoginUri, {isLoading: isFbLoggingIn}] = useGetFbLoginUriMutation()
  const [getGoogleLoginUri, {isLoading: isGoogleLoggingIn}] =
    useGetGoogleLoginUriMutation()

  const handleFbLogin = async e => {
    const result = await getFbLoginUri().unwrap()
    window.location.href = result.data
  }

  const handleGoogleLogin = async e => {
    const result = await getGoogleLoginUri().unwrap()
    window.location.href = result.data
  }

  return {
    loginWithFB: handleFbLogin,
    loginWithGoogle: handleGoogleLogin,
    isFbLoggingIn,
    isGoogleLoggingIn,
  }
}
