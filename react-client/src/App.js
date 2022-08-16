import 'the-new-css-reset/css/reset.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from 'components/private-route'
import UnAuthRoute from 'components/un-auth-route'
import LoginPage from 'pages/login'
import SignupPage from 'pages/signup'
import Oauth2Page from 'pages/Oauth2'
import HomePage from 'pages/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
        </Route>
        <Route path="/" element={<UnAuthRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/facebook/redirect" element={<Oauth2Page />} />
          <Route exact path="/google/redirect" element={<Oauth2Page />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
