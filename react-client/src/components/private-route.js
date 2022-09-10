import * as React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PrivateRoute() {
  const isAuth = useSelector(s => s.auth.isAuthenticated)

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
