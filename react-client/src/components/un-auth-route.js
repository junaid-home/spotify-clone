import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function UnAuthRoute() {
  const isAuth = useSelector(s => s.auth.isAuthenticated)

  return !isAuth ? <Outlet /> : <Navigate to="/" />
}

export default UnAuthRoute
