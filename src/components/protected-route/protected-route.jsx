import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute ({ children, ...rest }) {
  const { isLoginned, user } = useSelector(store => store.user)
  console.log(user)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoginned
          ? (
              children
            )
          : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
      }
    />
  )
}
