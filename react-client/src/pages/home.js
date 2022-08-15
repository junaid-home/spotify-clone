/** @jsxImportSource @emotion/react */
import Button from 'components/button'
import {useLogoutMutation} from 'store/api/auth'

function Home() {
  const [logout, {isLoading}] = useLogoutMutation()

  return (
    <Button
      onClick={() => logout().unwrap()}
      variant="primary"
      loading={isLoading}
      disabled={isLoading}
    >
      Logout
    </Button>
  )
}

export default Home
