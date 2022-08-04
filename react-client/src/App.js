import 'the-new-css-reset/css/reset.css'
import {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {restoreUser} from 'store/reducers/auth'
import LoginPage from 'pages/login'
import SignupPage from 'pages/signup'
import Oauth2Page from 'pages/Oauth2'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/facebook/redirect" element={<Oauth2Page />} />
        <Route path="/google/redirect" element={<Oauth2Page />} />
      </Routes>
    </Router>
  )
}

export default App
