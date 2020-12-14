import { Route, Redirect } from "react-router-dom"
import { useContextInfo } from '../hooks/context.js'
import React from 'react'


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContextInfo()
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to='/' />)}
    />
  )
}

export default PrivateRoute