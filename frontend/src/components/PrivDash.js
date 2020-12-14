import { Route, Redirect } from "react-router-dom"
import { useContextInfo } from "../hooks/context"
import React from 'react'


const PrivDash = ({ component: Component, ...rest }) => {
  const { user } = useContextInfo()
  return (
    <Route
      {...rest}
      render={props => (!user ? <Component {...props} /> : <Redirect to={`/dash/${user._id}`} />)}
    />
  )
}

export default PrivDash