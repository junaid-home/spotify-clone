/** @jsxImportSource @emotion/react */
import Typography from 'components/typography'
import {useSelector} from 'react-redux'

function Home() {
  const user = useSelector(s => s.auth.user)

  return (
    <div>
      <Typography css={{color: 'white'}} variant="h2">
        Made for {user.name}
      </Typography>
    </div>
  )
}

export default Home
