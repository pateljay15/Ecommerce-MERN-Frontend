import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "."


const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.role === 1 ? (
            // console.log(props) 
            // props contain three objects : histroy, location, match
            // console.log(rest) rest contain exact, path, location computedMatch
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


export default AdminRoute