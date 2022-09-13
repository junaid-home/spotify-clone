import * as React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Layout from 'components/layout'

import LoginPage from 'pages/login'
import SignupPage from 'pages/signup'
import Oauth2Page from 'pages/Oauth2'

function UnAuthRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route exact path="/facebook/redirect" element={<Oauth2Page />} />
        <Route exact path="/google/redirect" element={<Oauth2Page />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default UnAuthRoutes
