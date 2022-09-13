import 'the-new-css-reset/css/reset.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-jinke-music-player/assets/index.css'

import * as React from 'react'
import {Suspense} from 'react'
import {useSelector} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import {FullPageSpinner} from 'components/spinner'
const UnAuthenticatedApp = React.lazy(() => import('components/unauth-routes'))
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ 'components/auth-routes'),
)

function App() {
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated)

  return (
    <Suspense fallback={<FullPageSpinner whiteBg />}>
      <Router>
        {isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </Router>
    </Suspense>
  )
}

export default App
